import importlib.metadata
import pathlib
from .render_to_image import render_to_image
from .render_to_gltf_model import render_to_gltf_model
import anywidget
from traitlets import Int, Unicode, observe,Float

try:
    __version__ = importlib.metadata.version("ipyblender_experimental")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"

class BlenderWidget(anywidget.AnyWidget):
    label = Unicode("Color: ").tag(sync=True)
    base64Image = Unicode(
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    ).tag(sync=True)


    count = Int(0).tag(sync=True)
    svalue = Float(30).tag(sync=True)

    @observe("svalue")
    def _observe_svalue(self, change):
        self.base64Image = render_to_image(self.count, self.svalue)

    @observe("count")
    def _observe_count(self, change):
        self.base64Image = render_to_image(self.count, self.svalue)

    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    # _css = pathlib.Path(__file__).parent / "static" / "widget.css"


class BlenderInteractiveWidget(anywidget.AnyWidget):
    label = Unicode("Color: ").tag(sync=True)
    base64Image = Unicode(
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    ).tag(sync=True)



    


    count = Int(0).tag(sync=True)
    svalue = Float(30).tag(sync=True)

    model_data = render_to_gltf_model(count, svalue)
    torusname = Unicode(model_data).tag(sync=True)

    @observe("svalue")
    def _observe_svalue(self, change):
        self.base64Image = render_to_image(self.count, self.svalue)

    @observe("count")
    def _observe_count(self, change):
        self.base64Image = render_to_image(self.count, self.svalue)

    _esm = pathlib.Path(__file__).parent / "static" / "widget2.js"
    # _css = pathlib.Path(__file__).parent / "static" / "widget.css"

