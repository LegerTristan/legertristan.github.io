# Making Lava Fluid and Organic through UV Manipulation

![Lava in motion GIF](resources/videos/UVManipulation.gif)
*Final render: Scrolling, distortion, and displacement combined.*

After exploring the basics with an emission shader, I decided to tackle a fundamental pillar of Technical Art: **UV manipulation**.

The goal of this project was to transform a completely static lava texture into an organic, viscous fluid using only the shader, without any physics simulation or pre-calculated animation. To achieve this, we will use texture coordinates and simple mathematics to create the illusion of movement.

---

## 1. What are UVs?

I'll start by explaining what UVs are: they are coordinates used to project a 2D image, like a texture, onto the surface of a 3D object (such as a cube). 
*   **U** represents the horizontal axis, ranging from 0 to 1.
*   **V** represents the vertical axis, also ranging from 0 to 1.

> Each engine has its own origin: **Unity** places the (0,0) point at the bottom-left (V points up), while **Unreal Engine** places it at the top-left (V points down). 

Without these coordinates, the GPU wouldn't know which "pixel" of the texture to display on each "point" of the mesh. By manipulating these two values before they reach the texture sampling stage, we can move, deform, or warp the image at will just by tweaking these UVs.

> Texture "pixels" are actually called **texels** (Texture Elements). The difference is simple: a **pixel** is the final color point displayed on your screen, while a **texel** is the base unit of a texture stored in memory. When you zoom in on an object, a single texel can end up covering dozens of screen pixels.

To apply any deformation to UVs, we must perform mathematical operations. There are two main types of operations that form the foundation of everything I will present next: 

- **Addition**, which creates an **offset** (a shift). If we took a texture with a white circle centered on a black background, adding a value to the UVs would shift the circle away from the center. 
- **Multiplication**, which changes the **tiling**. This is simply texture repetition: if I multiply my UV coordinates by 2, the texture will appear twice (tiled) on the same face of a cube. If I multiply it by 0.5, only half of the texture will be visible, stretched across the face. 

> Naturally, if addition and multiplication work, the same applies to subtraction and division, as they are simply the inverse operations.

![Offset and tiling example](resources/visuels/posts/uvmanipulation/uv_example.jpg)

---

## 2. Scrolling 

**Scrolling** (panning) is the most direct way to animate a surface. Even though the result feels quite mechanical on its own, it is by far the easiest to implement. 

**The mathematical logic is as follows:** 
*   **The Offset:** As mentioned before, we add a value to the UVs to shift the texture. 
*   **Time:** We use the elapsed time since the game started to make this shift continuous.
*   **Speed:** Finally, we multiply time by a speed vector to control the direction and velocity of the flow.

```hlsl
// Calculating the UV shifted by time and speed
float2 scrolledUV = uv + (_Time.y * _ScrollSpeed.xy);
float4 texColor = tex2D(_MainTex, scrolledUV);
```
*Fragment Shader snippet: Applying scrolling to the main texture.*

![Scrolling made with BP in Unreal](resources/visuels/posts/uvmanipulation/ue_nodes_scrolling.png)

| Engine | Scrolling Tool | Logic |
| :--- | :--- | :--- |
| **Unity** | `_Time.y` | Manual addition to UV |
| **Unreal Engine** | **Panner** Node | Built-in nodal component |

---

## 3. Distortion (UV Warping)

Scrolling a texture in a straight line is predictable. To achieve the unpredictable look of lava, I use **Distortion** with **Perlin Noise**.

> **Perlin Noise** is a mathematical function that generates a "cloudy" procedural texture. It is ideal for simulating natural phenomena like clouds, smoke, or in our case, fluid viscosity.

Since Perlin noise provides a value between 0 and 1, we can use it to offset the texture coordinates locally, creating a "warped" look that simulates viscosity.

**Here are the steps to achieve this:**
*   **Noise Sampling:** We retrieve the noise value via a mask texture that also scrolls (often at a different speed than the lava).
*   **Centering:** Since the noise is in the `[0, 1]` range, it would only shift the texture in one direction (up/right). To fix this, we subtract 0.5, resulting in a `[-0.5, 0.5]` range. This allows the distortion to push pixels left and right, as well as up and down.

Here is a concrete example:

```hlsl
#ifdef _DISTORTION_ON
    float2 noiseUV = v2f.uv + (_Time.y * _NoiseScrollSpeed.xy); 
    float distortion = tex2D(_PerlinNoiseTexture, noiseUV).r; 

    // Applying the chaotic offset to the base UVs
    distortedUV = v2f.uv + (distortion - 0.5) * _DistortionStrength;
#endif
```

![Distorsion made with BP in Unreal](resources/visuels/posts/uvmanipulation/ue_nodes_distorsion.png)

---

## 4. Displacement (Vertex Displacement)

Now that the lava has the illusion of movement, it needs physical depth. We need to modify the mesh geometry using **tessellation**. 

> **Tessellation** is a technique that dynamically subdivides mesh polygons into smaller triangles. By increasing the point density of the 3D model, it allows the shader to "sculpt" much finer details than the original model permitted.

> A **height map** is a grayscale texture where each texel represents an altitude: black is the lowest point (0) and white is the highest (1).

> **Normals** are vectors perpendicular to a mesh's surface. They tell the shader which direction a face or vertex is "looking."

![Visualizing mesh normals](resources/visuels/posts/uvmanipulation/uvmanipulation_normals.png)
*Normals are represented by blue arrows. This image is from the site [https://www.numerical-tours.com/matlab/meshproc_2_basics_3d/](https://www.numerical-tours.com/matlab/meshproc_2_basics_3d/)* 

![Visualizing mesh normals](resources/visuels/posts/uvmanipulation/normals_example.png)
*Normals are represented by blue arrows. This image is from the site *

> Note that there are other ways to move vertices, such as **World Position Offset (WPO)** in Unreal or manipulating `v.vertex` in Unity.

**The displacement steps are as follows:**
*   First, we sample the **Height Map** value.
*   We then multiply this value by the vertex **Normal** (the direction the face points).
*   We add this result to the vertex's original position: `Final Position = Position + (Normal * Height)`.

Tessellation setup in Unity and Unreal is handled very differently.
**Hardware Tessellation** (Unity) uses specific GPU stages (Hull/Domain Shaders) to divide triangles, whereas **Software Tessellation** (like Nanite in Unreal) relies on more modern and flexible rendering algorithms.

*   **Unity:** Since this is a change at the vertex level rather than pixel color, we must work in the **vertex shader**. We use `tex2Dlod` instead of `tex2D` to move the points. This requires a highly subdivided mesh due to the nature of hardware tessellation.

*   **Unreal Engine:** Since UE 5.3, classic tessellation has been replaced by **Nanite Tessellation**. It is enabled in the static mesh settings and the material by checking "Enable Displacement Map." Nanite then handles adding millions of triangles on the fly.

```hlsl
#ifdef _DISPLACEMENT_ON
    float heightMap = tex2Dlod(_DisplacementMask, float4(scrolledUV, 0, 0)).r;
    float displacement = heightMap * _DisplacementStrength;

    // Real vertex displacement in object space
    finalPos += input.vertexNormal.xyz * displacement;
#endif
```
*Example of displacement in an HLSL shader in Unity*

![Nanite Tessellation setup in Unreal](resources/visuels/posts/uvmanipulation/ue_nodes_tesselation.png)

---

## 5. Result and Future Improvements

For the final render, I reused the emission and masking principles covered in my previous project to make the intense magma areas glow.

![Result static vs dynamic lava](resources/videos/UVManipulation_UnrealResult.gif)
*Left: simple texture. Right: complete shader with displacement and emission.*

### Future Improvements:

Here are a few ideas I didn't include but that would have significantly improved the lava's appearance:

*   **Fractal Distortion (Domain Warping):** An advanced technique where you use an initial noise to distort the UVs of a second noise. You then use this second noise to distort the lava. This creates much more complex and organic swirling shapes, ideal for smoke or highly viscous fluids.
*   **Flow Maps:** Instead of linear scrolling, you can use a vector texture (Flow Map) to direct the lava around obstacles in the environment.

This concludes the chapter on UV manipulation. It allows you to bring life to an inert environment with minimal performance cost. 
On my end, this project helped me build the necessary foundation before tackling my next challenge: Post-processing and Color Grading!