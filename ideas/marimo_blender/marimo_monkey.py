import marimo

__generated_with = "0.8.3"
app = marimo.App(width="medium")


@app.cell
def __():
    import bpy
    import marimo as mo
    import matplotlib.pyplot as plt
    import matplotlib.image as mpimg


    # Enable RGBA (including alpha channel) and set the alpha mode to 'TRANSPARENT'
    bpy.context.scene.render.image_settings.file_format = 'PNG'
    bpy.context.scene.render.image_settings.color_mode = 'RGBA'
    bpy.context.scene.render.film_transparent = True
    bpy.context.scene.render.engine = 'BLENDER_WORKBENCH'

    bpy.ops.mesh.primitive_monkey_add()
    monkey = bpy.context.object
    monkey.scale = (2.5, 2.5, 2.5)
    return bpy, mo, monkey, mpimg, plt


@app.cell
def __(bpy):
    # Set render resolution
    bpy.context.scene.render.resolution_x = 800
    bpy.context.scene.render.resolution_y = 300
    bpy.context.object

    return


@app.cell
def __(mo):
    slider = mo.ui.slider(start=1, stop=100, label="Slider", value=3)
    slider
    return slider,


@app.cell
def __(bpy, monkey, mpimg, plt, slider):
    monkey.rotation_euler.y = slider.value * 0.01
    bpy.context.view_layer.update()

    bpy.ops.render.render()
    path = "test.png"
    bpy.data.images['Render Result'].save_render(filepath=path)

    img = mpimg.imread('test.png')
    plt.figure(figsize=(6, 6))
    plt.imshow(img)
    plt.axis('off')
    plt.gca()
    return img, path


@app.cell
def __():
    return


@app.cell
def __():
    i =0
    print(i)
    return i,


@app.cell
def __():
    i += 1
    return i,


@app.cell
def __():
    return


if __name__ == "__main__":
    app.run()
