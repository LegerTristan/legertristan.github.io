# WorldGrid Shader: Mastering Scale and Spaces

![Grid shader GIF on different shapes](resources/videos/WorldGrid_Showcase.gif)
*Final render: An adaptive procedural grid with relief and rounded corners.*

After initiating myself into post-process shaders, I am continuing my Technical Art roadmap by tackling an essential game development tool: the **WorldGrid Shader**.

## Why a Grid Shader?

It is one of the favorite tools for Game Designers and Level Designers during the prototyping phases.    
It serves two main interests:

1.  **Visualizing scale:** A one-meter grid allows for instantly realizing the size of a room or the height of a jump.
2.  **UV Independence:** Unlike a classic texture that stretches if a cube is enlarged, the WorldGrid remains fixed and aligned with the world, regardless of the transformations applied to the mesh.

> **Note:** In our case, we will focus on the square grid. However, it is entirely possible to create different grids such as hexagonal ones (notably found in the "Civilization" game franchise).

We are going to see how to build this shader through 4 key points, moving from a simple repetition to a complete system, adaptable for **World Space** or **Local Space**.

---

## 1. The Frac Function: The engine of repetition

To begin, we must produce the grid that extends to infinity. For this, there is an indispensable function: `frac()`.   
It only keeps the decimal part of a number (ex: `frac(10.3) = 0.3`).

By applying this to the position coordinates (X and Y), we force the value to return to 0 as soon as it reaches 1. We thus create a repetitive cell of 1x1 unit. To obtain the edges of the grid, we retrieve the X and Y components and use a `max()` to keep only the contours.

```hlsl
// Unity HLSL: Isolate the cell
float2 gridCell = frac(position / _GridSize);
gridCell = abs(gridCell - 0.5); // Centering coordinates
```

![In Unreal, there is a Frac node that works exactly the same way as the function.](resources/visuels/posts/worldgrid/ue_nodes_frac.png)

---

## 2. Step and SmoothStep: Defining the edges

Once our coordinates are repeated, we must define the thickness of the lines so that they are clearly visible or discrete.   
Facing this type of problem, we have already seen the solution in a previous post; there are two functions for delimiting: 

*   **Step:** Creates a sharp cut (0 or 1). It is efficient but produces aliasing.
*   **SmoothStep:** More frequently used because it works like `step` and adds the possibility of implementing a smooth transition between the two values. It is therefore perfect for smoothing the edges of our grid and later integrating a **Bevel** parameter.

```hlsl
// Unity HLSL: Creating the line mask
float finalLineThickness = _LineThickness / 2;
float2 mask2D = smoothstep(0.5 - finalLineThickness - _Bevel, 0.5 - finalLineThickness, gridCell);
float gridMask = max(mask2D.x, mask2D.y);
```

![Unreal Nodes for the smoothstep](resources/visuels/posts/worldgrid/ue_nodes_step.png)

> **Note:** Here, I use a "Bevel" variable because it also serves me later in the creation of grooves. In your case, you can completely rename the variable as you wish.

![Unity simple grid render](resources/visuels/posts/worldgrid/render_grid.png)

---

## 3. Triplanar Mapping: Anti-stretching

If you are creating the shader at the same time, you must have noticed several problems. For example, depending on the game engine, the grid rendering is abnormal on any shape other than a cube. Moreover, with the exception of the top and bottom faces, the other faces look stretched.

This is due to the fact that the grid is currently represented only on one plane, whereas our scene is in 3D. We must therefore adapt our formula to the different planes; we will use **Triplanar Mapping**.

This technique solves most of our problems by projecting the grid from the three axes (X, Y, Z) simultaneously. This essentially amounts to applying it on 3 planes at once. Then, the shader calculates a "weight" for each face based on its normal: if a face looks upward, we display the Y projection. If it looks forward, we display the Z projection, etc.

> I will come back in more detail to the mathematics of Triplanar in a dedicated post, as it is a rather complex concept.   
> For the moment, I will just provide you with a simplified code snippet so that the idea is clear.   
> I invite you to research on your own if you want to know exactly how to implement this notion.

```hlsl
// Unity HLSL: Weight calculation and triplanar blending
float3 weights = pow(abs(normalWS), 4);
weights /= (weights.x + weights.y + weights.z); // Manhattan Normalization

// Projections on the 3 planes (YZ, XZ, XY)
float hX = GetGridHeight(pos.yz / _GridSize);
float hY = GetGridHeight(pos.xz / _GridSize);
float hZ = GetGridHeight(pos.xy / _GridSize);

// Final blend
float finalH = (hX * weights.x) + (hY * weights.y) + (hZ * weights.z);
```

![Left: Triplanar Mapping (clean on all faces). Right: simple projection (stretching).](resources/visuels/posts/worldgrid/render_triplanar_mapping.png)

---

## 4. World Space vs Local Space

By default, a World Grid Shader works in World Space. If you rotate your cube, the grid does not rotate. This is perfect for floors, but problematic for moving objects (crates, doors).

I therefore added a **Local Space** mode. This obviously has drawbacks compared to World Space, specifically that the grid stretches with the object if you change its scale. Fortunately, there is a way to cancel this out. The method consists of retrieving the actual size of the object in the world (`WorldScale`) and multiplying the local position by it. Thus, 1 grid unit always corresponds to 1 meter in the world, even if the cube is stretched.

> **Important:** The default space differs depending on the engines. **Unity** sends mesh data in **Local Space** (Object Space) by default in the vertex shader. To obtain World Space, the `unity_ObjectToWorld` matrix must be used.   
> Conversely, the **Unreal** Material Editor is directly in **World Space**. To retrieve local space, the specific `LocalPosition` node must be used.

To perform the conversion, vector transformation functions are used:
*   **Unity:** `TransformObjectToWorld(input.vertexPosition)` to move from local to world.
*   **Unreal:** The **Transform** node (Source: World Space, Destination: Local Space) to do the inverse.

![Unreal Local Space Nodes](resources/visuels/posts/worldgrid/ue_nodes_localspace.png)

---

## Bonus 1: Adding "Corners" (SDF)

To round the grid intersections, I use the logic of **SDF (Signed Distance Fields)**. An SDF is a function that returns the distance between a point and the edge of a shape. By calculating the distance between the center of our cell and its corners (0.5, 0.5) via the `length()` function, we can generate perfect rounded corners at the line crossings.

```hlsl
// Unity HLSL: Rounded corner mask at intersections
float2 gridCell = abs(frac(uv) - 0.5);
float distanceToCorner = length(0.5 - gridCell);
float cornerMask = 1.0 - smoothstep(finalRadius - _Bevel, finalRadius, distanceToCorner);
gridMask = max(gridMask, cornerMask);
```

![Equivalent of Unity HLSL in Unreal Material Editor](resources/visuels/posts/worldgrid/ue_nodes_corner.png)

![Rounded corners render](resources/visuels/posts/worldgrid/render_corner.png)

---

## Bonus 2: The Bevel (Groove effect)

To give depth to the grid without adding polygons, we simulate a relief.   

*   **In Unity:** We sample the height of the grid at the current pixel (`h`), then a bit more to the right (`hX`) and a bit higher (`hY`). The difference gives us a slope, which we combine with the object's normal to react to light.

```hlsl
// Unity HLSL: Calculating the slope for relief
float3 bump = float3(h - hX, h - hY, 0.01) * _BumpStrength;
float3 finalNormal = normalize(normalWS + bump);
```

*   **In Unreal:** In Deferred Rendering, we do not calculate the light ourselves. We use **hardware derivatives** via the **DDX** and **DDY** nodes. Furthermore, these nodes provide the value difference between the current pixel and its neighbor on the screen. 
The **PerturbNormalHQ** node then uses these derivatives to "twist" the mesh normal instantly. This is extremely efficient because it avoids recalculating the grid function multiple times, which is necessary in the method used in Unity.

![Unreal Bevel Nodes](resources/visuels/posts/worldgrid/ue_nodes_bevel.png)

![The addition of relief radically changes the perception of the object, giving it an "engraved" appearance.](resources/visuels/posts/worldgrid/render_bevel.png)

---

## Conclusion

The WorldGrid Shader is a good example of how simple mathematics (`frac`, `abs`, `dot`) can solve concrete production problems. This project allowed me to solidify my understanding of coordinate spaces, a crucial step before tackling more artistic subjects.

![Final Grid Shader showcase](resources/visuels/posts/worldgrid/final_showcase.jpg)