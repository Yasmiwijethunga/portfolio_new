import { motion } from 'framer-motion'
import useScrollAnimation from '../hooks/useScrollAnimation'

const About = () => {
  const { ref, isVisible } = useScrollAnimation()

  const skills = [
    { name: 'React & Frontend', level: 90 },
    { name: 'TypeScript & JavaScript', level: 85 },
    { name: 'Tailwind CSS', level: 88 },
    { name: 'REST & GraphQL APIs', level: 80 },
    { name: 'State Management', level: 82 },
    { name: 'Git & Version Control', level: 85 },
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="about" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Get to know my professional background and expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed"
            >
              I'm a passionate Associate Software Engineer with 1+ year of hands-on experience
              in Software development. I specialize in building scalable, performant web applications
              using modern technologies and best practices.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed"
            >
              My expertise spans React, TypeScript, and a comprehensive understanding of REST and
              GraphQL APIs. I'm proficient in state management solutions like Redux and Zustand,
              and I thrive in collaborative Agile environments.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-lg leading-relaxed"
            >
              Beyond coding, I'm committed to continuous learning, code quality, and creating
              exceptional user experiences. I'm always eager to take on new challenges and grow
              both professionally and technically.
            </motion.p>

            {/* Key Points */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              <div className="glass-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">1+</div>
                <div className="text-gray-300 text-sm">Years Experience</div>
              </div>
              <div className="glass-sm p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">10+</div>
                <div className="text-gray-300 text-sm">Projects Completed</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Skills */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? 'visible' : 'hidden'}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white font-semibold">{skill.name}</label>
                  <span className="text-primary-600 text-sm font-bold">{skill.level}%</span>
                </div>

                {/* Skill Bar */}
                <div className="glass-sm h-3 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-600 to-primary-400"
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${skill.level}%` } : {}}
                    transition={{
                      duration: 1.2,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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

export default About
