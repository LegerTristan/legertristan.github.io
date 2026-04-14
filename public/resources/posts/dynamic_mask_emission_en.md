# Creating a Scan Effect from an Emission Shader with Masking

![Final render video](resources/videos/DynamicMaskEmission.gif)

This year, I decided to dive seriously into the world of shaders to master them. To start this learning journey, I chose to work on an emission shader. It is an ideal first project because it is simpler to develop and does not require complex lighting calculations to provide an immediate visual result.



## What is a shader?

Each engine has its own specific ways of creating shaders. To ensure I understand every step of a render rather than just copying it, I wanted to create this shader in two different ways:

- **Using Unreal Engine's Material Editor**, a nodal tool that is generally more intuitive and simple.
- **Writing HLSL code via ShaderLabs in Unity**. The goal is to gain a better mathematical understanding of the rendering process and to learn how to handle data that is often managed by default in nodal approaches.

> **Important**: Unity also has a nodal solution, Shader Graph. Beyond the fact that I find it less powerful than Unreal's Material Editor, there is simply no simple solution for programming in pure HLSL on Unreal Engine; therefore, my only option was to do this in Unity.



## The Unreal and Unity approach

Each engine has its own particularities for creating shaders. To ensure I understand every step of a render rather than just knowing how to copy it, I wanted to create each shader in two different ways:
- **Using Unreal Engine's Material Editor**, a nodal tool that is generally more intuitive and simple.
- **Writing HLSL code via ShaderLabs in Unity**. The goal is to have a better mathematical understanding of the render and also to learn how to process information that is often managed by default by nodal approaches.

> **Note**: Unity also offers a nodal solution, Shader Graph. Besides the fact that I consider it less efficient than Unreal's material editor, there is simply no easy way to program in HLSL on Unreal Engine, so my only option was to do it on Unity.



## How to transform a simple emission shader into a scanner effect? 

The scan effect is a video game classic: everyone has their own vision of a scan, and although the final result may seem complex, its structure is based on simple mathematical pillars. 
In my case, I imagined it as a glowing and relatively thin line rising along the character's body with an intense color. 

> **Note**: Since this is a first shader, I will not take lighting management into account to simplify the code. This will have an impact on the final render difference between Unity and Unreal, as Unreal's material editor already handles certain lighting information natively, unlike Unity's ShaderLabs.



## Step 1: Emission

First and foremost, we need to apply this characteristic glow to the character. To do this, we define the emission tint and an intensity that will allow us to strengthen this glow.

We start by multiplying the tint by the intensity to enhance the luminance. Then, for this tint to apply to the character's current texture, we add the tint to the Albedo. For the result to be truly emissive, an intensity greater than 1.0 must be defined.

```hlsl
float3 emission = _EmissionTint.rgb * _EmissionIntensity;
return float4(texColor.rgb + emission, texColor.a);
```
*HLSL code to apply emission to the character.*

![Blueprints for emission in Unreal.](resources/visuels/posts/dynamicmaskemission/ue_nodes_emission.png)

Blueprint to apply emission to the character in Unreal Engine.

This gives us our characteristic glowing halo. We will see later how to add Bloom to reinforce this effect; in the meantime, let's leave it as is.

![Current render with emission.](resources/visuels/posts/dynamicmaskemission/dme_emission.jpg)

> **Aside**: Emission calculation differs between engines. Unreal uses a linear multiplication (`Color * Intensity`). Unity often uses a logarithmic logic (`Color * pow(2, Intensity)`), similar to how "stops" work in photography. To learn more about stops, I invite you to check this link: [https://en.wikipedia.org/wiki/Exposure_value](https://en.wikipedia.org/wiki/Exposure_value).



## Step 2: Masking

To obtain a scan line, we use **masking**. Masking is the act of using a mask—a value between 0 and 1—to define the visibility of something like a color or a texture. 0 generally means invisible and 1 means visible.

Thanks to this, instead of illuminating the entire body, we only highlight a specific part. To choose which part will be glowing, we retrieve the local position of the character on the vertical axis (Y), which generally corresponds to the feet. Then, using an exponent, we can sharpen this selection to keep only a very thin band.

```hlsl
float maskValue = pow(max(v2f.localPos.y, 0), _ScanSharpness);
// ...
float3 emission = _EmissionTint.rgb * _EmissionIntensity * maskValue;
return float4(texColor.rgb + emission, texColor.a);
```
*HLSL code to display only an emission band at the feet level.*

![Blueprints for mask in Unreal.](resources/visuels/posts/dynamicmaskemission/ue_nodes_mask.png)

Blueprint to display only an emission band at the feet level in Unreal Engine.

This results in a fixed line at the character's feet.

![Current render with masking.](resources/visuels/posts/dynamicmaskemission/dme_mask.jpg)
*If you don't see the band on the character's feet, don't worry. It is often located just below the mesh in these cases. By making it move in the next step, we will undoubtedly see it.*

> **Important**: It is also possible to use a black and white texture as a mask if you want more specific or organic scan shapes. This is generally even more efficient than calculating the mask manually.



## Step 3: UV Scrolling

To make the line move, we inject the **Time** variable (`_Time`) into the shader. It allows us to scroll the mask along the body. However, for now, the mask never returns to the feet once it reaches the head. 

To handle this, we use the **sine (sin)** function. Since this function oscillates between -1 and 1, it allows the movement to repeat up and down cyclically. 

```hlsl
// _ScanFrequency allows adding more lines if desired.
float scan = sin((v2f.localPos.y * _ScanFrequency) - (_ScrollSpeed.x * _Time.y));
maskValue = pow(max(scan, 0), _ScanSharpness);
// ...
float3 emission = _EmissionTint.rgb * _EmissionIntensity * maskValue;
return float4(texColor.rgb + emission, texColor.a);
```
*HLSL code to add the cyclical movement of the line.*

![Blueprints for scrolling in Unreal.](resources/visuels/posts/dynamicmaskemission/ue_nodes_scrolling.png)

Blueprint to add the cyclical movement of the line in Unreal Engine.

By combining time and sine, we obtain a smooth and perpetual movement of the scan line.

![Final render video](resources/videos/DynamicMaskEmission_Scan.gif)

> **Note**: I will not go into detail regarding UVs as that will be the subject of my next shader project.



## Step 4: Scene Setup

Emission alone is not enough to make the object "glow" on screen. It is imperative to add a **Post-Process effect: Bloom**.
Bloom detects areas where intensity exceeds 1.0 (HDR) and spreads them over neighboring pixels to simulate a lens flare/glow.

- **To activate it in Unity**: Ensure the project uses URP or HDRP, then add a `Global Volume` component. Finally, configure the Bloom effect and make sure HDR is enabled on the camera.
- **To activate it in Unreal**: It is enabled by default, but you can customize it by adding a `Post Process Volume` to your scene and modifying the `Bloom` category.



## Conclusion

This dynamic emission shader is, in my eyes, an essential foundation before tackling more complex effects like dissolve or holograms. This project was an opportunity for me to transform a static material into a cool visual effect by simply manipulating time, masks, and intensity.

I hope you enjoyed the topic. Thank you for your attention and feel free to contact me on LinkedIn to discuss it!

![Final render video](resources/videos/DynamicMaskEmission.gif)