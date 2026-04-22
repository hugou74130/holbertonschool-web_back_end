 #!/usr/bin/env python3
  """Hypermedia pagination class"""

  import math
  from typing import List

  from 1-simple_pagination import SimpleServer


  class HypermediaServer(SimpleServer):
      """
      A server for pagination with hypermedia-style responses.
      """

      def get_hyper(
          self,
          page: int,
          page_size: int
      ) -> dict:
          """
          Return a dictionary containing page information.

          Args:
              page: the current page number
              page_size: the number of rows per page

          Returns:
              A dictionary with page_size, page, data, next_page,
              prev_page, and total_pages.
          """
          # Call get_page for the data
          data = self.get_page(page, page_size)
          page_size = len(data)

          # Calculate total pages
          total_data = len(self.dataset)
          total_pages = math.ceil(total_data / page_size) if page_size > 0 else 0

          # Calculate next and prev page numbers
          next_page = page + 1 if page * page_size < total_data else None
          prev_page = page - 1 if page > 1 else None

          return {
              'page_size': page_size,
              'page': page,
              'data': data,
              'next_page': next_page,
              'prev_page': prev_page,
              'total_pages': total_pages
          }
