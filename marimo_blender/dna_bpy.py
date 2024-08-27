import marimo

__generated_with = "0.8.3"
app = marimo.App(width="medium")


@app.cell
def __():
    import base64
    import bpy
    from tldraw import TldrawSetImage


    # Constants
    SCALE_FACTOR = 0.01
    COLLECTION_NAME = "NewCurve"
    RENDER_PATH = "test2.png"

    # Function to scale down the coordinates
    def scale_down_points(points, scale_factor=SCALE_FACTOR):
        return [(x * scale_factor, y * scale_factor) for x, y in points]

    # Function to clear previous curve objects
    def clear_previous_curve(collection_name):
        collection = bpy.data.collections.get(collection_name)
        if collection:
            for obj in collection.objects:
                bpy.data.objects.remove(obj, do_unlink=True)

    # Function to create the curve
    def create_curve_from_points(points):
        clear_previous_curve(COLLECTION_NAME)

        # Create a new curve object
        curve_data = bpy.data.curves.new(name='Curve', type='CURVE')
        curve_data.dimensions = '3D'
        curve_data.fill_mode = 'FULL'

        # Create a new spline in that curve
        polyline = curve_data.splines.new('POLY')
        polyline.points.add(len(points) - 1)

        # Assign points to the spline
        for i, (x, y) in enumerate(points):
            polyline.points[i].co = (x, y, 0, 1)  # Z-axis is set to 0, W to 1

        # Create an object with the curve data
        curve_obj = bpy.data.objects.new('CurveObject', curve_data)

        # Link the curve object to the collection
        collection = bpy.data.collections.get(COLLECTION_NAME)
        collection.objects.link(curve_obj)

        # Apply the Geometry Nodes modifier
        modifier = curve_obj.modifiers.new(name="GeometryNodes", type='NODES')
        modifier.node_group = bpy.data.node_groups["dna_node_setup"]

        return curve_obj

    # Function to render the scene and return the base64 image string
    def render_and_display_image():
        # Set render settings
        bpy.context.scene.render.resolution_x = 900
        bpy.context.scene.render.resolution_y = 900
        bpy.context.scene.render.image_settings.file_format = 'PNG'
        bpy.context.scene.render.image_settings.color_mode = 'RGBA'
        bpy.context.scene.render.film_transparent = True
        bpy.context.scene.render.engine = 'BLENDER_EEVEE_NEXT'
        bpy.context.scene.eevee.taa_render_samples = 16 

        # Render the scene
        bpy.ops.render.render()

        # Save the rendered image to a temporary path
        bpy.data.images['Render Result'].save_render(filepath=RENDER_PATH)

        # Read the image into a base64 string
        with open(RENDER_PATH, "rb") as image_file:
            base64_img_string = f"data:image/png;base64,{base64.b64encode(image_file.read()).decode('utf-8')}"

        return base64_img_string


    bpy.ops.wm.open_mainfile(filepath="dna.blend")
    return (
        COLLECTION_NAME,
        RENDER_PATH,
        SCALE_FACTOR,
        TldrawSetImage,
        base64,
        bpy,
        clear_previous_curve,
        create_curve_from_points,
        render_and_display_image,
        scale_down_points,
    )


@app.cell
def __(TldrawSetImage):
    import marimo as mo
    widget = mo.ui.anywidget(TldrawSetImage())
    widget
    return mo, widget


@app.cell
def __(
    create_curve_from_points,
    mo,
    render_and_display_image,
    scale_down_points,
    widget,
):
    coord_data = widget.coord
    points = [(item['x'], -item['y']) for item in coord_data]
    scaled_points = scale_down_points(points)
    create_curve_from_points(scaled_points)
    base64_img_string = render_and_display_image()
    mo.image(src=base64_img_string)
    return base64_img_string, coord_data, points, scaled_points


@app.cell
def __(base64_img_string, widget):
    widget.set_image(base64img=base64_img_string)
    return


@app.cell
def __(base64_img_string):
    base64_img_string
    return


if __name__ == "__main__":
    app.run()
