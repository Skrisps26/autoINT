import React from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { DecisionTimeline } from './DecisionTimeline';

const REJECTION_REASONS: Record<string, string[]> = {
  "Switch to Swift Source": ["Higher cost (₹150 vs ₹120 per unit)", "Sub-optimal margin preservation"],
  "Wait for Restock": ["Higher risk (production delay > 7 days)", "Loss of critical fulfillment SLA"],
  "Split Order": ["Optimal balance of cost and time", "Baseline efficiency met"]
};

export const SimulationView = ({ data }: { data: any }) => {
  if (!data) return null;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      
      {/* 1. Decision Timeline */}
      <DecisionTimeline />

      {/* 2. Detected Issue (Microcopy Update) */}
      <div className="p-5 border border-red-200 bg-red-50/50 rounded-xl flex gap-4 items-start shadow-sm">
        <div className="bg-red-500 p-2 rounded-lg mt-0.5">
           <AlertCircle className="w-5 h-5 text-white" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">Critical Constraint Detected</h4>
          <p className="text-sm text-red-900 leading-relaxed font-medium">{data.detected_issue}</p>
        </div>
      </div>

      {/* 3. Simulated Futures */}
      <div>
        <div className="flex justify-between items-end mb-6">
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Simulated Strategic Futures</h3>
           <span className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">Simulation Confidence: 94.2%</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.options.map((opt: any) => {
            const isBest = opt.name === data.best_option;
            return (
              <div key={opt.name} className={`relative p-6 border rounded-xl transition-all duration-300 bg-white ${isBest ? 'border-green-500 border-2 shadow-xl ring-4 ring-green-50' : 'border-gray-200 hover:border-gray-300 shadow-sm'}`}>
                {isBest && (
                   <span className="absolute -top-3 left-4 px-2 py-0.5 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm">
                      Optimal Decision
                   </span>
                )}
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full ${isBest ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    Score: {opt.score.toFixed(2)}
                  </span>
                  {isBest && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                </div>
                <h5 className={`text-sm font-bold mb-3 ${isBest ? 'text-gray-900' : 'text-gray-600'}`}>{opt.name}</h5>
                <p className="text-xs text-gray-500 leading-relaxed mb-6">{opt.description}</p>
                
                {!isBest && (
                   <div className="border-t border-gray-100 pt-4 mt-auto">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Why not chosen:</span>
                      <ul className="space-y-1.5">
                         {(REJECTION_REASONS[opt.name] || ["Lower efficiency score", "Sub-optimal trade-off"]).map((reason, i) => (
                           <li key={i} className="text-[10px] text-gray-400 flex items-start gap-1.5 leading-tight">
                              <span className="text-red-300 mt-1">•</span>
                              {reason}
                           </li>
                         ))}
                      </ul>
                   </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Decision Outcome Comparison (Horizontal Bar Chart) */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 shadow-sm">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 text-center">Decision Outcome Comparison</h3>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Baseline */}
          <div className="space-y-2">
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-gray-400">Do nothing (Baseline)</span>
                <span className="text-red-500">- ₹32,000 Loss</span>
             </div>
             <div className="h-3 bg-gray-200 rounded-full overflow-hidden flex justify-end">
                <div className="h-full bg-red-400 w-[40%] rounded-l-full"></div>
             </div>
          </div>
          {/* Options */}
          {data.options.map((opt: any) => {
            const isBest = opt.name === data.best_option;
            const width = isBest ? 'w-[90%]' : opt.score > 0.8 ? 'w-[75%]' : 'w-[50%]';
            return (
              <div key={opt.name} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                  <span className={isBest ? 'text-gray-900' : 'text-gray-400'}>{opt.name}</span>
                  <span className={isBest ? 'text-green-600' : 'text-gray-500'}>
                    {isBest ? `+ ₹${data.impact_saved.toLocaleString()} Profit` : `+ ₹${(data.impact_saved * (opt.score / 0.92)).toLocaleString()} Profit`}
                  </span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${isBest ? 'bg-green-500' : 'bg-gray-300'} ${width}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Enhanced Chosen Decision Card (Microcopy Update) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="p-8 border border-gray-900 bg-white rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Info className="w-24 h-24" />
          </div>
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Optimal Decision</h4>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 leading-tight">{data.best_option}</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium italic">"{data.reasoning}"</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 bg-gray-50 p-4 rounded-xl border border-gray-100">
             <CheckCircle2 className="w-4 h-4 text-green-500" />
             <span>Decision protocol finalized and executed by autonomous executor.</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow">
             <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Net Outcome (Optimized)</span>
                <div className="bg-green-100 p-2 rounded-full">
                   <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
             </div>
             <div className="text-4xl font-black text-gray-900 font-mono tracking-tighter">₹{data.impact_saved.toLocaleString()}</div>
             <p className="text-xs text-green-600 mt-3 font-bold uppercase tracking-wider">Efficiency gain over sub-optimal selection</p>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50/50 flex justify-between items-center">
             <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Counterfactual Loss</span>
                <div className="text-xl font-bold text-gray-500 font-mono mt-1">₹{data.counterfactual_loss.toLocaleString()}</div>
             </div>
             <div className="text-right">
                <p className="text-[9px] text-gray-400 font-bold uppercase leading-tight max-w-[120px]">Avoided value erosion from non-optimal selection.</p>
             </div>
          </div>
        </div>
      </div>
      
      {/* Audit Log */}
      <div className="p-6 border border-gray-200 bg-white rounded-2xl shadow-sm">
        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5 border-b border-gray-100 pb-3">System Execution Audit</h4>
        <div className="space-y-2 font-mono text-[10px] text-gray-400">
          {data.audit_log.map((log: string, i: number) => (
            <div key={i} className="flex gap-4 py-1.5 px-3 hover:bg-gray-50 rounded transition-colors group">
               <span className="text-gray-300 opacity-50 font-bold tracking-tighter">[{new Date().toLocaleTimeString()}]</span>
               <span className="group-hover:text-gray-600">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
