export const fadeIn = (
  direction,
  delay = 0,
  duration = 0.4,
  ease = [0.25, 0.25, 0.25, 0.75]
) => {
  const xValue = direction === "left" ? 40 : direction === "right" ? -40 : 0;
  const yValue = direction === "up" ? 40 : direction === "down" ? -40 : 0;

  return {
    hidden: {
      opacity: 0,
      y: yValue,
      x: xValue,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "tween",
        duration: duration,
        delay: delay,
        ease: ease,
      },
    },
  };
};
