import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  TrendingUp, 
  Map as MapIcon, 
  Zap, 
  CheckCircle2, 
  Download, 
  FileText, 
  BarChart3, 
  ArrowRight,
  Shield,
  Globe,
  Anchor,
  Leaf,
  Users,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, Button, Badge } from '../components/UI';
import { CorporateFacility } from '../types';

const FACILITIES: CorporateFacility[] = [
  { id: '1', name: 'Mumbai Port Terminal 3', location: { lat: 18.94, lng: 72.84 }, healthScore: 58, riskProfile: { pollution: 'Medium', biodiversity: 'High', compliance: 'Good' } },
  { id: '2', name: 'Chennai Logistics Hub', location: { lat: 13.08, lng: 80.27 }, healthScore: 48, riskProfile: { pollution: 'High', biodiversity: 'Medium', compliance: 'Fair' } },
  { id: '3', name: 'Goa Storage Facility', location: { lat: 15.49, lng: 73.82 }, healthScore: 72, riskProfile: { pollution: 'Low', biodiversity: 'Medium', compliance: 'Good' } },
];

const INDUSTRY_LEADERBOARD = [
  { rank: 1, name: 'Maersk India', score: 92, tier: 'Ocean Leader', action: '50 hectare mangrove, zero-waste ports' },
  { rank: 2, name: 'Adani Ports', score: 87, tier: 'Ocean Leader', action: '₹15Cr ocean fund, MPA partnership' },
  { rank: 3, name: 'DP World', score: 84, tier: 'Ocean Advocate', action: 'Fisher training, waste-to-energy' },
  { rank: 4, name: 'XYZ SHIPPING (YOU)', score: 81, tier: 'Ocean Advocate', action: 'Ghost gear, mangroves planned' },
  { rank: 5, name: 'Global Logistics', score: 76, tier: 'Ocean Advocate', action: 'Basic compliance' },
];

export default function CorporateDashboardPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section 1: Ocean Responsibility Score */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-[#0A0A0A] border-[#1A1A1A] p-12 flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  className="text-[#1A1A1A]"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={552.9}
                  initial={{ strokeDashoffset: 552.9 }}
                  animate={{ strokeDashoffset: 552.9 * (1 - 0.81) }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="text-[#D1FF4D] drop-shadow-[0_0_15px_#D1FF4D]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-white tracking-tighter">81</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">/ 100</span>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <div>
                <Badge variant="accent" className="mb-4">OCEAN ADVOCATE</Badge>
                <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Ocean Responsibility Score</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2">Top 15% of your industry</p>
              </div>
              <div className="flex items-center gap-4 text-[#D1FF4D]">
                <TrendingUp size={20} />
                <span className="text-sm font-black uppercase tracking-widest">+7 PTS VS LAST QUARTER</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-md">
                Your score reflects active engagement in ghost gear recovery and mangrove restoration. 
                You are currently eligible for <span className="text-white font-bold">Sustainability Bonds</span>.
              </p>
            </div>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A] p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8">Industry Benchmarks</h3>
            <div className="space-y-6">
              {[
                { label: 'Industry Average', value: '68', color: 'bg-gray-800' },
                { label: 'Industry Leader', value: '92', color: 'bg-[#D1FF4D]' },
                { label: 'Your Ranking', value: '#4 / 23', color: 'bg-blue-500' },
              ].map((bench, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-gray-500">{bench.label}</span>
                    <span className="text-white">{bench.value}</span>
                  </div>
                  <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                    <div className={`h-full ${bench.color}`} style={{ width: typeof bench.value === 'string' ? '100%' : `${bench.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-[#1A1A1A]">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
                <span className="text-[#D1FF4D]">Insight:</span> You are 11pts behind Maersk. Completing the mangrove project will jump you to #2.
              </p>
            </div>
          </Card>
        </div>

        {/* Section 2: Facility Impact Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-[#0A0A0A] border-[#1A1A1A] p-8 relative overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Facility Impact Map</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Monitoring 50km zone of influence</p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-[8px]">POLLUTION</Badge>
                <Badge variant="outline" className="text-[8px]">BIODIVERSITY</Badge>
              </div>
            </div>
            <div className="aspect-video bg-[#050505] rounded-2xl border border-[#1A1A1A] flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/0/0/0.png')] bg-cover grayscale" />
              <div className="relative z-10">
                <Anchor size={48} className="text-blue-500 mx-auto mb-4 opacity-20" />
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">3 Facilities Active</p>
              </div>
              {/* Mock Facility Marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500 rounded-full animate-pulse flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                </div>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            {FACILITIES.map((facility) => (
              <Card key={facility.id} className="bg-[#0A0A0A] border-[#1A1A1A] p-6 hover:border-blue-500/30 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                      <Anchor size={16} />
                    </div>
                    <h4 className="font-black uppercase tracking-tight text-white group-hover:text-blue-400 transition-colors">{facility.name}</h4>
                  </div>
                  <span className="text-sm font-black text-blue-500">{facility.healthScore}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(facility.riskProfile).map(([key, value]) => (
                    <div key={key} className="text-center p-2 bg-black rounded-lg border border-[#1A1A1A]">
                      <p className="text-[8px] font-bold text-gray-500 uppercase mb-1">{key}</p>
                      <p className={`text-[9px] font-black uppercase ${
                        value === 'High' ? 'text-red-500' : value === 'Good' ? 'text-[#D1FF4D]' : 'text-orange-400'
                      }`}>{value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 3: Impact Summary & Business Value */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-[#0A0A0A] border-[#1A1A1A] p-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8">Impact Summary</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Pollution Prevented', value: '340kg', sub: 'Plastic intercepted', icon: Shield, color: 'text-red-500' },
                { label: 'Habitat Restored', value: '15ha', sub: 'Mangrove replanted', icon: Leaf, color: 'text-[#D1FF4D]' },
                { label: 'Community Trained', value: '120', sub: 'Sustainable fishers', icon: Users, color: 'text-blue-500' },
                { label: 'Incident Reduction', value: '31%', sub: 'Near facilities', icon: TrendingUp, color: 'text-orange-500' },
              ].map((metric, i) => (
                <div key={i} className="p-6 bg-black rounded-3xl border border-[#1A1A1A] group hover:border-white/10 transition-all">
                  <metric.icon size={20} className={`${metric.color} mb-4`} />
                  <p className="text-2xl font-black text-white tracking-tighter">{metric.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{metric.label}</p>
                  <p className="text-[8px] font-mono text-gray-600 uppercase mt-1">{metric.sub}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-8 py-4 text-[10px] font-black uppercase tracking-widest">
              <Globe size={14} className="mr-2" /> View Blockchain-Backed Proof
            </Button>
          </Card>

          <Card className="bg-[#0A0A0A] border-[#1A1A1A] p-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8">Business Value Proof</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-black rounded-2xl border border-[#1A1A1A]">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">CSR Spend</p>
                  <p className="text-lg font-black text-white tracking-tighter">₹2.3Cr</p>
                </div>
                <div className="p-4 bg-black rounded-2xl border border-[#1A1A1A]">
                  <p className="text-[9px] font-bold text-gray-500 uppercase mb-1">Value Created</p>
                  <p className="text-lg font-black text-[#D1FF4D] tracking-tighter">₹14.8Cr</p>
                </div>
                <div className="p-4 bg-[#D1FF4D]/10 rounded-2xl border border-[#D1FF4D]/20">
                  <p className="text-[9px] font-bold text-[#D1FF4D] uppercase mb-1">ROI</p>
                  <p className="text-lg font-black text-[#D1FF4D] tracking-tighter">6.4×</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Sustainability Bonds', desc: 'Access to ₹500Cr green bond market', value: 'Unlocked' },
                  { label: 'Insurance Discounts', desc: 'Environmental risk mitigation', value: '12% Off' },
                  { label: 'Tax Incentives', desc: 'CSR deduction (Govt Scheme)', value: '150% Ded.' },
                ].map((benefit, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-white/5">
                    <div>
                      <p className="text-xs font-black text-white tracking-tight">{benefit.label}</p>
                      <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{benefit.desc}</p>
                    </div>
                    <Badge variant="accent" className="text-[9px]">{benefit.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Section 4: Recommended Interventions */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Recommended Interventions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Ghost Gear Recovery', cost: '₹12-18L', impact: '+8 PTS', desc: 'Recover 18 reported nets near Mumbai terminal.', icon: Anchor },
              { title: 'Mangrove Blue Carbon', cost: '₹25-40L', impact: '+12 PTS', desc: 'Sequester 500 tons CO2 in coastal area.', icon: Leaf },
              { title: 'Sustainable Fisher Partnership', cost: '₹8-12L', impact: '+6 PTS', desc: 'Improve 127 livelihoods near your facility.', icon: Users },
            ].map((opp, i) => (
              <Card key={i} className="bg-[#0A0A0A] border-[#1A1A1A] p-8 group hover:border-[#D1FF4D]/30 transition-all flex flex-col">
                <opp.icon size={32} className="text-[#D1FF4D] mb-6" />
                <h3 className="text-xl font-black text-white tracking-tight mb-2">{opp.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 flex-1">{opp.desc}</p>
                <div className="flex justify-between items-center pt-6 border-t border-[#1A1A1A]">
                  <div className="font-mono text-xs text-gray-400">{opp.cost}</div>
                  <div className="font-black text-[#D1FF4D] text-sm">{opp.impact}</div>
                </div>
                <Button className="w-full mt-6 py-3 text-[10px] font-black uppercase tracking-widest">Select Opportunity</Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Section 5: Industry Leaderboard */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Industry Leaderboard</h2>
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-3xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#1A1A1A] bg-black/40">
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Rank</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Company</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Score</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Tier</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Notable Actions</th>
                </tr>
              </thead>
              <tbody>
                {INDUSTRY_LEADERBOARD.map((company) => (
                  <tr key={company.rank} className={`border-b border-[#1A1A1A] hover:bg-white/5 transition-colors ${
                    company.name.includes('YOU') ? 'bg-[#D1FF4D]/5' : ''
                  }`}>
                    <td className="p-6 font-mono text-sm text-gray-500">{company.rank}</td>
                    <td className="p-6 font-black text-white tracking-tight">{company.name}</td>
                    <td className="p-6 font-black text-[#D1FF4D]">{company.score}</td>
                    <td className="p-6">
                      <Badge variant={company.tier === 'Ocean Leader' ? 'accent' : 'outline'} className="text-[8px]">
                        {company.tier}
                      </Badge>
                    </td>
                    <td className="p-6 text-xs text-gray-400">{company.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 6: ESG Reporting & Exports */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'GRI Standards', icon: FileText },
            { title: 'SASB Maritime', icon: BarChart3 },
            { title: 'CDP Disclosure', icon: Globe },
            { title: 'Annual Report', icon: Download },
          ].map((report, i) => (
            <button key={i} className="bg-[#0A0A0A] border border-[#1A1A1A] p-6 rounded-2xl flex items-center justify-between hover:border-[#D1FF4D]/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-black rounded-lg text-gray-500 group-hover:text-[#D1FF4D] transition-colors">
                  <report.icon size={20} />
                </div>
                <span className="font-black text-white text-xs tracking-tight uppercase">{report.title}</span>
              </div>
              <ChevronRight size={16} className="text-gray-700 group-hover:text-[#D1FF4D] transition-all" />
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
