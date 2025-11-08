import { motion } from 'framer-motion';
import { Hospital, Pill, ShieldCheck } from 'lucide-react';

export default function Header({ current, onNavigate, isSuperAdmin }) {
  const links = [
    { key: 'home', label: 'Home' },
    { key: 'companies', label: 'Companies' },
    { key: 'about', label: 'About' },
    { key: 'contact', label: 'Contact' },
  ];
  if (isSuperAdmin) links.push({ key: 'admin', label: 'Admin' });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
              <Hospital size={20} />
            </div>
            <div>
              <p className="font-semibold leading-tight">MedicDNA</p>
              <p className="text-xs text-slate-500 -mt-1">Modern Pharma SaaS</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2">
            {links.map((l) => (
              <motion.button
                key={l.key}
                onClick={() => onNavigate(l.key)}
                whileHover={{ y: -2 }}
                className={`px-4 py-2 rounded-full transition-colors ${
                  current === l.key
                    ? 'bg-blue-600 text-white shadow shadow-blue-600/20'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {l.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 text-slate-600 text-sm">
              <ShieldCheck size={16} />
              <span>HIPAA-ready</span>
            </div>
            <button
              onClick={() => onNavigate('admin')}
              className="inline-flex md:hidden items-center gap-2 px-3 py-2 rounded-full bg-blue-600 text-white"
            >
              <Pill size={16} />
              Menu
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
