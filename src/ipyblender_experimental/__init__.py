import importlib.metadata
import pathlib

import anywidget
from traitlets import Int, Unicode, observe

try:
    __version__ = importlib.metadata.version("ipyblender_experimental")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class Counter(anywidget.AnyWidget):
    
    label = Unicode("Color: ").tag(sync=True)
    count = Int(0).tag(sync=True)

    @observe("count")
    def _observe_count(self, change):
        print(f"Old value: {change['old']}")
        print(f"New value: {change['new']}")
        print("--------------------------")

    _esm = pathlib.Path(__file__).parent / "static" / "widget.js"
    # _css = pathlib.Path(__file__).parent / "static" / "widget.css"
