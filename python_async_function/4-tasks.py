#!/usr/bin/env python3
import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    delays = []

    async def collect(task):
        result = await task
        delays.append(result)

    await asyncio.gather(*[collect(task_wait_random(max_delay)) for _ in range(n)])

    return sorted(delays)
