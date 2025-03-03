import React from 'react';
import { motion } from 'framer-motion';

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 2, ease: "easeInOut" }
  }
};

export const AncientOrigin = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* Mountains */}
    <motion.path
      d="M0,300 L100,150 L200,250 L300,100 L400,300"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-500/30"
    />
    {/* Sage */}
    <motion.path
      d="M200,200 C180,200 170,180 170,160 C170,140 180,120 200,120 C220,120 230,140 230,160 C230,180 220,200 200,200"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
    {/* Herbs */}
    <motion.path
      d="M160,220 C160,200 140,190 120,200 M240,220 C240,200 260,190 280,200"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-lime-500/30"
    />
  </svg>
);

export const RecipeJourney = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* Scrolling recipe */}
    <motion.path
      d="M100,50 C150,50 150,100 100,100 C50,100 50,150 100,150 C150,150 150,200 100,200 C50,200 50,250 100,250"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-orange-500/30"
    />
    {/* Hands */}
    <motion.path
      d="M250,150 C270,140 290,140 300,150 M250,200 C270,190 290,190 300,200"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

export const ModernTwist = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* City skyline */}
    <motion.path
      d="M50,250 L100,150 L150,200 L200,100 L250,180 L300,120 L350,220"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-rose-500/30"
    />
    {/* People */}
    <motion.path
      d="M150,200 C130,200 130,160 150,160 M250,200 C270,200 270,160 250,160"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

export const FusionWorlds = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* Modern kitchen elements */}
    <motion.path
      d="M100,100 L300,100 L300,250 L100,250 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-yellow-500/30"
    />
    {/* Traditional elements */}
    <motion.path
      d="M150,150 C200,120 250,120 300,150"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

export const Creation = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* Bottle shape */}
    <motion.path
      d="M180,50 L220,50 L240,100 L240,250 L160,250 L160,100 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-500/30"
    />
    {/* Liquid waves */}
    <motion.path
      d="M160,180 C180,160 220,200 240,180"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

export const Benefits = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* Health symbols */}
    <motion.path
      d="M100,150 C100,100 150,100 150,150 C150,200 100,200 100,150"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-orange-500/30"
    />
    <motion.path
      d="M200,100 L200,200 M150,150 L250,150"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

export const Celebration = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* People in circle */}
    <motion.path
      d="M200,150 C250,150 250,200 200,200 C150,200 150,150 200,150"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-rose-500/30"
    />
    {/* Celebration elements */}
    <motion.path
      d="M100,100 L120,80 M300,100 L280,80 M100,200 L120,220 M300,200 L280,220"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

export const Invitation = () => (
  <svg className="w-full h-full" viewBox="0 0 400 300">
    {/* Nature elements */}
    <motion.path
      d="M50,250 C100,200 150,250 200,200 C250,150 300,200 350,150"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-yellow-500/30"
    />
    {/* Urban elements */}
    <motion.path
      d="M100,100 L100,200 M200,50 L200,150 M300,100 L300,200"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      variants={pathVariants}
      initial="hidden"
      animate="visible"
      className="text-amber-400/40"
    />
  </svg>
);

const illustrations = {
  "ancient-origin": AncientOrigin,
  "recipe-journey": RecipeJourney,
  "modern-twist": ModernTwist,
  "fusion": FusionWorlds,
  "creation": Creation,
  "benefits": Benefits,
  "celebration": Celebration,
  "invitation": Invitation
};

export default illustrations; 