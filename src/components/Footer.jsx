import { HeartPulse, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-semibold">
            <HeartPulse /> MedicDNA
          </div>
          <p className="mt-3 text-slate-400 text-sm">A modern platform to manage pharma companies and product lines with delightful UX.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Mail size={16} /> support@medicdna.io</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> San Francisco, CA</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} MedicDNA. All rights reserved.</div>
    </footer>
  );
}
