/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Factory, 
  UserCircle, 
  Info, 
  Sigma, 
  Save, 
  BarChart3, 
  Calculator, 
  History, 
  Settings, 
  Plus 
} from 'lucide-react';

// --- Types ---

interface EngineeringParams {
  pressure: number;
  diameter: number;
}

// --- Components ---

const Header = () => (
  <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
    <div className="flex items-center gap-3">
      <Factory className="w-6 h-6 text-primary" />
      <span className="text-xl font-bold text-primary font-headline tracking-tight">Kingsley Deadweight</span>
    </div>
    <nav className="hidden md:flex gap-8 items-center">
      <a className="text-primary font-semibold font-headline tracking-tight" href="#">Estimator</a>
      <a className="text-on-surface-variant hover:text-primary transition-colors font-headline tracking-tight" href="#">History</a>
      <a className="text-on-surface-variant hover:text-primary transition-colors font-headline tracking-tight" href="#">Settings</a>
    </nav>
    <div className="flex items-center gap-4">
      <button className="p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
        <UserCircle className="w-6 h-6" />
      </button>
    </div>
  </header>
);

const Hero = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-12"
  >
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface mb-4 font-headline">
      Deadweight Calculator
    </h1>
    <p className="text-on-surface-variant max-w-2xl leading-relaxed text-lg">
      Precision instrument for calculating required calibration weights based on localized atmospheric pressure and orifice diameter parameters.
    </p>
  </motion.div>
);

const ParameterInput = ({ 
  label, 
  value, 
  onChange, 
  unit, 
  tooltip,
  placeholder = "0.00"
}: { 
  label: string; 
  value: number | string; 
  onChange: (val: string) => void; 
  unit: string; 
  tooltip: string;
  placeholder?: string;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
    <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
      {label}
      <div className="group relative">
        <Info className="w-4 h-4 cursor-help opacity-60 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-on-surface text-surface text-[10px] rounded shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 normal-case font-normal">
          {tooltip}
        </div>
      </div>
    </label>
    <div className="md:col-span-2 relative">
      <input 
        className="w-full bg-surface-container-highest border-none rounded-md px-4 py-4 text-lg font-semibold text-on-surface focus:ring-2 focus:ring-primary-container transition-all placeholder:text-outline/50"
        placeholder={placeholder}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-outline uppercase">
        {unit}
      </span>
    </div>
  </div>
);

const ConversionLogic = () => (
  <section className="bg-surface-container rounded-xl p-8 relative overflow-hidden">
    <div className="relative z-10">
      <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant mb-6 flex items-center gap-2">
        <Sigma className="w-4 h-4" />
        Conversion Logic
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-outline">Pressure</span>
          <span className="text-sm font-medium">mmwc → kg/m·sec²</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-outline">Diameter</span>
          <span className="text-sm font-medium">mm → Area (m²)</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-bold text-outline">Formula</span>
          <span className="text-sm font-mono bg-surface-container-high px-2 py-1 rounded text-primary font-bold">
            W = (P * A) / G
          </span>
        </div>
      </div>
    </div>
  </section>
);

const ResultPlate = ({ 
  weight, 
  area, 
  pascals 
}: { 
  weight: number; 
  area: number; 
  pascals: number;
}) => (
  <div className="sticky top-24 bg-surface-container-lowest rounded-xl p-8 border-l-[6px] border-primary shadow-[0_10px_40px_rgba(40,52,57,0.06)] h-fit">
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary block mb-2">
          Estimated Weight Required
        </span>
        <div className="flex items-baseline gap-4">
          <motion.span 
            key={weight}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl font-headline font-extrabold text-on-surface tracking-tighter"
          >
            {weight.toFixed(2)}
          </motion.span>
          <span className="text-2xl font-bold text-on-surface-variant">kg</span>
        </div>
      </div>
      
      <div className="bg-surface-container-low rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-on-surface-variant font-medium">Effective Area</span>
          <span className="text-on-surface font-mono font-bold">{area.toExponential(3)} m²</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-on-surface-variant font-medium">Pascals Equivalent</span>
          <span className="text-on-surface font-mono font-bold">{pascals.toFixed(2)} Pa</span>
        </div>
        <div className="pt-4 mt-4 border-t border-outline-variant/15 flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-on-surface-variant">Confidence Rating</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-primary" />
            ))}
            <div className="w-2 h-2 rounded-full bg-outline-variant/30" />
          </div>
        </div>
      </div>
      
      <button className="w-full bg-gradient-to-r from-primary to-primary-dim text-surface-container-lowest py-4 rounded-md font-bold flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg active:scale-[0.98]">
        <Save className="w-5 h-5" />
        RECORD ESTIMATE
      </button>
      
      <p className="text-[11px] text-on-surface-variant/70 italic text-center px-4">
        Results are calculated based on ISO 5167 standards. Please verify with physical calibration blocks before high-pressure testing.
      </p>
    </div>
  </div>
);

const DataVisualization = () => (
  <div className="mt-8 rounded-xl overflow-hidden aspect-[4/3] relative group">
    <img 
      className="w-full h-full object-cover grayscale contrast-125 opacity-40 mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQMgjORa-T2TaEpEYRf6Cf0TPaO7BQWz1nH5YuLzG5_OAK3CqZB914k1wVtNkgpIlhKI6UyiJiTh9X5NnZiZ6c_tZi6vJuuP_HAr9_mYgZ6t9bbS2r2KnxjGVfCuvq_p_-uomnpB4YCmH6hp48i3kfn1K1dbqktYDBi51f5Z7dzW6anau1ghHsP7O47jZU0kudMiDQrLlHxBGfXGXd-rgqtrYmozI25RaGYk1xHIxVcDcr8gyR1_RUHXJ69YjOX0dL3SZNoD2KFJ8" 
      alt="Technical engineering diagram"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center border border-primary/20 rounded-xl">
      <div className="text-center p-6 bg-surface-container-lowest/90 backdrop-blur-md rounded-lg shadow-xl max-w-[80%]">
        <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
        <h4 className="text-sm font-bold uppercase tracking-widest text-on-surface">Data Visualization</h4>
        <p className="text-xs text-on-surface-variant mt-2">Active simulation of pressure-to-weight correlation based on input variance.</p>
      </div>
    </div>
  </div>
);

const BottomNav = () => (
  <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container-lowest border-t border-outline-variant/10 shadow-[0_-4px_20px_rgba(40,52,57,0.04)] z-50">
    <a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl px-5 py-2 transition-all" href="#">
      <Calculator className="w-6 h-6" />
      <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Estimator</span>
    </a>
    <a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2" href="#">
      <History className="w-6 h-6" />
      <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">History</span>
    </a>
    <a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-2" href="#">
      <Settings className="w-6 h-6" />
      <span className="text-[10px] uppercase tracking-wider mt-1 font-bold">Settings</span>
    </a>
  </nav>
);

const FAB = () => (
  <button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 bg-primary text-surface-container-lowest w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40">
    <Plus className="w-8 h-8" />
  </button>
);

// --- Main App ---

export default function App() {
  const [params, setParams] = useState<EngineeringParams>({
    pressure: 0,
    diameter: 0,
  });

  const results = useMemo(() => {
    const { pressure, diameter } = params;
    const gravity = 9.81;
    
    // 1 mmwc = 9.80665 Pa (Standard)
    const pascals = pressure * 9.80665;
    
    // Area in m2: PI * (r_m)^2 where r_m = (diameter_mm / 2) / 1000
    const area = Math.PI * Math.pow(diameter / 2000, 2);
    
    // W = (P * A) / G
    const weight = gravity > 0 ? (pascals * area) / gravity : 0;
    
    return { pascals, area, weight };
  }, [params]);

  const updateParam = (key: keyof EngineeringParams, val: string) => {
    const num = parseFloat(val);
    setParams(prev => ({ ...prev, [key]: isNaN(num) ? 0 : num }));
  };

  return (
    <div className="min-h-screen pb-24 md:pb-12 md:pt-24">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Hero />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Inputs & Logic */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <section className="bg-surface-container-low rounded-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  Engineering Parameters
                </h2>
                <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                  METRIC UNITS
                </span>
              </div>
              
              <div className="grid grid-cols-1 gap-10">
                <ParameterInput 
                  label="Pressure"
                  value={params.pressure || ""}
                  onChange={(v) => updateParam('pressure', v)}
                  unit="mmwc"
                  tooltip="Water column pressure in millimeters"
                />
                <ParameterInput 
                  label="Diameter"
                  value={params.diameter || ""}
                  onChange={(v) => updateParam('diameter', v)}
                  unit="mm"
                  tooltip="Internal orifice diameter in millimeters"
                />
              </div>
            </section>
          </div>
          
          {/* Right Column: Results & Viz */}
          <div className="lg:col-span-5">
            <ResultPlate 
              weight={results.weight}
              area={results.area}
              pascals={results.pascals}
            />
            <DataVisualization />
          </div>
        </div>
      </main>
      
      <BottomNav />
      <FAB />
    </div>
  );
}
