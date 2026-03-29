from typing import List
from .models import Vendor, Order

def generate_initial_vendors() -> List[Vendor]:
    return [
        Vendor(id="v1", name="Global Logistics Co.", stock=500, cost_per_unit=120.0, lead_time_days=3),
        Vendor(id="v2", name="Metro Suppliers", stock=200, cost_per_unit=135.0, lead_time_days=1),
        Vendor(id="v3", name="Swift Source", stock=50, cost_per_unit=150.0, lead_time_days=0),
    ]

def generate_initial_orders() -> List[Order]:
    return [
        Order(id="ord-101", vendor_id="v1", quantity=300, status="Pending", expected_delivery="2026-04-01"),
        Order(id="ord-102", vendor_id="v2", quantity=150, status="Shipped", expected_delivery="2026-03-30"),
        Order(id="ord-103", vendor_id="v1", quantity=400, status="Pending", expected_delivery="2026-04-05"),
    ]
