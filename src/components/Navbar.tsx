import { Link } from 'react-router-dom';
import { Waves, Map as MapIcon, LayoutDashboard, Camera, LogOut, User, Shield, Anchor, Trophy, Building2, Heart, Trash2, Activity, Zap, Cloud } from 'lucide-react';
import { auth, logout, signInWithGoogle } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { Button } from './UI';

export const Navbar = () => {
  const { user, profile } = useAuth();

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-[#1A1A1A] p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#D1FF4D] p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(209,255,77,0.5)] transition-all">
            <Waves className="text-black" size={20} />
          </div>
          <span className="text-xl font-black uppercase tracking-tighter text-white">OceanMind+</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <LayoutDashboard size={14} className="group-hover:scale-110 transition-transform" />
            <span>Dashboard</span>
          </Link>
          <Link to="/map" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <MapIcon size={14} className="group-hover:scale-110 transition-transform" />
            <span>Risk Map</span>
          </Link>
          <Link to="/log" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#D1FF4D] hover:text-white transition-colors group">
            <Camera size={14} className="group-hover:scale-110 transition-transform" />
            <span>Report</span>
          </Link>
          <Link to="/fisher" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Anchor size={14} className="group-hover:scale-110 transition-transform" />
            <span>Fisher Hub</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Trophy size={14} className="group-hover:scale-110 transition-transform" />
            <span>Leaderboard</span>
          </Link>
          <Link to="/waste" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Trash2 size={14} className="group-hover:scale-110 transition-transform" />
            <span>Waste</span>
          </Link>
          <Link to="/pollution" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Activity size={14} className="group-hover:scale-110 transition-transform" />
            <span>Pollution</span>
          </Link>
          <Link to="/resources" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Zap size={14} className="group-hover:scale-110 transition-transform" />
            <span>Resources</span>
          </Link>
          <Link to="/weather" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Cloud size={14} className="group-hover:scale-110 transition-transform" />
            <span>Weather</span>
          </Link>
          <Link to="/corporate" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Building2 size={14} className="group-hover:scale-110 transition-transform" />
            <span>Corporate</span>
          </Link>
          <Link to="/marketplace" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#D1FF4D] transition-colors group">
            <Heart size={14} className="group-hover:scale-110 transition-transform" />
            <span>Marketplace</span>
          </Link>
          {profile?.role === 'admin' && (
            <Link to="/policy" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors group">
              <Shield size={14} className="group-hover:scale-110 transition-transform" />
              <span>Policy</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-bold uppercase text-white tracking-widest">{profile?.displayName}</p>
                <p className="text-[9px] text-[#D1FF4D] font-mono tracking-tighter">{profile?.points} PTS</p>
              </div>
              <button onClick={logout} className="p-2 text-gray-400 hover:text-white transition-colors">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Button variant="outline" onClick={signInWithGoogle} className="py-2 px-6 text-xs">
              Log In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
