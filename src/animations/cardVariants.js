export const cardVariant = (index) => ({
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2 },
  },
});
