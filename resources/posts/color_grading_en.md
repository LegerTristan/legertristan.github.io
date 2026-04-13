# Customizing Visual Rendering via Post-Processing & Color Grading

A game engine's raw output can sometimes lack a clear identity. For this third step of my roadmap, I focused on **Color Grading**. Unlike object shaders, post-processing acts directly on the final image sent to the screen, allowing for complete customization of the project's atmosphere.

![Comparison: Standard Render vs Color Graded Render](resources/visuels/posts/colorgrading/cg_result.png)

Unlike previous projects, the goal here is not to follow a linear progression, but to present several fundamental colorimetry concepts and their technical implementation as a shader.

## What is Color Grading?
Color Grading is the process of altering the appearance of an image. In video games, it is used to strengthen a narrative, simulate a specific camera, or simply give a unique visual signature. A concrete example is achieving a "Noir" or "Cinematic" look, where the management of light and hues takes precedence over raw color.

## First Concept: Contrast
Contrast defines the intensity gap between the dark and light areas of a scene. High contrast enhances depth but can quickly wash out shadows and highlights.

To modify contrast without shifting the global exposure, we use the **Pivot** method. The calculation is centered around the value 0.5, as it represents the midpoint on a grayscale.
Here are the steps:
1. Subtract 0.5 from the color to center the values.
2. Multiply by the contrast factor.
3. Add 0.5 back to return the result to the standard color range.

```hlsl
// Contrast implementation with 0.5 pivot
float3 color = (texColor.rgb - 0.5) * _Contrast + 0.5;
```

![Nodes to add in Unreal for contrast.](resources/visuels/posts/colorgrading/cg_nodes_contrast.png)

>In the Unreal Engine Material Editor, accessing the pixels rendered by the camera is not done through a standard texture sampler.    
> You must use the **SceneTexture** node and set its ID to **PostProcessInput0**. This input retrieves the scene's image before our effect is applied.

![Render illustrating contrast adjustment in Unreal](resources/visuels/posts/colorgrading/cg_rendu_contrast.png)



## Second Concept: Saturation and Luminance
Saturation controls the intensity of colors. This is what allows us to turn images into black and white, for example.

Saturation defines how much of the luminance is used in our scene.
Simply put, luminance is the **brightness of a color as perceived by the human eye**.
The human eye does not perceive all colors with the same intensity. At equal power, green will always appear much brighter to us than blue. Therefore, for a realistic result, we use a standard luminance vector: `(0.2126, 0.7152, 0.0722)`.   
Here is how to use luminance to set up saturation:

1. Perform a **Dot Product** between the pixel and this luminance vector to obtain a perfect gray value.
2. Use a linear interpolation (**Lerp**) to navigate between this gray value and the original color based on the saturation parameter.

```hlsl
// Luminance and saturation calculation
float luma = dot(color, float3(0.2126, 0.7152, 0.0722));
float3 saturatedColor = lerp(float3(luma), color, _Saturation);
```

![Nodes to add in Unreal for saturation.](resources/visuels/posts/colorgrading/cg_nodes_saturation.png)

![Render illustrating luminance-based saturation in Unreal](resources/visuels/posts/colorgrading/cg_rendu_saturation.png)



## Third Concept: Color Isolation
This technique involves desaturating the entire scene except for a specific hue (for example, keeping only red for a dramatic effect).

To achieve this isolation, we must calculate the Euclidean distance between the current pixel's color and a target hue.
- If the distance is low (near 0), the pixel is preserved.
- If it is high, the pixel undergoes the desaturation seen previously.

```hlsl
// Color isolation via distance and a mask
float d = distance(texColor.rgb, _TargetColor.rgb);
float mask = 1.0 - smoothstep(_Threshold, _Threshold + _Softness, d);
float3 isolatedColor = lerp(desaturateColor.rgb, textureColor.rgb, mask);
```

![Nodes to add in Unreal for color isolation.](resources/visuels/posts/colorgrading/cg_nodes_color_isolation.png)

Using the `smoothstep` function allows for a smooth transition and avoids pixelated edges on the isolated areas.

![Render illustrating color isolation with full desaturation on non-isolated areas.](resources/visuels/posts/colorgrading/cg_rendu_color_isolation.png)



## Post-Process Setup
Once the shader is written, it must be injected into the engine's rendering pipeline. The setup is quite different between Unity and Unreal.

### In Unity (URP)

You must have a project using URP or HDRP, which can be determined at project creation or added later.

1. In the shader code, I used the **Full Screen Pass Renderer Feature**. This allows the shader to be applied after the scene has been rendered.
2. To optimize performance, the shader uses a **Fullscreen Triangle** via `SV_VertexID`, avoiding the need to load a Quad mesh into memory.
3. Create a material based on your shader.
4. Access your scene's URP settings and replace the existing material with the new one you just created.

```hlsl
// Using SV_VertexID to generate the fullscreen triangle
Varyings vert (Attributes input) {
    Varyings output;
    output.positionCS = GetFullScreenTriangleVertexPosition(input.vertexID);
    output.uv = GetFullScreenTriangleTexCoord(input.vertexID);
    return output;
}
```

![Renderer Feature setup in Unity](resources/visuels/posts/colorgrading/cg_postprocess_unity.png)

### In Unreal Engine

1. In your Material, set your output domain to "Post Process" and assign it in the "Rendering Features" section.
2. To ensure that color modifications are not overwritten by the engine's native HDR calculations, set the injection point to `After Tonemapping`.
3. In your scene, create a **Post Process Volume**.
4. Assign your new material to it.

![Material Domain setup in Unreal](resources/visuels/posts/colorgrading/cg_postprocess_unreal.png)

![Post Process Volume setup in Unreal](resources/visuels/posts/colorgrading/cg_postprocess_unreal_2.png)



## Differences and Optimizations

In summary, Unity requires a more manual approach via HLSL and Renderer Features to optimize rendering, while Unreal Engine offers a more direct spatial integration via Post Process Volumes, automatically managing screen geometry.

That's all for this shader, but we could go further by integrating **LUTs (Look-Up Tables)**.
With these, we could directly import color profiles from editing or photography software for better artistic precision.

Overall, Color Grading is a powerful tool that can radically transform a game's perception. By understanding how to manipulate luminance and contrast mathematically, we can create a truly unique visual identity for a game.

![Comparison: Standard Render vs Color Graded Render](resources/visuels/posts/colorgrading/cg_result.png)