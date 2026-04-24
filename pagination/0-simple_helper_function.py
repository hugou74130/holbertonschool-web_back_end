#!/usr/bin/env python3
"""Module providing a helper function to calculate pagination index ranges."""
from typing import Tuple


def index_range(page: int, page_size: int) -> tuple:
      """Return (start_index, end_index) for pagination."""
      start_index = (page - 1) * page_size                                                     
      end_index = page * page_size                                                             
      return (start_index, end_index) 
