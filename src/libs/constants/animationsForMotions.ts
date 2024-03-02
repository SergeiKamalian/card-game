export const modal = {
  hidden: {
    y: "-100vH",
    x: "10px",
  },
  visible: {
    y: "10px",
    x: "10px",
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 300,
      delay: 0.1,
    },
  },
  exit: {
    y: "-100vH",
    x: "10px",
    transition: {
      duration: 0.3,
    },
  },
};
