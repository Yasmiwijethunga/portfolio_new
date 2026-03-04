import { motion } from 'framer-motion'
import { Download, ArrowRight } from 'lucide-react'
import Background3D from '../components/Background3D'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden flex items-center justify-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Background3D />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block text-primary-600 font-semibold px-4 py-2 glass-sm rounded-full">
            👋 Welcome to my portfolio
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hi, I'm <span className="gradient-text">YASMI SANJULEE</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="text-2xl md:text-3xl text-primary-400 font-light mb-6"
        >
          Associate Software Engineer
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Passionate about building scalable web applications with React and modern technologies.
          Specialized in frontend development, API integration, and creating exceptional user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          {/* Download CV Button */}
          <motion.a
            href="#contact"
            className="glass px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 group hover:bg-primary-600/30 w-full sm:w-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download CV
          </motion.a>

          {/* View Projects Button */}
          <motion.button
            onClick={() => scrollToSection('projects')}
            className="bg-primary-600 px-8 py-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 group hover:bg-primary-700 w-full sm:w-auto"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37, 99, 235, 0.4)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-gray-400 text-sm">
            Scroll to explore
            <div className="w-6 h-10 border-2 border-primary-600 rounded-full mx-auto mt-2 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-primary-600 rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary-600/10 rounded-full filter blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-primary-800/10 rounded-full filter blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </section>
  )
}

export default Hero
