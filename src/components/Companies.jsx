import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Search } from 'lucide-react';

const sampleData = [
  {
    id: 'pfz',
    name: 'Pfizer',
    logo: 'https://logo.clearbit.com/pfizer.com',
    medicines: [
      { id: 'pfz-001', name: 'Lipitor', type: 'Statin', dosage: '10mg, 20mg', description: 'Reduces LDL cholesterol to prevent cardiovascular disease.' },
      { id: 'pfz-002', name: 'Ibrance', type: 'Oncology', dosage: '125mg', description: 'CDK4/6 inhibitor for HR+, HER2- breast cancer.' },
    ],
  },
  {
    id: 'jnj',
    name: 'Johnson & Johnson',
    logo: 'https://logo.clearbit.com/jnj.com',
    medicines: [
      { id: 'jnj-001', name: 'Remicade', type: 'Immunology', dosage: '100mg', description: 'TNF-alpha blocker for autoimmune conditions.' },
      { id: 'jnj-002', name: 'Xarelto', type: 'Anticoagulant', dosage: '10mg, 20mg', description: 'Direct Factor Xa inhibitor to reduce risk of stroke and blood clots.' },
    ],
  },
  {
    id: 'gsk',
    name: 'GSK',
    logo: 'https://logo.clearbit.com/gsk.com',
    medicines: [
      { id: 'gsk-001', name: 'Augmentin', type: 'Antibiotic', dosage: '625mg', description: 'Amoxicillin and clavulanate potassium for bacterial infections.' },
      { id: 'gsk-002', name: 'Ventolin', type: 'Respiratory', dosage: '100mcg', description: 'Albuterol inhaler for bronchospasm relief.' },
    ],
  },
];

export default function Companies() {
  const [query, setQuery] = useState('');
  const [activeCompany, setActiveCompany] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sampleData.filter((c) => c.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50" id="companies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Explore pharmaceutical companies</h2>
            <p className="mt-2 text-slate-600">Tap a company to view their medicines. Click a medicine to see details.</p>
          </div>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search companies..."
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <motion.button
              key={c.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveCompany(c)}
              className={`text-left p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all ${
                activeCompany?.id === c.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <img src={c.logo} alt={`${c.name} logo`} className="w-12 h-12 rounded-lg object-contain bg-slate-50" />
                <div>
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-sm"><Building2 size={16} /> Pharma company</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {activeCompany && (
            <motion.div
              key="meds"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <img src={activeCompany.logo} alt="logo" className="w-10 h-10 rounded-lg bg-slate-50" />
                  <h3 className="text-xl font-semibold">{activeCompany.name} medicines</h3>
                </div>
                <button onClick={() => setActiveCompany(null)} className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700">Close</button>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeCompany.medicines.map((m) => (
                  <motion.button
                    key={m.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedMedicine({ ...m, company: activeCompany.name })}
                    className="text-left p-4 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:shadow-md"
                  >
                    <p className="font-medium text-slate-900">{m.name}</p>
                    <p className="text-sm text-slate-600">{m.type}</p>
                    <p className="mt-1 text-xs text-slate-500">Dosage: {m.dosage}</p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedMedicine && (
            <motion.div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedicine(null)}
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg p-6 rounded-2xl bg-white border border-slate-200 shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">{selectedMedicine.name}</h4>
                    <p className="text-slate-600">{selectedMedicine.type}</p>
                  </div>
                  <img src={`https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(selectedMedicine.name)}`} alt="pill" className="w-14 h-14" />
                </div>
                <div className="mt-4 text-slate-700">
                  <p className="text-sm">{selectedMedicine.description}</p>
                  <p className="mt-2 text-sm">Dosage: <span className="font-medium">{selectedMedicine.dosage}</span></p>
                  <p className="mt-2 text-sm">Manufacturer: <span className="font-medium">{selectedMedicine.company}</span></p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={() => setSelectedMedicine(null)} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Close</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
