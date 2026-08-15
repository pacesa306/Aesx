import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
  return (
    <a href="https://wa.me/59175666702" target="_blank" rel="noopener noreferrer">
      <motion.span
        className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.5)] cursor-pointer"
        animate={{
          rotate: [0, -25, 25, -20, 20, -12, 12, -5, 5, 0],
          scale:  [1, 1.5, 1.5, 1.35, 1.35, 1.2, 1.2, 1, 1, 1],
        }}
        transition={{ repeat: Infinity, duration: 0.45, ease: 'easeInOut', repeatDelay: 0.25 }}
      >
        <FaWhatsapp size={28} className="md:w-8 md:h-8" />
      </motion.span>
    </a>
  );
}
