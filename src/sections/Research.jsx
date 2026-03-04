import { motion } from 'framer-motion'
import { GraduationCap, Zap, Database, BarChart3 } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const Research = () => {
  const { ref, isVisible } = useScrollAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const features = [
    {
      icon: Database,
      title: 'Data-Driven',
      description: 'Leverages machine learning and AI to predict paddy prices with high accuracy',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Processes market data and weather information in real-time',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Provides detailed analytics and trend predictions for farmers',
    },
  ]

  return (
    <section id="research" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-8 h-8 text-primary-600" />
            <span className="text-primary-600 font-semibold">Research & Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Paddy Price <span className="gradient-text">Prediction System</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Final Year Project: AI/ML-driven agricultural solution
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Description */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Project Overview</h3>
              <p className="text-gray-300 leading-relaxed">
                A comprehensive machine learning system designed to predict paddy (rice) prices
                using historical market data, weather patterns, and agricultural trends. This
                project combines AI/ML backend with a modern React frontend to help farmers
                make informed decisions.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-xl font-semibold text-white">Tech Stack</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Python (Backend)',
                  'Machine Learning',
                  'React (Frontend)',
                  'Django/Flask API',
                  'PostgreSQL',
                  'TensorFlow/Scikit-learn',
                ].map((tech) => (
                  <motion.div
                    key={tech}
                    className="glass-sm px-4 py-2 rounded-lg text-sm text-primary-400"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.a
                href="#contact"
                className="inline-block bg-primary-600 px-8 py-4 rounded-lg font-semibold text-white hover:bg-primary-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  className="glass p-6 rounded-xl group cursor-pointer hover:bg-primary-600/20 transition-colors"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-primary-600/20 flex items-center justify-center"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-6 h-6 text-primary-600" />
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Impact Section */}
        <motion.div
          className="glass p-8 md:p-12 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Impact & Significance
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <p className="text-gray-300">Prediction Accuracy</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">1000s</div>
              <p className="text-gray-300">Farmers Benefited</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
              <p className="text-gray-300">Real-time Updates</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600/5 rounded-full filter blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  )
}

export default Research
