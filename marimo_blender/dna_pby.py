import marimo

__generated_with = "0.7.19"
app = marimo.App(width="medium")


@app.cell
def __():
    import base64
    import pathlib
    from pathlib import Path

    import bpy
    import ipywidgets as widgets
    from IPython.display import Image, clear_output, display
    from traitlets import Any, Bool, Dict, Int, List, Tuple, Unicode, observe

    import anywidget


    class TldrawSetImage(anywidget.AnyWidget):
        @staticmethod
        def base64_to_image_dimensions(base64_img_string):
            base64_img_string_only = base64_img_string.split(",")[1]
            decoded_bytes = base64.b64decode(base64_img_string_only)
            if decoded_bytes[:8] != b"\x89PNG\r\n\x1a\n":
                raise ValueError("Invalid PNG file")
            ihdr_start = 8
            ihdr_end = decoded_bytes.find(b"IHDR") + 4 + 8
            ihdr_chunk = decoded_bytes[ihdr_start:ihdr_end]
            image_width = int.from_bytes(ihdr_chunk[8:12], byteorder="big")
            image_height = int.from_bytes(ihdr_chunk[12:16], byteorder="big")
            return image_width, image_height

        def __init__(self, **kwargs):
            super().__init__(**kwargs)

        def set_image(self, base64img):
            if not base64img:
                raise ValueError("No image provided")

            image_width, image_height = self.base64_to_image_dimensions(base64img)
            self.image_dimensions = (int(image_width / 2), int(image_height / 2))
            self.base64img = base64img

        base64img = Unicode("").tag(sync=True)
        image_dimensions = Tuple(Int(), Int(), default_value=(0, 0)).tag(sync=True)


        length = Int(100).tag(sync=True)
        coord = List().tag(sync=True)

        path_root = pathlib.Path().home()
        _esm = path_root / "projects/jupyter-tldraw/src/tldraw/static" / "image_set.js"
        _css = path_root / "projects/jupyter-tldraw/src/tldraw/static" / "image_set.css"



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
        Any,
        Bool,
        COLLECTION_NAME,
        Dict,
        Image,
        Int,
        List,
        Path,
        RENDER_PATH,
        SCALE_FACTOR,
        TldrawSetImage,
        Tuple,
        Unicode,
        anywidget,
        base64,
        bpy,
        clear_output,
        clear_previous_curve,
        create_curve_from_points,
        display,
        observe,
        pathlib,
        render_and_display_image,
        scale_down_points,
        widgets,
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


@app.cell
def __(base64_img_string, widget):
    widget.set_image(base64img=base64_img_string)
    return


if __name__ == "__main__":
    app.run()
