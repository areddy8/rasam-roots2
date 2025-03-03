import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import rasaSVG from "/images/rasa.svg";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Essence", "Nectar", "Taste"];
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    
    return () => clearInterval(wordInterval);
  }, []);
  
  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-black/80 backdrop-blur-md' : 'py-5'}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
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
          <Link to="/" className="text-amber-200 hover:text-white text-sm uppercase tracking-wider transition-colors cursor-pointer">
            Home
          </Link>
          <Link to="/flavor-lab" className="text-amber-400 text-sm uppercase tracking-wider cursor-pointer">
            Spice Lab
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm uppercase tracking-wider hover:bg-amber-500/20 transition-colors cursor-pointer"
          >
            Join Waitlist
          </motion.button>
        </div>
        
        {/* Right: Sanskrit Origin */}
        <div className="text-right space-y-4">
          <div className="text-sm uppercase tracking-[0.2em] text-amber-200/70">Sanskrit Origin</div>
          <motion.div 
            className="flex items-center justify-end gap-3 text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-100 uppercase tracking-[0.15em]">RASA is</span>
            <AnimatePresence mode="wait">
              <motion.span 
                key={words[currentWord]}
                className="text-amber-500 uppercase tracking-[0.15em] min-w-[5ch] inline-block text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden px-4">
        {/* Logo and Menu Button */}
        <div className="flex justify-between items-center">
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
            <Link 
              to="/" 
              className="text-amber-200 hover:text-white text-sm uppercase tracking-wider py-2 border-b border-amber-500/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
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

const FlavorCard = ({ flavor, index, isSelected, onClick }) => {
  const [hovered, setHovered] = useState(false);
  
  // Map colors to warm tones
  const colorMap = {
    amber: "amber",
    yellow: "yellow",
    green: "lime",
    gray: "stone",
    orange: "orange",
    red: "rose"
  };
  
  const warmColor = colorMap[flavor.color] || flavor.color;
  
  return (
    <motion.div
      className={`w-full h-full bg-${warmColor}-500/10 rounded-2xl border border-${warmColor}-500/20 flex flex-col items-center justify-center p-4 sm:p-6 backdrop-blur-sm overflow-hidden ${isSelected ? 'ring-2 ring-amber-500' : ''} [cursor:url('/images/pepper-orange-filled.svg')_16_16,pointer]`}
      whileHover={{ scale: isSelected ? 1 : 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Animated Particle Background */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full bg-${warmColor}-500/30`}
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
      
      <motion.div
        className="relative z-10 flex flex-col items-center"
        animate={hovered ? { y: -10 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className={`text-${warmColor}-400 text-lg sm:text-xl md:text-2xl font-light tracking-wider mb-2`}>
          {flavor.name}
        </h3>
        <p className="text-amber-200/70 text-xs sm:text-sm text-center">
          {flavor.description}
        </p>
      </motion.div>
      
      <motion.div 
        className="mt-4 opacity-0 absolute bottom-4 sm:bottom-6"
        animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        <button className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-${warmColor}-400 border border-${warmColor}-500/30 text-xs uppercase tracking-wider`}>
          Learn More
        </button>
      </motion.div>
    </motion.div>
  );
};

const FlavorDetail = ({ flavor }) => {
  // Map colors to warm tones
  const colorMap = {
    amber: "amber",
    yellow: "yellow",
    green: "lime",
    gray: "stone",
    orange: "orange",
    red: "rose"
  };
  
  const warmColor = colorMap[flavor.color] || flavor.color;
  
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={`aspect-square rounded-2xl bg-${warmColor}-500/10 border border-${warmColor}-500/20 flex items-center justify-center p-8 relative overflow-hidden`}>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-${warmColor}-500/40`}
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
        
        <motion.div
          className={`text-${warmColor}-400 text-8xl font-light opacity-30`}
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          {flavor.symbol}
        </motion.div>
      </div>
      
      <div className="space-y-6">
        <h3 className={`text-${warmColor}-400 text-3xl font-light tracking-wider`}>
          {flavor.name}
        </h3>
        
        <p className="text-amber-100/90 leading-relaxed">
          {flavor.fullDescription}
        </p>
        
        <div className="space-y-4 pt-4">
          <h4 className="text-amber-200 text-lg font-light tracking-wider">Benefits</h4>
          <ul className="space-y-2">
            {flavor.benefits.map((benefit, i) => (
              <motion.li 
                key={i} 
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <span className={`text-${warmColor}-400 text-lg`}>•</span>
                <span className="text-amber-200/70">{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const FlavorLab = () => {
  const flavors = [
    { 
      name: "Turmeric", 
      color: "amber", 
      description: "Anti-inflammatory powerhouse",
      symbol: "⟳",
      fullDescription: "Turmeric contains curcumin, a compound with powerful anti-inflammatory effects. Used for centuries in Ayurvedic medicine, this golden spice helps reduce inflammation, boost antioxidant capacity, and improve brain function.",
      benefits: [
        "Reduces inflammation and joint pain",
        "Powerful antioxidant properties",
        "Improves brain function and memory",
        "Supports heart health"
      ]
    },
    { 
      name: "Ginger", 
      color: "yellow", 
      description: "Digestive & immune support",
      symbol: "⌘",
      fullDescription: "Ginger has been used for thousands of years for its medicinal properties. It contains gingerol, a bioactive compound that fights inflammation and oxidative stress while supporting digestive health and immune function.",
      benefits: [
        "Soothes digestive discomfort",
        "Reduces nausea and motion sickness",
        "Fights infections and boosts immunity",
        "Reduces muscle pain and soreness"
      ]
    },
    { 
      name: "Cardamom", 
      color: "green", 
      description: "Aromatic digestive aid",
      symbol: "◈",
      fullDescription: "Cardamom is one of the world's most expensive spices, prized for its complex flavor and medicinal properties. Rich in antioxidants and diuretic properties, it helps improve breathing, lower blood pressure, and aid digestion.",
      benefits: [
        "Improves digestive health",
        "Freshens breath naturally",
        "Helps regulate blood pressure",
        "Contains antimicrobial properties"
      ]
    },
    { 
      name: "Black Pepper", 
      color: "gray", 
      description: "Enhances nutrient absorption",
      symbol: "◉",
      fullDescription: "Black pepper contains piperine, which significantly enhances the bioavailability of other nutrients. This makes it not just a flavor enhancer but a critical component for maximizing the benefits of other herbs and spices.",
      benefits: [
        "Enhances absorption of nutrients",
        "Improves digestive function",
        "Contains anti-inflammatory properties",
        "Supports metabolic health"
      ]
    },
    { 
      name: "Cinnamon", 
      color: "orange", 
      description: "Balances blood sugar",
      symbol: "⌬",
      fullDescription: "Cinnamon is loaded with antioxidants and has potent anti-inflammatory properties. It can lower blood sugar levels and improve sensitivity to insulin, making it beneficial for metabolic health and diabetes management.",
      benefits: [
        "Helps regulate blood sugar levels",
        "Rich in antioxidants",
        "Has anti-inflammatory properties",
        "May protect against heart disease"
      ]
    },
    { 
      name: "Clove", 
      color: "red", 
      description: "Powerful antioxidant",
      symbol: "⎔",
      fullDescription: "Cloves have one of the highest antioxidant contents of any spice. They contain eugenol, a compound with powerful anti-inflammatory and pain-relieving properties, traditionally used for dental pain and digestive issues.",
      benefits: [
        "Extremely high in antioxidants",
        "Natural pain reliever",
        "Supports liver health",
        "Has antimicrobial properties"
      ]
    }
  ];

  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlavorSelect = (flavor) => {
    setIsAnimating(true);
    setSelectedFlavor(flavor);
    // Reset animation state after animation completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden [cursor:url('/images/pepper-orange.svg')_16_16,auto]">
      <GridBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-36 md:pt-48 pb-8 md:pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.h1 
            className="text-3xl md:text-6xl font-light text-center mb-4 md:mb-6 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            SPICE <span className="text-amber-500">LAB</span>
          </motion.h1>
          <motion.p 
            className="text-amber-200/70 max-w-2xl mx-auto text-center text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our carefully selected traditional ingredients, each with unique wellness properties that have been used for centuries in traditional medicine
          </motion.p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-48 md:w-64 h-48 md:h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-48 md:w-64 h-48 md:h-64 bg-amber-700/5 rounded-full blur-3xl"></div>
      </section>
      
      {/* Flavor Grid with Animation */}
      <section className="py-8 md:py-12 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Selected Flavor at Top */}
            {selectedFlavor && (
              <motion.div
                layout
                className="col-span-full md:col-span-2 aspect-square md:aspect-[2/1]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <FlavorCard 
                  flavor={selectedFlavor}
                  index={0}
                  isSelected={true}
                />
              </motion.div>
            )}

            {/* Description Below Selected */}
            {selectedFlavor && (
              <motion.div
                className="col-span-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <FlavorDetail flavor={selectedFlavor} />
                <motion.button
                  className="mt-8 text-amber-200/70 hover:text-amber-200 flex items-center gap-2"
                  onClick={() => setSelectedFlavor(null)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>←</span>
                  <span>Back to all spices</span>
                </motion.button>
              </motion.div>
            )}

            {/* Other Flavors Grid */}
            <AnimatePresence>
              {flavors.map((flavor, index) => (
                selectedFlavor?.name !== flavor.name && (
                  <motion.div
                    key={flavor.name}
                    layout
                    className="aspect-square cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: selectedFlavor ? 0.7 : 1,
                      y: 0,
                      scale: 1
                    }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => handleFlavorSelect(flavor)}
                  >
                    <FlavorCard 
                      flavor={flavor} 
                      index={index}
                      isSelected={false}
                    />
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm text-amber-500/50 border-t border-amber-500/10 mt-8 md:mt-16">
        <p>© 2024 Rasam Roots</p>
      </footer>
    </div>
  );
};

export default FlavorLab; 