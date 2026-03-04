import { motion } from 'framer-motion'
import { Code, Database, GitBranch, Zap } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'

const TechStack = () => {
  const { ref, isVisible } = useScrollAnimation()

  const technologies = [
    {
      category: 'Frontend',
      icon: Code,
      techs: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend & APIs',
      icon: Zap,
      techs: ['Node.js', 'REST APIs', 'GraphQL', 'Python', 'Express'],
    },
    {
      category: 'Database',
      icon: Database,
      techs: ['MySQL', 'MongoDB', 'Firebase', 'PostgreSQL'],
    },
    {
      category: 'Tools & Version Control',
      icon: GitBranch,
      techs: ['Git', 'GitHub', 'Docker', 'Webpack', 'Vite'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="tech-stack" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Technologies and tools I use to build modern applications
          </p>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {technologies.map((category) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="group"
              >
                <motion.div
                  className="glass p-8 rounded-2xl h-full relative overflow-hidden cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {/* Hover Gradient Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-primary-800/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative z-10 mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-primary-600" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-6 relative z-10">
                    {category.category}
                  </h3>

                  {/* Tech List */}
                  <div className="relative z-10 space-y-2">
                    {category.techs.map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="flex items-center gap-2 text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.05 }}
                      >
                        <span className="w-2 h-2 bg-primary-600 rounded-full" />
                        {tech}
                      </motion.div>
                    ))}
                  </div>

                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-primary-600/10 rounded-2xl opacity-0 group-hover:opacity-100 filter blur-xl"
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Individual Tech Icons Grid */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h4 className="text-xl font-bold text-white mb-8 text-center">Technologies</h4>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['React', 'TypeScript', 'JavaScript', 'Tailwind', 'Node.js', 'Python', 'MySQL', 'Git'].map(
              (tech, index) => (
                <motion.div
                  key={tech}
                  className="glass-sm p-4 rounded-xl text-center group cursor-pointer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ delay: index * 0.05 }}
                >
                  <p className="text-sm font-semibold text-white group-hover:text-primary-600 transition-colors">
                    {tech}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/5 rounded-full filter blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  )
}

export default TechStack
