"use client";

import React, { useState, useEffect } from "react";
import { getState, simulate } from "../lib/api";
import { StateTable } from "../components/StateTable";
import { SimulationView } from "../components/SimulationView";
import { DecisionTimeline } from "../components/DecisionTimeline";
import { Play, RotateCcw, Box, Activity, ShieldCheck } from "lucide-react";

export default function Home() {
  const [state, setState] = useState<any>(null);
  const [simResult, setSimResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchState();
  }, []);

  const fetchState = async () => {
    try {
      const data = await getState();
      setState(data);
    } catch (err) {
      console.error("Failed to fetch state", err);
    }
  };

  const runSimulation = async () => {
    setLoading(true);
    setShowResults(false);
    setSimResult(null);
    try {
      const result = await simulate();
      // Store result but don't show yet - wait for timeline
      setSimResult(result);
    } catch (err) {
      console.error("Simulation failed", err);
      setLoading(false);
    }
  };

  const onTimelineComplete = () => {
    setLoading(false);
    setShowResults(true);
  };

  const reset = () => {
    setSimResult(null);
    setShowResults(false);
    setLoading(false);
    fetchState();
  };

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* Navbar */}
      <nav className="border-b border-gray-100 px-8 py-5 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-gray-900 p-2.5 rounded-xl shadow-lg">
             <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.15em] text-gray-900 uppercase">Reality Engine</h1>
            <div className="flex items-center gap-1.5 mt-0.5">
               <ShieldCheck className="w-3 h-3 text-green-500" />
               <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Autonomous Intelligence System</p>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-bold text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all uppercase tracking-widest"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset State
          </button>
          <button 
            onClick={runSimulation}
            disabled={loading}
            className={`flex items-center gap-3 px-6 py-2.5 text-[10px] font-black text-white bg-gray-900 rounded-lg hover:bg-black transition-all shadow-xl disabled:opacity-50 uppercase tracking-[0.1em] ${loading ? 'animate-pulse' : ''}`}
          >
            {loading ? (
              <>
                <Box className="w-4 h-4 animate-bounce" />
                Processing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Simulation
              </>
            )}
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: System State */}
          <div className="lg:col-span-4 space-y-12">
            <div className="bg-white p-2 rounded-2xl">
              <div className="flex items-center justify-between mb-8 px-2">
                 <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Environment State</h2>
                 <span className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-600 text-[9px] font-black rounded-full uppercase border border-green-100">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Synchronized
                 </span>
              </div>
              {state ? (
                <StateTable vendors={state.vendors} orders={state.orders} />
              ) : (
                <div className="p-12 border-2 border-dashed border-gray-100 rounded-3xl text-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">
                   Connecting to data stream...
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Simulation Result */}
          <div className="lg:col-span-8">
            <div className="min-h-[700px] lg:border-l lg:border-gray-100 lg:pl-16">
               {!loading && !showResults && (
                 <div className="h-full flex flex-col items-center justify-center text-center py-32 bg-gray-50/50 rounded-[2.5rem] border-2 border-dashed border-gray-100">
                    <div className="bg-white shadow-2xl p-6 rounded-3xl mb-10 transform -rotate-3">
                       <Play className="w-10 h-10 text-gray-900 ml-1" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-4 uppercase tracking-tight">System Ready</h3>
                    <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed font-medium">
                       Autonomous agents are standing by. Trigger a simulation to analyze supply chain constraints and derive optimal futures.
                    </p>
                 </div>
               )}

               {loading && !showResults && (
                 <div className="animate-in fade-in zoom-in-95 duration-500">
                    <DecisionTimeline onComplete={onTimelineComplete} />
                 </div>
               )}

               {showResults && simResult && (
                 <SimulationView data={simResult} />
               )}
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-10 px-10 mt-20 bg-gray-50/30">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.2em]">
            <div className="flex items-center gap-3">
               <span className="text-gray-900 bg-white px-2 py-1 rounded border border-gray-100 shadow-sm">v1.2.0</span>
               <span>Reality Engine Core</span>
            </div>
            <div className="flex gap-8">
               <span>Neural Decision Logic</span>
               <span>Deterministic Audit Trace</span>
               <span>SLA Compliance: 99.9%</span>
            </div>
         </div>
      </footer>
    </main>
  );
}
