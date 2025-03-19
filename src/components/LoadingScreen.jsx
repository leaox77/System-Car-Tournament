import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="loading-animation"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          className="loading-car" 
          viewBox="0 0 24 24"
          fill="var(--accent)"
        >
          <path d="M21,12V13.5C21,14.33 20.33,15 19.5,15H18.75C18.75,15.41 18.41,15.75 18,15.75C17.59,15.75 17.25,15.41 17.25,15H6.75C6.75,15.41 6.41,15.75 6,15.75C5.59,15.75 5.25,15.41 5.25,15H4.5C3.67,15 3,14.33 3,13.5V12M18,13.5C18,13.09 18.34,12.75 18.75,12.75C19.16,12.75 19.5,13.09 19.5,13.5C19.5,13.91 19.16,14.25 18.75,14.25C18.34,14.25 18,13.91 18,13.5M6,13.5C6,13.09 6.34,12.75 6.75,12.75C7.16,12.75 7.5,13.09 7.5,13.5C7.5,13.91 7.16,14.25 6.75,14.25C6.34,14.25 6,13.91 6,13.5M21,11.25H3V6C3,5.17 3.67,4.5 4.5,4.5H19.5C20.33,4.5 21,5.17 21,6V11.25Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;