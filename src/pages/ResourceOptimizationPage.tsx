import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine
} from 'recharts';
import { 
  Fish, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Info,
  History,
  Zap
} from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, where, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuth } from '../hooks/useAuth';
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils';
import { Button, Card, Badge } from '../components/UI';

interface AnalysisResult {
  safeLimit: number;
  status: 'Safe' | 'Overfishing';
  recommendation: string;
  usagePercent: number;
  limitPercent: number;
}

interface ResourceLog {
  id: string;
  population: number;
  catch: number;
  safeLimit: number;
  status: string;
  recommendation: string;
  createdAt: Date;
}

export default function ResourceOptimizationPage() {
  const { user } = useAuth();
  const [population, setPopulation] = useState<number>(1000);
  const [fishingCatch, setFishingCatch] = useState<number>(200);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<ResourceLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'resourceAnalyses'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => {
        const data = doc.data();
        let createdAt = new Date();
        if (data.createdAt) {
          if (typeof data.createdAt.toDate === 'function') {
            createdAt = data.createdAt.toDate();
          } else if (data.createdAt instanceof Date) {
            createdAt = data.createdAt;
          } else if (typeof data.createdAt === 'string' || typeof data.createdAt === 'number') {
            createdAt = new Date(data.createdAt);
          }
        }
        
        return {
          id: doc.id,
          ...data,
          createdAt
        } as ResourceLog;
      });
      setHistory(logs);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'resourceAnalyses');
    });

    return () => unsubscribe();
  }, [user]);

  const analyzeResources = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Backend API Call
      const response = await fetch('/api/resources/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ population, catch: fishingCatch }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setResult(data);

      // Persist to Firestore
      await addDoc(collection(db, 'resourceAnalyses'), {
        userId: user.uid,
        population,
        catch: fishingCatch,
        safeLimit: data.safeLimit,
        status: data.status,
        recommendation: data.recommendation,
        createdAt: Timestamp.now()
      });

    } catch (error) {
      console.error('Error analyzing resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? [
    { name: 'Current Catch', value: fishingCatch, fill: result.status === 'Overfishing' ? '#FF4D4D' : '#D1FF4D' },
    { name: 'Safe Limit', value: result.safeLimit, fill: '#333' }
  ] : [];

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#D1FF4D] p-2 rounded-lg">
              <Zap className="text-black" size={24} />
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Resource Optimization</h1>
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest max-w-2xl">
            AI-driven decision system to maintain sustainable fishing levels and prevent ecosystem collapse.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card className="lg:col-span-1 p-8 border-[#1A1A1A] bg-[#050505]">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8 flex items-center gap-2">
              <Fish size={20} className="text-[#D1FF4D]" />
              Input Parameters
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Estimated Fish Population (kg)
                </label>
                <input 
                  type="number"
                  value={population}
                  onChange={(e) => setPopulation(Number(e.target.value))}
                  className="w-full bg-black border border-[#1A1A1A] rounded-lg p-4 text-white font-mono focus:border-[#D1FF4D] outline-none transition-colors"
                  placeholder="e.g. 10000"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                  Planned Catch (kg)
                </label>
                <input 
                  type="number"
                  value={fishingCatch}
                  onChange={(e) => setFishingCatch(Number(e.target.value))}
                  className="w-full bg-black border border-[#1A1A1A] rounded-lg p-4 text-white font-mono focus:border-[#D1FF4D] outline-none transition-colors"
                  placeholder="e.g. 2000"
                />
              </div>

              <Button 
                onClick={analyzeResources}
                disabled={loading}
                className="w-full py-4 group"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? 'Analyzing...' : 'Analyze Resources'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            <div className="mt-8 p-4 bg-[#0A0A0A] rounded-lg border border-[#1A1A1A]">
              <div className="flex gap-3">
                <Info size={16} className="text-[#D1FF4D] shrink-0" />
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
                  The safe biological limit is calculated as 30% of the estimated total population to ensure reproductive sustainability.
                </p>
              </div>
            </div>
          </Card>

          {/* Analysis Results */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Status Card */}
                    <Card className={`p-8 border-2 ${result.status === 'Overfishing' ? 'border-red-500/50 bg-red-500/5' : 'border-[#D1FF4D]/50 bg-[#D1FF4D]/5'}`}>
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Current Status</p>
                          <h3 className={`text-3xl font-black uppercase tracking-tighter ${result.status === 'Overfishing' ? 'text-red-500' : 'text-[#D1FF4D]'}`}>
                            {result.status}
                          </h3>
                        </div>
                        {result.status === 'Overfishing' ? (
                          <AlertTriangle className="text-red-500" size={32} />
                        ) : (
                          <CheckCircle2 className="text-[#D1FF4D]" size={32} />
                        )}
                      </div>
                      
                      <div className="space-y-4">
                        <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">AI Recommendation</p>
                          <p className="text-sm font-medium leading-relaxed">{result.recommendation}</p>
                        </div>
                      </div>
                    </Card>

                    {/* Stats Card */}
                    <Card className="p-8 border-[#1A1A1A] bg-[#050505]">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6 text-center">Resource Utilization</p>
                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
                            <XAxis 
                              dataKey="name" 
                              stroke="#333" 
                              fontSize={10} 
                              fontWeight="bold"
                              axisLine={false}
                              tickLine={false}
                            />
                            <YAxis hide />
                            <Tooltip 
                              cursor={{ fill: 'transparent' }}
                              contentStyle={{ backgroundColor: '#000', border: '1px solid #1A1A1A', borderRadius: '8px' }}
                              itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                              ))}
                            </Bar>
                            <ReferenceLine y={result.safeLimit} stroke="#FF4D4D" strokeDasharray="3 3" label={{ position: 'right', value: 'LIMIT', fill: '#FF4D4D', fontSize: 10, fontWeight: 'bold' }} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </Card>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-[#050505] border border-[#1A1A1A] rounded-xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Safe Limit</p>
                      <p className="text-2xl font-black font-mono">{result.safeLimit.toLocaleString()} KG</p>
                    </div>
                    <div className="p-6 bg-[#050505] border border-[#1A1A1A] rounded-xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Current Catch</p>
                      <p className="text-2xl font-black font-mono">{fishingCatch.toLocaleString()} KG</p>
                    </div>
                    <div className="p-6 bg-[#050505] border border-[#1A1A1A] rounded-xl">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Population Usage</p>
                      <p className={`text-2xl font-black font-mono ${result.usagePercent > 30 ? 'text-red-500' : 'text-[#D1FF4D]'}`}>
                        {result.usagePercent.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-[#1A1A1A] rounded-3xl p-12">
                  <div className="text-center">
                    <TrendingUp className="text-gray-800 mx-auto mb-4" size={48} />
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Enter parameters to run AI analysis</p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            {/* History Section */}
            {history.length > 0 && (
              <div className="pt-8 border-t border-[#1A1A1A]">
                <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                  <History size={16} className="text-gray-500" />
                  Analysis History
                </h3>
                <div className="space-y-3">
                  {history.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-[#050505] border border-[#1A1A1A] rounded-lg hover:border-gray-700 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${log.status === 'Overfishing' ? 'bg-red-500' : 'bg-[#D1FF4D]'}`} />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-tight">{log.status}</p>
                          <p className="text-[9px] text-gray-500 font-mono">{log.createdAt.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black font-mono">{log.catch.toLocaleString()} / {log.population.toLocaleString()} KG</p>
                        <p className="text-[9px] uppercase tracking-widest text-gray-600">Catch vs Population</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
