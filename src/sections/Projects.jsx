import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import useScrollAnimation from '../hooks/useScrollAnimation'
import useTilt from '../hooks/useTilt'

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation()

  const projects = [
    {
      id: 1,
      title: 'Pet Adoption Platform',
      description: 'A full-stack pet adoption platform with user authentication, real-time messaging between adopters and shelters, pet listing pages, profiles, and favorites. Built with TypeScript, Next.js and a Node.js backend.',
      tech: ['TypeScript', 'Next.js', 'Node.js',  'Tailwind CSS','Firebase','AWS','Docker',],
      link: '#',
      github: 'https://github.com/Yasmiwijethunga/pet-adoption-platform',
      color: 'from-primary-600 to-blue-600',
    },
    {
      id: 2,
      title: 'Ceypetco Fuel:X',
      description: 'Data-driven fuel station management system for Ceypetco. Automates inventory tracking, predicts fuel stock levels, manages employee attendance & salary, income/expense entries, and generates daily, monthly, and yearly summary records.',
      tech: ['React', 'JavaScript','Node.js', 'CSS', 'Chart.js', 'Flutter','OCR','Firebase'],
      link: 'https://ceypetco-fuel-x-ov1j.vercel.app/',
      github: 'https://github.com/Yasmiwijethunga/Ceypetco-Fuel-X',
      color: 'from-blue-600 to-cyan-600',
    },
    {
      id: 3,
      title: 'Movie Explorer App',
      description: 'Responsive movie discovery app powered by the TMDb API. Features movie search, trending listings, genre/year/rating filters, YouTube trailer embedding, favorites (localStorage), protected routes, and a light/dark theme toggle.',
      tech: ['React', 'MUI', 'Axios', 'TMDb API', 'Context API'],
      link: 'https://movie-explorer-new.vercel.app',
      github: 'https://github.com/Yasmiwijethunga/Movie-explorer-new',
      color: 'from-cyan-600 to-teal-600',
    },
    // {
    //   id: 4,
    //   title: 'Two-Step Registration Form',
    //   description: 'A responsive two-step registration form with client-side validation, inline error messages, dark mode toggle, loading indicator, and a success state on submission. Built with React, MUI, and Context API for state management.',
    //   tech: ['React', 'MUI', 'Axios', 'Context API', 'CSS'],
    //   link: '#',
    //   github: 'https://github.com/Yasmiwijethunga/Two-Step-Registration-Form',
    //   color: 'from-teal-600 to-primary-600',
    // },
    {
      id: 4,
      title: 'TAVOLA – Table Reservation System',
      description: 'A full-stack online table reservation platform allowing users to browse restaurants and book tables instantly. Features user sign-up/login, admin panel for managing reservations, checkout flow, and a responsive multi-page UI.',
      tech: ['HTML', 'CSS', 'PHP', 'JavaScript', 'MySQL'],
      link: '#',
      github: 'https://github.com/Yasmiwijethunga/TAVOLA-Table_reservation',
      color: 'from-indigo-600 to-primary-600',
    },
    {
      id: 5,
      title: 'Wilpattu Wildlife Mobile App',
      description: 'An Android mobile application for Wilpattu National Park visitors. Features wildlife browsing (elephants, birds & more), bungalow booking, guide booking with calendar scheduling, interactive map, payment integration, and user login/signup.',
      tech: ['Java', 'Android', 'XML', 'SQLite', 'Google Maps API'],
      link: '#',
      github: 'https://github.com/Yasmiwijethunga/Wild_Life_Project',
      color: 'from-green-700 to-teal-600',
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
    <section id="projects" className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-16">
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
            A selection of real-world projects from my GitHub — web apps, mobile apps, and full-stack platforms
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
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
              href={project.link !== '#' ? project.link : undefined}
              target={project.link !== '#' ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`flex-1 glass px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                project.link !== '#'
                  ? 'text-white hover:bg-primary-600/30 cursor-pointer'
                  : 'text-gray-500 cursor-not-allowed opacity-50'
              }`}
              whileHover={project.link !== '#' ? { scale: 1.05 } : {}}
              whileTap={project.link !== '#' ? { scale: 0.95 } : {}}
            >
              <ExternalLink className="w-4 h-4" />
              {project.link !== '#' ? 'Live Demo' : 'Coming Soon'}
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
