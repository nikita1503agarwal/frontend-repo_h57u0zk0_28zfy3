import { useMemo, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Companies from './components/Companies';
import Admin from './components/Admin';
import Footer from './components/Footer';

function Section({ show, children }) {
  if (!show) return null;
  return children;
}

function App() {
  const [route, setRoute] = useState('home');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const onNavigate = (key) => setRoute(key);

  const showAdmin = useMemo(() => route === 'admin', [route]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header current={route} onNavigate={onNavigate} isSuperAdmin={isSuperAdmin} />

      <main className="pt-16">
        <Section show={route === 'home'}>
          <Hero onGetStarted={() => setRoute('companies')} />

          <section id="features" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
                title: 'Regulatory-grade security', desc: 'Encryption at rest, audit trails, and role-based access out of the box.'
              },{
                title: 'Portfolio intelligence', desc: 'Track SKUs, dosage forms, therapy areas, and revenue in one place.'
              },{
                title: 'Delightful workflows', desc: 'Fast, animated UI that your team will actually enjoy using.'
              }].map((f, i) => (
                <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm">
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="mt-2 text-slate-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </Section>

        <Section show={route === 'companies'}>
          <Companies />
        </Section>

        <Section show={route === 'about'}>
          <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">Built for modern pharma teams</h2>
              <p className="mt-3 text-slate-600">We combine scientific precision with product craftsmanship to create a platform that scales with your pipeline.</p>
            </div>
          </section>
        </Section>

        <Section show={route === 'contact'}>
          <section className="py-24">
            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold">Contact us</h2>
              <form className="mt-6 grid grid-cols-1 gap-4">
                <input className="px-4 py-3 rounded-xl border border-slate-200" placeholder="Your name" />
                <input className="px-4 py-3 rounded-xl border border-slate-200" placeholder="Email" />
                <textarea rows="4" className="px-4 py-3 rounded-xl border border-slate-200" placeholder="Message" />
                <button className="px-6 py-3 rounded-xl bg-blue-600 text-white">Send</button>
              </form>
            </div>
          </section>
        </Section>

        <Section show={showAdmin}>
          <Admin isSuperAdmin={isSuperAdmin} onLoginToggle={(v) => setIsSuperAdmin(v)} />
        </Section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
