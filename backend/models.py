from pydantic import BaseModel
from typing import List, Optional

class Vendor(BaseModel):
    id: str
    name: str
    stock: int
    cost_per_unit: float
    lead_time_days: int

class Order(BaseModel):
    id: str
    vendor_id: str
    quantity: int
    status: str
    expected_delivery: str

class StateResponse(BaseModel):
    vendors: List[Vendor]
    orders: List[Order]

class SimulationOption(BaseModel):
    name: str
    description: str
    score: float

class SimulationResponse(BaseModel):
    detected_issue: str
    options: List[SimulationOption]
    best_option: str
    reasoning: str
    impact_saved: float
    counterfactual_loss: float
    audit_log: List[str]
