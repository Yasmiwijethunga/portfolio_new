import { motion } from "framer-motion";
import { GraduationCap, School, Calendar, MapPin } from "lucide-react";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Education = () => {
  const { ref, isVisible } = useScrollAnimation();

  const education = [
    {
      type: "university",
      degree: "Bachelor of Science (Hons) in Software Engineering",
      institution: "CINEC Campus",
      //   affiliation: 'Affiliated to University of Bedfordshire, UK',
      location: "Malabe, Sri Lanka",

      duration: "2022 – 2026",

      details: [
        "Specialization in Software Engineering",
        "Research publications at CINEC Symposiums (4th & 5th)",
        "Final Year Project: ML-based Paddy Price Prediction System",

        " Courseworks: Data Structures and Algorithms, Computer Architecture, Operating Systems, Database Systems, Object-Oriented Programming, Design Patterns, Software Quality Assurance, Cloud Computing, Mobile Computing, Web Development and Computer Networking.",
      ],
      gpa: "Second Class Upper Division",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "school",
      degree: "GCE Advanced Level – Physical Science Stream",
      institution: "St.Marys Convent, Matara",
      location: "Sri Lanka",
      duration: "2017 – 2020",
      details: ["Combined Mathematics, Physics, Chemistry"],
      gpa: "",
      icon: School,
      color: "from-violet-500 to-purple-500",
    },
    {
      type: "school",
      degree: "GCE Ordinary Level",
      institution: "Deniyaya Central College, Deniyaya",
      location: "Sri Lanka",
      duration: "2010 – 2016",
      details: ["7A passes"],
      gpa: "",
      icon: School,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="education"
      style={{ scrollMarginTop: "72px" }}
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My <span className="gradient-text">Education</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Academic background and qualifications
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary-600/60 via-primary-600/30 to-transparent hidden md:block" />

          <div className="space-y-10">
            {education.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative md:pl-24 pl-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 top-6 w-9 h-9 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg hidden md:flex`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>

                  {/* Card */}
                  <motion.div
                    className="glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-primary-600/30 transition-colors duration-300"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        {/* Mobile icon */}
                        <div
                          className={`inline-flex md:hidden w-9 h-9 rounded-full bg-gradient-to-br ${item.color} items-center justify-center mb-3 shadow-lg`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-white leading-tight">
                          {item.degree}
                        </h3>
                        <p
                          className={`text-lg font-semibold mt-1 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                        >
                          {item.institution}
                        </p>
                        {item.affiliation && (
                          <p className="text-sm text-gray-400 mt-0.5">
                            {item.affiliation}
                          </p>
                        )}
                      </div>

                      {/* Badge */}
                      {item.gpa && (
                        <span className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-600/20 text-primary-400 border border-primary-600/30">
                          {item.gpa}
                        </span>
                      )}
                    </div>

                    {/* Meta row */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-5">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary-500" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary-500" />
                        {item.location}
                      </span>
                    </div>

                    {/* Detail bullets */}
                    {item.details.length > 0 && (
                      <ul className="space-y-2">
                        {item.details.map((d, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-gray-300 text-sm"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
