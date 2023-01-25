import os
import sys

parent_package_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if parent_package_dir not in sys.path:
    sys.path.append(parent_package_dir)

from cgpa import parse_input

parse_input()
