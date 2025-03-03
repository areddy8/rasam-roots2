import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import rasaSVG from "/images/rasa.svg";

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  
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
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center">
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
            className="w-32 md:w-40 opacity-95"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1 }}
          />
        </motion.div>
        
        {/* Center: Navigation Links */}
        <div className="flex items-center justify-center gap-8">
          <Link to="/" className="text-amber-200 hover:text-white text-sm uppercase tracking-wider transition-colors">
            Home
          </Link>
          <Link to="/flavor-lab" className="text-amber-400 text-sm uppercase tracking-wider">
            Flavor Lab
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
        <div className="text-right space-y-4">
          <div className="text-sm uppercase tracking-[0.2em] text-amber-200/70">Sanskrit Origin</div>
          <div className="flex items-center justify-end gap-3 text-base md:text-lg">
            <span className="text-amber-100 uppercase tracking-[0.15em]">RASA is</span>
            <span className="text-amber-500 uppercase tracking-[0.15em]">Essence</span>
          </div>
        </div>
      </div>
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

const FlavorCard = ({ flavor, index }) => {
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
      className="relative aspect-square"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div 
        className={`w-full h-full bg-${warmColor}-500/10 rounded-2xl border border-${warmColor}-500/20 flex flex-col items-center justify-center p-6 backdrop-blur-sm overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
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
          <h3 className={`text-${warmColor}-400 text-xl md:text-2xl font-light tracking-wider mb-2`}>
            {flavor.name}
          </h3>
          <p className="text-amber-200/70 text-sm text-center">
            {flavor.description}
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-4 opacity-0 absolute bottom-6"
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <button className={`px-4 py-2 rounded-full text-${warmColor}-400 border border-${warmColor}-500/30 text-xs uppercase tracking-wider`}>
            Learn More
          </button>
        </motion.div>
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

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <GridBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-light text-center mb-6 tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            FLAVOR <span className="text-amber-500">LAB</span>
          </motion.h1>
          <motion.p 
            className="text-amber-200/70 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore our carefully selected traditional ingredients, each with unique wellness properties that have been used for centuries in traditional medicine
          </motion.p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl"></div>
      </section>
      
      {/* Flavor Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {flavors.map((flavor, index) => (
              <div key={flavor.name} onClick={() => setSelectedFlavor(flavor)}>
                <FlavorCard flavor={flavor} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Selected Flavor Detail */}
      {selectedFlavor && (
        <section className="py-16 relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12"
            >
              <button 
                className="text-amber-200/70 hover:text-amber-200 flex items-center gap-2"
                onClick={() => setSelectedFlavor(null)}
              >
                <span>←</span>
                <span>Back to all flavors</span>
              </button>
            </motion.div>
            
            <FlavorDetail flavor={selectedFlavor} />
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="py-8 text-center text-sm text-amber-500/50 border-t border-amber-500/10 mt-16">
        <p>© 2024 Rasam Roots</p>
      </footer>
    </div>
  );
};

export default FlavorLab; 