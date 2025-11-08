import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, PencilLine, Lock, LogOut } from 'lucide-react';

export default function Admin({ isSuperAdmin, onLoginToggle }) {
  const [password, setPassword] = useState('');

  const [companies, setCompanies] = useState([
    { id: 'pfz', name: 'Pfizer' },
    { id: 'jnj', name: 'Johnson & Johnson' },
  ]);
  const [medicines, setMedicines] = useState([
    { id: 'pfz-001', companyId: 'pfz', name: 'Lipitor', type: 'Statin', dosage: '10mg' },
    { id: 'jnj-001', companyId: 'jnj', name: 'Remicade', type: 'Immunology', dosage: '100mg' },
  ]);

  const [form, setForm] = useState({ name: '', type: '', dosage: '', companyId: '' });
  const [companyName, setCompanyName] = useState('');

  const companyMap = useMemo(() => Object.fromEntries(companies.map(c => [c.id, c.name])), [companies]);

  if (!isSuperAdmin) {
    return (
      <section className="py-24">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-700"><Lock size={18} /> Superadmin Login</div>
          <p className="text-sm text-slate-500 mt-1">Use password: admin123</p>
          <div className="mt-4 flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="flex-1 px-3 py-2 rounded-lg border border-slate-200"
            />
            <button
              onClick={() => password === 'admin123' && onLoginToggle(true)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Login
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Admin Panel</h2>
          <button onClick={() => onLoginToggle(false)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"><LogOut size={16} /> Logout</button>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Companies</h3>
              <div className="flex gap-2">
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Company name"
                  className="px-3 py-2 rounded-lg border border-slate-200"
                />
                <button
                  onClick={() => {
                    if (!companyName.trim()) return;
                    const id = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0,4) + Math.floor(Math.random()*10);
                    setCompanies((prev) => [...prev, { id, name: companyName.trim() }]);
                    setCompanyName('');
                  }}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white"
                >
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
            <ul className="mt-4 divide-y">
              {companies.map((c) => (
                <li key={c.id} className="py-3 flex items-center justify-between">
                  <span>{c.name}</span>
                  <button onClick={() => setCompanies((prev) => prev.filter((x) => x.id !== c.id))} className="text-red-600 hover:text-red-700"><Trash2 size={18} /></button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <h3 className="font-semibold text-slate-900">Medicines</h3>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="px-3 py-2 rounded-lg border border-slate-200" />
              <input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="Type" className="px-3 py-2 rounded-lg border border-slate-200" />
              <input value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="Dosage" className="px-3 py-2 rounded-lg border border-slate-200" />
              <select value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200">
                <option value="">Select company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                if (!form.name || !form.companyId) return;
                const id = form.companyId + '-' + Math.floor(Math.random() * 1000);
                setMedicines((prev) => [...prev, { ...form, id }]);
                setForm({ name: '', type: '', dosage: '', companyId: '' });
              }}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 text-white"
            >
              <Plus size={16} /> Add medicine
            </button>

            <ul className="mt-4 divide-y">
              {medicines.map((m) => (
                <li key={m.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-sm text-slate-500">{companyMap[m.companyId]} · {m.type} · {m.dosage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-slate-600 hover:text-slate-800"><PencilLine size={18} /></button>
                    <button onClick={() => setMedicines((prev) => prev.filter((x) => x.id !== m.id))} className="text-red-600 hover:text-red-700"><Trash2 size={18} /></button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
