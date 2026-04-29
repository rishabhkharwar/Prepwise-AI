import React from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { BrainCircuit, FileText, Target, Zap, ChevronRight, Sparkles } from 'lucide-react'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/landing.scss'

const Landing = () => {
    const { user } = useAuth()

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }
    
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    }

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                    className="hero-content"
                >
                    <motion.div variants={fadeIn} className="badge">
                        <Sparkles size={14} style={{ display: 'inline', marginRight: '6px' }} />
                        AI-Powered Interview Prep
                    </motion.div>
                    
                    <motion.h1 variants={fadeIn}>
                        Master your next interview with <span className="gradient-text">Prepwise AI</span>
                    </motion.h1>
                    
                    <motion.p variants={fadeIn}>
                        Upload your resume and the job description. Our advanced AI will analyze the match, identify skill gaps, and generate a personalized preparation roadmap with mock questions.
                    </motion.p>
                    
                    <motion.div variants={fadeIn} className="cta-group">
                        {user ? (
                            <Link to="/dashboard" className="btn btn--primary">
                                Go to Dashboard <ChevronRight size={18} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                            </Link>
                        ) : (
                            <Link to="/login" className="btn btn--primary">
                                Get Started Free <ChevronRight size={18} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
                            </Link>
                        )}
                        <a href="#how-it-works" className="btn btn--secondary">
                            How it works
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <motion.h2 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className="section-title"
                >
                    Everything you need to succeed
                </motion.h2>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="features-grid"
                >
                    <motion.div variants={fadeIn} className="feature-card">
                        <div className="icon-container">
                            <Target size={24} />
                        </div>
                        <h3>Precise Match Scoring</h3>
                        <p>Get a detailed analysis of how well your resume matches the job description, including specific skill gaps you need to address.</p>
                    </motion.div>

                    <motion.div variants={fadeIn} className="feature-card">
                        <div className="icon-container">
                            <FileText size={24} />
                        </div>
                        <h3>Custom Preparation Plan</h3>
                        <p>Receive a day-by-day roadmap tailored exactly to the skills you need to brush up on before the big day.</p>
                    </motion.div>

                    <motion.div variants={fadeIn} className="feature-card">
                        <div className="icon-container">
                            <BrainCircuit size={24} />
                        </div>
                        <h3>AI Mock Questions</h3>
                        <p>Practice with highly relevant technical and behavioral questions generated specifically for the company and role.</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* How it Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="container">
                    <motion.h2 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="section-title"
                    >
                        How it works
                    </motion.h2>

                    <div className="steps-container">
                        {[
                            { step: "01", title: "Upload your details", desc: "Simply paste the job description you're applying for and upload your latest resume.", icon: <FileText size={48} color="#d20d3b" opacity={0.5} /> },
                            { step: "02", title: "AI Analysis", desc: "Our AI engine analyzes the requirements against your experience to find the perfect match points.", icon: <Zap size={48} color="#d20d3b" opacity={0.5} /> },
                            { step: "03", title: "Get your strategy", desc: "Instantly receive your match score, preparation roadmap, and custom interview questions.", icon: <Target size={48} color="#d20d3b" opacity={0.5} /> }
                        ].map((item, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="step-row"
                            >
                                <div className="step-content">
                                    <div className="step-number">{item.step}</div>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                                <div className="step-visual">
                                    {item.icon}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing
