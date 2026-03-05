import { motion } from "framer-motion";
import { Briefcase, Calendar, Award } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Experience = () => {
  const { ref, isVisible } = useScrollAnimation();

  const experiences = [
    // {
    //   title: "Associate Software Engineer",
    //   company: "Tech Company Name",
    //   duration: "Jan 2024 - Present",
    //   description: [
    //     "Developed and maintained scalable frontend applications using React and TypeScript",
    //     "Built reusable UI components following best practices and design patterns",
    //     "Integrated REST and GraphQL APIs with efficient state management using Redux and Zustand",
    //     "Improved application performance through code optimization and lazy loading techniques",
    //     "Collaborated with cross-functional teams in Agile sprint cycles",
    //     "Participated in code reviews and mentored junior developers",
    //   ],
    //   icon: Briefcase,
    // },
    {
      title: "Software Engineer Intern",
      company: "ZData Innovations (Pvt) Ltd",
      duration: "Jul 2025 - Feb 2026",
      description: [
        "Developed and enhanced FinTech web applications using React, JavaScript and TypeScript",
        "Built reusable UI components to improve maintainability and scalability",
        "Integrated REST APIs and GraphQL APIs for real-time data handling",
        "Implemented efficient state management using Redux and Zustand to maintain scalable and predictable application behavior.",

        "Optimized UI performance and improved user experience across multiple product modules",
        "Collaborated with backend developers and QA teams to deliver high-quality releases",
        "Followed Agile development practices and participated in sprint planning and reviews",
      ],
      icon: Award,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            My professional journey and career highlights
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {experiences.map((exp, index) => {
            const IconComponent = exp.icon;
            return (
              <motion.div
                key={exp.title}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline connector */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-8 top-20 w-1 h-20 bg-gradient-to-b from-primary-600 to-primary-800" />
                )}

                <div className="flex gap-6">
                  {/* Icon */}
                  <motion.div
                    className="relative z-10 flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-primary-600/20 border-2 border-primary-600 flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className="flex-1 glass p-6 rounded-xl"
                    whileHover={{
                      scale: 1.02,
                      y: -5,
                    }}
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-300">
                        <span className="font-semibold text-primary-400">
                          {exp.company}
                        </span>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-4 h-4" />
                          {exp.duration}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2">
                      {exp.description.map((point, idx) => (
                        <motion.li
                          key={idx}
                          className="flex gap-3 text-gray-300"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <span className="text-primary-600 font-bold mt-1">
                            •
                          </span>
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary-600/5 rounded-full filter blur-3xl pointer-events-none"
        animate={{
          y: [0, -30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
};

export default Experience;
