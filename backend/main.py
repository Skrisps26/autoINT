from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import StateResponse, SimulationResponse, SimulationOption
from .data import generate_initial_vendors, generate_initial_orders
from .agents import ObserverAgent, SimulatorAgent, EvaluatorAgent, DecisionAgent, ExecutorAgent, AuditorAgent

app = FastAPI(title="Reality Engine API")

# Setup CORS for Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Simplified for demo
    allow_methods=["*"],
    allow_headers=["*"],
)

# Shared State for Demo
vendors = generate_initial_vendors()
orders = generate_initial_orders()

@app.get("/state", response_model=StateResponse)
async def get_state():
    return StateResponse(vendors=vendors, orders=orders)

@app.post("/simulate", response_model=SimulationResponse)
async def simulate():
    observer = ObserverAgent()
    simulator = SimulatorAgent()
    evaluator = EvaluatorAgent()
    decision = DecisionAgent()
    executor = ExecutorAgent()
    auditor = AuditorAgent()

    # Pipeline execution
    issue = observer.detect_issue(vendors, orders)
    options = simulator.generate_options()
    scored_options = evaluator.score_options(options)
    best_option, reasoning = decision.select_best(scored_options)
    exec_logs = executor.apply_action(best_option, vendors, orders)
    audit_logs = auditor.log_everything(issue, scored_options, best_option, exec_logs)

    # Simplified impact calculation for demo
    impact_saved = 45000.0  # ₹ saved
    counterfactual_loss = 12000.0  # ₹ lost if other options chosen

    return SimulationResponse(
        detected_issue=issue,
        options=scored_options,
        best_option=best_option.name,
        reasoning=reasoning,
        impact_saved=impact_saved,
        counterfactual_loss=counterfactual_loss,
        audit_log=audit_logs
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
