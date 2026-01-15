export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const modalContent = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 18
    }
  }
};
