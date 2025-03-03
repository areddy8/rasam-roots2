import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import illustrations from './StoryIllustrations';

const storyScenes = [
  {
    id: 1,
    title: "The Ancient Origin",
    description: "In the heart of ancient India, a sage discovers the healing powers of nature, combining herbs and spices to create a powerful tonic.",
    illustration: "ancient-origin",
    accent: "amber"
  },
  {
    id: 2,
    title: "The Recipe's Journey",
    description: "Passed down through generations, this age-old recipe evolves, each hand adding its own touch, yet preserving its essence.",
    illustration: "recipe-journey",
    accent: "orange"
  },
  {
    id: 3,
    title: "The Modern Twist",
    description: "In today's fast-paced world, two South Asian Americans connect their rich heritage with modern lives, seeking balance and wellness.",
    illustration: "modern-twist",
    accent: "rose"
  },
  {
    id: 4,
    title: "The Fusion of Worlds",
    description: "They experiment, merging ancient wisdom with contemporary needs, crafting a tonic that honors tradition while embracing modernity.",
    illustration: "fusion",
    accent: "yellow"
  },
  {
    id: 5,
    title: "The Creation of Rasam Roots",
    description: "From this fusion, Rasam Roots is born – a modern wellness brand that encapsulates the essence of ancient healing.",
    illustration: "creation",
    accent: "amber"
  },
  {
    id: 6,
    title: "The Benefits Unveiled",
    description: "Rasam Roots isn't just a drink; it's a gateway to enhanced immunity, digestion, and vitality, offering a unique blend of taste and health.",
    illustration: "benefits",
    accent: "orange"
  },
  {
    id: 7,
    title: "The Cultural Celebration",
    description: "It's a celebration of cultures, a testament to the harmony of ancient roots and modern wellness, bringing communities together.",
    illustration: "celebration",
    accent: "rose"
  },
  {
    id: 8,
    title: "The Invitation",
    description: "Ancient Roots, Modern Wellness. Join us in unlocking your flavor, embracing a legacy of health and harmony.",
    illustration: "invitation",
    accent: "yellow"
  }
];

const IllustrationScene = ({ scene, progress }) => {
  const Illustration = illustrations[scene.illustration];
  
  return (
    <motion.div
      className={`w-full aspect-[4/3] md:aspect-[3/2] relative overflow-hidden rounded-2xl bg-${scene.accent}-500/5 border border-${scene.accent}-500/20`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Illustration />
      </div>
      
      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-${scene.accent}-500/20`}
          initial={{ 
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: 0
          }}
          animate={{ 
            x: [null, Math.random() * 100 + "%"],
            y: [null, Math.random() * 100 + "%"],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

const StorySection = () => {
  const containerRef = useRef();
  const { scrollXProgress } = useScroll({ container: containerRef });
  
  const springProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-light text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The Story of <span className="text-amber-500">Rasam Roots</span>
        </motion.h2>

        {/* Progress bar */}
        <div className="relative h-1 bg-amber-500/10 rounded-full mb-8 overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-amber-500/30 rounded-full"
            style={{ scaleX: springProgress, transformOrigin: "left" }}
          />
        </div>

        {/* Horizontal scroll container */}
        <div 
          ref={containerRef}
          className="overflow-x-scroll hide-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-8 pb-8" style={{ width: `${storyScenes.length * 70}vw` }}>
            {storyScenes.map((scene, index) => (
              <motion.div
                key={scene.id}
                className="flex-none w-[65vw] md:w-[55vw] space-y-6"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <IllustrationScene scene={scene} progress={springProgress} />
                
                <div className="space-y-3">
                  <motion.h3 
                    className={`text-${scene.accent}-400 text-xl md:text-2xl font-light`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {scene.title}
                  </motion.h3>
                  <motion.p 
                    className="text-amber-200/70 leading-relaxed text-sm md:text-base"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {scene.description}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="hidden md:flex items-center justify-center mt-8 text-amber-400/50 gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Scroll</span>
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
};

export default StorySection; 