# ipyblender_experimental

Bringing the blender rendering engine into jupyter notebook.  
No need to install Blender.  
Only compatible with **Python 3.10**!

## Installation
```
python3.10 -m venv .venv && source .venv/bin/activate
pip install ipyblender_experimental
touch hello.ipynb
```

## Usage

```python
from ipyblender_experimental import BlenderWidget
BlenderWidget()
```
