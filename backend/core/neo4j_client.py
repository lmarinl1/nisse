"""Neo4j driver singleton for Derivaciones del tiempo.

MongoDB remains the primary document store (Study, Recall, …).
Neo4j is an additional connection used only for derivation graphs.
"""

from __future__ import annotations

from neo4j import Driver, GraphDatabase
from django.conf import settings

_driver: Driver | None = None


def get_neo4j_driver() -> Driver:
    global _driver
    if _driver is None:
        _driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
        )
    return _driver


def close_neo4j_driver() -> None:
    global _driver
    if _driver is not None:
        _driver.close()
        _driver = None
