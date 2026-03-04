import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import useTilt from '../hooks/useTilt'

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation()

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      description: 'A full-featured e-commerce dashboard with real-time analytics, inventory management, and order tracking. Built with React, Redux, and Chart.js.',
      tech: ['React', 'Redux', 'Tailwind CSS', 'Chart.js', 'REST API'],
      link: '#',
      github: '#',
      color: 'from-primary-600 to-blue-600',
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, team sharing, and deadline notifications. Features drag-and-drop functionality.',
      tech: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS', 'WebSocket'],
      link: '#',
      github: '#',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      title: 'AI-Powered Chat Interface',
      description: 'Modern chat application with AI integration, conversation history, and real-time messaging. Supports multiple conversation threads and exports.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'API Integration'],
      link: '#',
      github: '#',
      color: 'from-cyan-600 to-teal-600',
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website showcasing projects and skills. Features 3D elements, smooth animations, and optimized performance.',
      tech: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Vite'],
      link: '#',
      github: '#',
      color: 'from-teal-600 to-primary-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore some of my recent work and projects
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variants={itemVariants} />
          ))}
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute -top-40 -left-40 w-80 h-80 bg-primary-600/5 rounded-full filter blur-3xl pointer-events-none"
        animate={{
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  )
}

const ProjectCard = ({ project, variants }) => {
  const { handlers, rotation } = useTilt()

  return (
    <motion.div
      variants={variants}
      className="group h-full"
    >
      <motion.div
        className="glass p-6 rounded-2xl h-full relative overflow-hidden cursor-pointer"
        whileHover={{
          scale: 1.02,
          y: -10,
        }}
        {...handlers}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10`}
          transition={{ duration: 0.3 }}
        />

        {/* Card Content */}
        <div className="relative z-10">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 mb-6 leading-relaxed text-sm">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-xs bg-primary-600/20 text-primary-300 px-3 py-1 rounded-full border border-primary-600/30 hover:bg-primary-600/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 glass px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white hover:bg-primary-600/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>

            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 glass px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white hover:bg-primary-600/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              GitHub
            </motion.a>
          </div>
        </div>

        {/* Glow Effect */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 filter blur-xl`}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Projects
