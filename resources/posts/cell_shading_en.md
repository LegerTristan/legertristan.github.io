# Creating a Toon Shader: Transforming Light into Flat Colors via Cel Shading

![Final Cel Shading Result](resources/videos/CellShading.gif)

**Toon Shading** is an iconic visual style in video games that seeks to imitate the aesthetic of comic books and cartoons. It is a broad subject that primarily rests on two pillars: light management (**Cel Shading**) and contours (**Outlining**).

In this fifth project of my Technical Art roadmap, I am focusing on the first pillar: **Cel Shading**. The goal is to learn how to manipulate the mathematics of light to reproduce those sharp shadow gradients often found in Japanese anime or western comics. We will explore how to manage two of the fundamental components of lighting: **Diffuse Lighting** and **Ambient Lighting**.

---

## Lighting Models: Blinn and Phong

Before stylizing light, we must understand how game engines simulate it by default. To do this, we use **lighting models**, which are mathematical formulas defining the color of each pixel based on the light source.

```hlsl
// The final sum of a classic lighting model
float3 finalColor = ambientColor + diffuseColor + specularColor;
```

The most famous model is **Blinn-Phong**. It decomposes lighting into a "trinity":
1.  **Ambient Light:** In reality, light doesn't stop immediately when it hits a surface; it bounces off the environment (Global Illumination). Simulating these thousands of bounces in real-time would be mathematically too expensive for a game's performance. That is why we use a **global ambient light** that affects all faces equally. This prevents non-illuminated areas from falling into pure black without killing performance.
2.  **Diffuse Light:** This is the base light that defines form. It is at its maximum when the face is directly facing the sun and decreases as the angle between the light source and the face increases.
3.  **Specular Light:** This is the shiny reflection that simulates the direct reflection of the light source. Its position varies depending on where the observer is looking at the object receiving the light (we will cover this in the next project).

---

## Rendering Architecture: Forward vs. Deferred

Before moving forward, it is important to understand the rendering methods of the two most popular engines: Unreal Engine and Unity. The method for calculating Cel Shading changes radically depending on the engine's rendering pipeline.

> A pipeline is the method used by the graphics card to prepare the final image.  
> Simply put, it is a succession of technical steps (Vertex Processing, Rasterization, Fragment Processing) that transform 3D geometric data into 2D pixels displayable on a screen.

Here are the two methods used by these engines:
*   **Forward Rendering (Standard Unity URP):** The engine processes objects one by one. For each object, it calculates its geometry and the influence of all lights in a single step. It is straightforward, performant for VR/Mobile, and gives us direct access to light data within the object's shader.
*   **Deferred Rendering (Standard Unreal Engine):** The engine separates geometry from lighting. It first fills textures called **G-Buffers** that contain various information (color, normal, depth). Then, it calculates global lighting at the very end for the entire image. This allows for thousands of lights but makes accessing light data more complex for an individual material.

> **Note:** Unity 6 now uses **Forward+**, which blends both approaches by dividing the screen into tiles to sort lights before drawing the objects.

> For more information on how Forward and Deferred Rendering work, I invite you to check out this [link](https://researchandprogram.blogspot.com/2023/10/unity-rendering-paths-.html). 

---

## Unity Implementation: Forward Rendering

In Forward mode, we create the Cel Shading directly inside the object's shader.

### Diffuse Lighting and the Dot Product
The heart of the calculation rests on the **Dot Product (N·L)**. We compare the Normal vector (the direction of the face) with the Light vector (direction of the sun).
*   If the result is 1, the face is directly facing the sun.
*   If the result is 0, the face is perpendicular and therefore not illuminated by the light source.

```hlsl
// Calculating light direction and normals
float3 lightDirection = mainLight.direction;
float3 normalDirection = normalize(v2f.normal);

// Dot product to determine light intensity
float dotResult = dot(normalDirection, -lightDirection);
```

### Half-Lambert and Smoothstep
To achieve an "Anime" look, we use two tricks:
1.  **Half-Lambert:** A technique pioneered by Valve that remaps the light range from [-1, 1] to [0, 1]. This "pushes" the light further into the shadows and prevents perpendicular faces from being completely dark.
2.  **Smoothstep:** As seen previously, this allows us to "slice" the gradient. By using close thresholds, we transform a soft transition into a sharp boundary line between shadow and light.

```hlsl
// Half-Lambert remapping and application of the sharp threshold (Smoothstep)
float halfLambert = (dotResult * 0.5) + 0.5;
float intensity = smoothstep(_DiffuseThreshold + _Smoothing, _DiffuseThreshold - _Smoothing, halfLambert);

// Applying the final color
diffuseColor *= _DiffuseTint.rgb * intensity * mainLight.color;
```

![Diffuse Light rendering in Unity](resources/visuels/posts/cellshading/diffuse_lighting.png)

### Ambient Lighting
Finally, we add the ambient tint. We multiply the object's texture by a global color (`_AmbientTint`) so that shadow areas have a colored identity (often bluish).

```hlsl
// Applying ambient light to the texture
float3 ambientColor = texColor.rgb * _AmbientTint.rgb;
```

![Ambient light rendering in Unity](resources/visuels/posts/cellshading/ambiant_lighting.png)

![Cel Shading rendering in Unity](resources/visuels/posts/cellshading/cell_shading.png)

---

## Unreal Implementation: Deferred Rendering

In Unreal, the solution involves using a **Post-Process Material**.

### Extracting the Light
We divide `SceneColor` by `BaseColor`. The result provides only the lighting data of the scene.

### Creating the Mask
1.  **Desaturation:** To obtain a black-and-white light mask.
2.  **Quantization:** We apply a `smoothstep` to create our sharp color bands.
3.  **Re-application:** We use this mask to `Lerp` between the original texture and a darkened version.

![Unreal node logic for isolating light](resources/visuels/posts/cellshading/ue_nodes_cell_shading.png)

> A common issue with this division method is that the sky (Skybox) often appears black or with visual artifacts, as it isn't treated as a standard geometric surface and returns null or infinite BaseColor values. To fix this, we use the **SceneDepth** node to create a distance mask: if the pixel is too far away (close to infinity), we bypass the Cel Shading calculation and simply display the original SceneColor.

![Unreal node logic implementing the SceneDepth solution](resources/visuels/posts/cellshading/ue_nodes_scene_depth.png)

---

## Conclusion

Cel Shading demonstrates that Technical Art often involves subverting physical laws (like the Blinn-Phong model) to serve an artistic direction. In the next chapter, we will add specular highlights and **Rim Lighting** to help our objects pop from the background.

![Final Cel Shading Result](resources/videos/CellShading.gif)