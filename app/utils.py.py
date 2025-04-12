import math
from datetime import datetime

def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between coordinates using Haversine formula"""
    R = 6371  # Earth radius in km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat/2) * math.sin(dLat/2) +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon/2) * math.sin(dLon/2))
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

def format_date(value, format='%Y-%m-%d'):
    """Format datetime object to string"""
    if value is None:
        return ""
    return value.strftime(format)