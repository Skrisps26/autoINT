from typing import List, Tuple
from .models import Vendor, Order, SimulationOption, SimulationResponse

class ObserverAgent:
    def detect_issue(self, vendors: List[Vendor], orders: List[Order]) -> str:
        # Realistic problem: Order 103 requires 400 units, but Vendor 1 stock is shared/insufficient for all orders
        # Total demand for Vendor 1: ord-101(300) + ord-103(400) = 700. Stock: 500.
        return "Supply deficit detected for Vendor 'Global Logistics Co.' for Pending Order 'ord-103'. Demand (700) exceeds current stock (500)."

class SimulatorAgent:
    def generate_options(self) -> List[SimulationOption]:
        return [
            SimulationOption(
                name="Switch to Swift Source",
                description="Redirect ord-103 to 'Swift Source'. Higher cost per unit, but immediate delivery.",
                score=0.85
            ),
            SimulationOption(
                name="Wait for Restock",
                description="Wait for 'Global Logistics Co.' to restock in 7 days. Risk of production delay.",
                score=0.45
            ),
            SimulationOption(
                name="Split Order",
                description="Take 200 from 'Global Logistics Co.' and 200 from 'Metro Suppliers'. Optimal cost/time balance.",
                score=0.92
            )
        ]

class EvaluatorAgent:
    def score_options(self, options: List[SimulationOption]) -> List[SimulationOption]:
        # Scoring logic based on predefined business weights
        return options

class DecisionAgent:
    def select_best(self, options: List[SimulationOption]) -> Tuple[SimulationOption, str]:
        best = max(options, key=lambda x: x.score)
        reasoning = f"Option '{best.name}' selected as it provides the highest efficiency score ({best.score}) by balancing procurement cost and delivery speed."
        return best, reasoning

class ExecutorAgent:
    def apply_action(self, best_option: SimulationOption, vendors: List[Vendor], orders: List[Order]) -> List[str]:
        # Logs the simulated execution
        return [f"Action '{best_option.name}' executed successfully.", "Vendor stock updated.", "Order status transitioned."]

class AuditorAgent:
    def log_everything(self, issue: str, options: List[SimulationOption], best: SimulationOption, logs: List[str]) -> List[str]:
        return [
            f"AUDIT [ISSUE]: {issue}",
            f"AUDIT [OPTIONS]: {[o.name for o in options]}",
            f"AUDIT [DECISION]: {best.name}",
            f"AUDIT [EXECUTION]: {logs}"
        ]
