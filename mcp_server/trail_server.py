from mcp.server.fastmcp import FastMCP

mcp = FastMCP("Trail Info")

TRAILS = [
    {"name": "Bright Angel Trail", "distance_km": 15.0, "difficulty": "Moderate"},
    {"name": "Fairy Falls & Grand Prismatic Overlook", "distance_km": 8.5, "difficulty": "Easy"},
    {"name": "El Capitan Valley Floor Trail", "distance_km": 11.0, "difficulty": "Easy"},
    {"name": "Yellowstone Grand Loop", "distance_km": 230.0, "difficulty": "Strenuous"},
]


@mcp.tool()
def trail_info() -> list[dict]:
    """Return the list of mountain trails with name, distance (km), and difficulty."""
    return TRAILS


if __name__ == "__main__":
    mcp.run()
