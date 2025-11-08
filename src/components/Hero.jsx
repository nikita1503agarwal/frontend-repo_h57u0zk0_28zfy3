import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ onGetStarted }) {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/5EwoDiC2tChvmy4K/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900"
          >
            Precision medicine, delivered as a service
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 text-lg text-slate-700"
          >
            Build, manage, and scale your pharmaceutical portfolio with a modern platform for companies, products, and compliance.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <button onClick={onGetStarted} className="px-6 py-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-shadow">
              Explore Companies
            </button>
            <a href="#features" className="px-6 py-3 rounded-full bg-white text-slate-700 border border-slate-200 hover:bg-slate-50">Learn more</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
