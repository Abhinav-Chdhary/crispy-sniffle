import confetti from "canvas-confetti";

export const celebrateConfetti = () => {
  var end = Date.now() + 1 * 1000;

  function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }

  frame(); // Start the animation
};
