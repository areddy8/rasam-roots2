import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import rasaSVG from "/images/rasa.svg";
import textSVG from "/images/text.svg";
import StorySection from '../components/StorySection';

const text = "Rasam is a 500-year old savory wellness tonic brewed with ancient spices and herbs.";

const TypingText = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeouts = [];
    const totalCharacters = text.length;
    
    text.split('').forEach((char, index) => {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + char);
        if (index === totalCharacters - 1) {
          setIsComplete(true);
        }
      }, 200 + (index * 150)); // Start after 200ms, faster typing speed
      
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  return (
    <motion.p 
      className="text-amber-200/90 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => isComplete}
    >
      {displayedText}
      <span className="text-amber-400 animate-pulse">|</span>
    </motion.p>
  );
};

const AnimatedLogo = ({ onComplete }) => {
  useEffect(() => {
    // Shorter wait time since we're adjusting the sequence
    const timer = setTimeout(() => {
      onComplete();
    }, 1200); // Reduced to 1.2s to start typing sooner
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Text Logo Only */}
      <motion.img
        src={textSVG}
        alt="Rasam Roots"
        className="w-full sepia-[0.1] brightness-110 contrast-[0.9] opacity-90"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.8 }}
      />
    </div>
  );
};

const SanskritSection = () => {
  const keywords = ["Essence", "Nectar", "Taste"];
  const [keywordIndex, setKeywordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKeywordIndex((prevIndex) => (prevIndex + 1) % keywords.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="text-right space-y-4"
    >
      <div className="text-sm uppercase tracking-[0.2em] text-amber-200/70">Sanskrit Origin</div>
      <div className="flex items-center justify-end gap-3 text-base md:text-lg">
        <span className="text-amber-100 uppercase tracking-[0.15em]">RASA is</span>
        <motion.div
          key={keywords[keywordIndex]}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.4 }}
          className="text-amber-500 uppercase tracking-[0.15em]"
        >
          {keywords[keywordIndex]}
        </motion.div>
      </div>
    </motion.div>
  );
};

const GridBackground = () => (
  <div className="fixed inset-0 z-0 opacity-20">
    <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="border-r border-amber-500/10 h-full"></div>
      ))}
    </div>
    <div className="absolute inset-0 grid grid-rows-6 md:grid-rows-12">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="border-b border-amber-500/10 w-full"></div>
      ))}
    </div>
  </div>
);

const Feature = ({ title, description, index }) => (
  <motion.div
    className="relative p-8 rounded-2xl border border-amber-500/10 backdrop-blur-sm"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.2 }}
  >
    {/* Decorative corner elements */}
    <motion.div 
      className="absolute top-0 left-0 w-12 h-12 border-t border-l border-amber-500/20"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
    />
    <motion.div 
      className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-amber-500/20"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
    />
    
    {/* Content */}
    <div className="space-y-4 relative">
      <motion.h3 
        className="text-xl font-light text-amber-200"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-amber-100/70 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
      >
        {description}
      </motion.p>
      
      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-amber-500/5 rounded-xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  </motion.div>
);

const SlideToUnlock = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const controls = useAnimation();

  const handleDrag = (event, info) => {
    // Adjust threshold for mobile
    const threshold = window.innerWidth < 640 ? 180 : 260;
    
    if (info.point.x > threshold) {
      controls.start({ width: "100%" });
      setTimeout(() => {
        setUnlocked(true);
      }, 500);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would typically handle the email submission to your backend
    console.log("Email submitted:", email);
  };

  return (
    <div className="max-w-md mx-auto w-full px-4 md:px-0">
      {!unlocked ? (
        // Slider
        <div className="relative h-14 bg-black border border-amber-500/30 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-amber-500/10 rounded-full"
            animate={controls}
            initial={{ width: "4rem" }}
          />
          <motion.div
            className="absolute left-0 h-full aspect-square cursor-grab active:cursor-grabbing bg-amber-500/20 rounded-full flex items-center justify-center border border-amber-500/30"
            drag="x"
            dragConstraints={{ left: 0, right: window.innerWidth < 640 ? 180 : 260 }}
            onDrag={handleDrag}
            dragElastic={0}
            dragMomentum={false}
          >
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-amber-400 text-xl"
            >
              →
            </motion.div>
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-amber-400 text-xs sm:text-sm uppercase tracking-widest">
              Slide to Unlock Your Spice
            </span>
          </div>
        </div>
      ) : (
        // Email Form
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for early access"
                className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-black border border-amber-500/30 rounded-full text-white placeholder-amber-700/50 focus:outline-none focus:border-amber-500/50 text-sm sm:text-base"
                required
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-6 py-1.5 sm:py-2 bg-amber-500/20 text-amber-400 rounded-full text-xs sm:text-sm uppercase tracking-wider hover:bg-amber-500/30 transition-colors"
              >
                Join
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-2"
            >
              <div className="text-amber-400 text-xl">✓</div>
              <p className="text-amber-200 text-sm">
                Thanks! We'll keep you updated on the first-ever Rasam Roots drop.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const FallingElements = () => {
  const elements = [
    // Minimalist herb/spice designs
    {
      path: "M5 0L10 10L0 10z", // Triangle leaf
      className: "fill-amber-500/10"
    },
    {
      path: "M0 0Q5 0 5 5Q5 10 10 10Q5 10 5 5Q5 0 0 0", // Curved spice
      className: "fill-amber-400/5"
    },
    {
      path: "M0 5A5 5 0 0 1 10 5A5 5 0 0 1 0 5", // Circular seed
      className: "fill-amber-600/10"
    },
    {
      path: "M0 0L10 0L10 10L0 10z", // Square spice
      className: "fill-amber-300/5"
    },
    {
      path: "M5 0L10 5L5 10L0 5z", // Diamond herb
      className: "stroke-amber-500/10 stroke-1 fill-transparent"
    },
    {
      path: "M0 0L10 0L5 10z", // Triangle spice
      className: "stroke-amber-400/10 stroke-1 fill-transparent"
    },
    // Add pepper SVG with higher weight to appear more frequently
    {
      type: "pepper",
      className: "text-red-500/40",
      weight: 3 // This will make peppers appear more often
    },
    // Add herb SVG
    {
      type: "herb",
      className: "text-emerald-500/40",
      weight: 3 // Same weight as pepper
    }
  ];

  // Generate 20 random elements with weighted selection
  const fallingElements = Array.from({ length: 20 }, (_, i) => {
    // Create weighted array for selection
    const weightedElements = elements.flatMap(el => 
      Array(el.weight || 1).fill(el)
    );
    const element = weightedElements[Math.floor(Math.random() * weightedElements.length)];
    
    // Adjust size range for SVG elements
    const size = element.type ? 
      Math.random() * 40 + 25 // 25-65px for SVG elements
      : Math.random() * 30 + 15; // 15-45px for other elements
    
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * 5; // 0-5s
    const duration = Math.random() * 10 + 15; // 15-25s
    const rotation = Math.random() * 360; // 0-360deg
    const rotationDuration = Math.random() * 20 + 10; // 10-30s
    // Higher opacity for SVG elements
    const opacity = element.type ?
      Math.random() * 0.3 + 0.2 // 0.2-0.5 for SVG elements
      : Math.random() * 0.05 + 0.05; // 0.05-0.1 for other elements

    return {
      ...element,
      size,
      left,
      delay,
      duration,
      rotation,
      rotationDuration,
      opacity
    };
  });

  return (
    <div className="fixed inset-0 z-10 pointer-events-none overflow-hidden">
      {fallingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          initial={{
            x: `${el.left}vw`,
            y: -100,
            rotate: el.rotation,
            opacity: 0
          }}
          animate={{
            y: "100vh",
            rotate: el.rotation + 360,
            opacity: [0, el.opacity, el.opacity, 0]
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ width: el.size, height: el.size }}
        >
          {el.type === "pepper" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-full h-full ${el.className}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M13 11c0 2.21 -2.239 4 -5 4s-5 -1.79 -5 -4a8 8 0 1 0 16 0a3 3 0 0 0 -6 0" />
              <path d="M16 8c0 -2 2 -4 4 -4" />
            </svg>
          ) : el.type === "herb" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-full h-full ${el.className}`}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 10a6 6 0 0 0 -6 -6h-3v2a6 6 0 0 0 6 6h3" />
              <path d="M12 14a6 6 0 0 1 6 -6h3v1a6 6 0 0 1 -6 6h-3" />
              <path d="M12 20l0 -10" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 10 10"
              className={`w-full h-full ${el.className}`}
            >
              <path d={el.path} />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  );
};

const FlavorLabSection = () => {
  const flavors = [
    { name: "Turmeric", color: "amber", description: "Anti-inflammatory powerhouse" },
    { name: "Ginger", color: "yellow", description: "Digestive & immune support" },
    { name: "Cardamom", color: "green", description: "Aromatic digestive aid" },
    { name: "Black Pepper", color: "gray", description: "Enhances nutrient absorption" },
    { name: "Cinnamon", color: "orange", description: "Balances blood sugar" },
    { name: "Clove", color: "red", description: "Powerful antioxidant" }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-light text-white mb-4 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FLAVOR <span className="text-amber-500">LAB</span>
          </motion.h2>
          <motion.p 
            className="text-amber-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our carefully selected traditional ingredients, each with unique wellness properties
          </motion.p>
        </div>

        {/* Flavor Hexagon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.name}
              className="relative aspect-square"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className={`w-full h-full bg-${flavor.color}-500/10 rounded-2xl border border-${flavor.color}-500/20 flex flex-col items-center justify-center p-6 backdrop-blur-sm`}
                  whileHover={{ scale: 1.05, borderColor: `rgba(var(--${flavor.color}-500), 0.4)` }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Animated Particle Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 rounded-full bg-${flavor.color}-500/30`}
                        initial={{ 
                          x: Math.random() * 100 + "%", 
                          y: Math.random() * 100 + "%", 
                          scale: Math.random() * 0.5 + 0.5 
                        }}
                        animate={{ 
                          x: [null, Math.random() * 100 + "%", Math.random() * 100 + "%"],
                          y: [null, Math.random() * 100 + "%", Math.random() * 100 + "%"],
                          opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{ 
                          duration: Math.random() * 10 + 10, 
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                      />
                    ))}
                  </div>
                  
                  <h3 className={`text-${flavor.color}-400 text-xl md:text-2xl font-light tracking-wider mb-2`}>
                    {flavor.name}
                  </h3>
                  <p className="text-amber-400 text-sm text-center">
                    {flavor.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lab Entry Button */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.button
            className="px-8 py-4 bg-black border border-amber-500/30 rounded-full text-amber-400 text-lg uppercase tracking-widest flex items-center gap-3 mx-auto hover:bg-amber-500/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Enter Spice Lab</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl"></div>
    </section>
  );
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/80 backdrop-blur-md' : 'py-5'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 hidden md:grid grid-cols-3 items-center">
        {/* Left: Rasa Sanskrit */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center"
        >
          <motion.img
            src={rasaSVG}
            alt="Rasa Sanskrit"
            className="w-40 md:w-48 sepia-[0.1] brightness-110 contrast-[0.9] opacity-90"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
        
        {/* Center: Navigation Links */}
        <div className="flex items-center justify-center gap-8">
          {!isHomePage && (
            <Link to="/" className="text-amber-200 hover:text-white text-sm uppercase tracking-wider transition-colors">
              Home
            </Link>
          )}
          <Link to="/flavor-lab" className="text-amber-200 hover:text-amber-400 text-sm uppercase tracking-wider transition-colors">
            Spice Lab
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm uppercase tracking-wider hover:bg-amber-500/20 transition-colors"
          >
            Join Waitlist
          </motion.button>
        </div>
        
        {/* Right: Sanskrit Origin */}
        <SanskritSection />
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.img
            src={rasaSVG}
            alt="Rasa Sanskrit"
            className="h-16 md:h-20 sepia-[0.1] brightness-110 contrast-[0.9] opacity-90"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-amber-400 p-2"
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 flex flex-col space-y-4">
            {!isHomePage && (
              <Link 
                to="/" 
                className="text-amber-200 hover:text-white text-sm uppercase tracking-wider py-2 border-b border-amber-500/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            )}
            <Link 
              to="/flavor-lab" 
              className="text-amber-200 hover:text-amber-400 text-sm uppercase tracking-wider py-2 border-b border-amber-500/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Spice Lab
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm uppercase tracking-wider hover:bg-amber-500/20 transition-colors self-start"
              onClick={() => setMobileMenuOpen(false)}
            >
              Join Waitlist
            </motion.button>
            
            {/* Mobile Sanskrit Origin */}
            <div className="pt-2 space-y-2">
              <div className="text-xs uppercase tracking-[0.2em] text-amber-200/70">Sanskrit Origin</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-amber-100 uppercase tracking-[0.15em]">RASA is</span>
                <span className="text-amber-500 uppercase tracking-[0.15em]">Essence</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const LandingPage = () => {
  const [showTyping, setShowTyping] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  // Sequential animation triggers
  useEffect(() => {
    if (showTyping) {
      // Calculate total typing duration based on text length (150ms per character + initial delay)
      const typingDuration = text.length * 150 + 700; // 150ms per character + 700ms buffer
      
      // Show tagline after typing is complete with a small delay
      const taglineTimer = setTimeout(() => setShowTagline(true), typingDuration + 500);
      
      return () => {
        clearTimeout(taglineTimer);
      };
    }
  }, [showTyping]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <GridBackground />
      <FallingElements />
      <Navigation />
      
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-6 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-8 text-center">
            <AnimatedLogo onComplete={() => setShowTyping(true)} />
            
            <div className="space-y-8 md:space-y-10">
              {showTyping && <TypingText />}
              
              {showTagline && (
                <motion.div 
                  className="text-xl md:text-2xl font-light tracking-wide text-amber-100 relative flex items-center justify-center h-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Initial merged state */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.5, delay: 0.5 }
                    }}
                  >
                    <motion.span
                      className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400"
                      initial={{ filter: "blur(0px)" }}
                      animate={{ 
                        filter: "blur(8px)",
                        transition: { duration: 0.5, delay: 0.5 }
                      }}
                    >
                      Ancient Modern
                    </motion.span>
                  </motion.div>

                  {/* Final split state */}
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.5, delay: 1 }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}
                      >
                        Ancient
                      </motion.span>
                      <motion.span
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="text-amber-400"
                      >
                        Roots,
                      </motion.span>
                      <motion.span
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                      >
                        Modern
                      </motion.span>
                      <motion.span
                        initial={{ x: 10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.6 }}
                        className="text-amber-400"
                      >
                        Wellness
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 relative">
        {/* Background decorative elements */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-700/10 rounded-full blur-3xl" />
        </motion.div>
        
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 md:px-6">
          <Feature
            index={0}
            title="Ancient Wellness Tradition"
            description="Drawing from 500 years of traditional medicine, our tonic harnesses the power of time-tested herbs and spices."
          />
          <Feature
            index={1}
            title="Modern Scientific Backing"
            description="We've combined ancient wisdom with modern research to create a formula that's both traditional and scientifically sound."
          />
          <Feature
            index={2}
            title="Ethically Sourced Ingredients"
            description="Every ingredient is carefully selected and ethically sourced to ensure the highest quality and sustainability."
          />
          <Feature
            index={3}
            title="Balanced for Modern Life"
            description="Formulated to provide balance and support for the demands and stresses of contemporary living."
          />
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div 
            className="max-w-xl mx-auto space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3 md:space-y-4 text-center">
              <motion.h2 
                className="text-2xl md:text-4xl font-light text-amber-500 tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                BE THE FIRST TO KNOW WHEN WE LAUNCH
              </motion.h2>
            </div>
            <div className="mt-8">
              <SlideToUnlock />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flavor Lab Teaser */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            className="text-2xl md:text-4xl font-light text-white mb-4 md:mb-6 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            DISCOVER OUR <span className="text-amber-500">SPICE LAB</span>
          </motion.h2>
          <motion.p 
            className="text-amber-200/70 max-w-2xl mx-auto mb-8 md:mb-10 text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our carefully selected traditional ingredients, each with unique wellness properties
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/flavor-lab">
              <motion.button
                className="px-6 md:px-8 py-3 md:py-4 bg-black border border-amber-500/30 rounded-full text-amber-400 text-base md:text-lg uppercase tracking-widest flex items-center gap-3 mx-auto hover:bg-amber-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Enter Spice Lab</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-48 md:w-64 h-48 md:h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-48 md:w-64 h-48 md:h-64 bg-amber-700/5 rounded-full blur-3xl"></div>
      </section>

      {/* Story Section */}
      <StorySection />
    </div>
  );
};

export default LandingPage;
