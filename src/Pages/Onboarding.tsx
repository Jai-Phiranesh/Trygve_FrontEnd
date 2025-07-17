import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Onboarding.css";

// Slide type definition
type Slide = {
  image: string;
  heading: string;
  subtext: string;
  autoAdvance?: boolean;
};

// Slide content
const slides: Slide[] = [
  {
    image: "/1.png",
    heading: "trygve",
    subtext: "Trusted Guardian of Life",
    autoAdvance: true,
  },
  {
    image: "/2.png",
    heading: '"Your Health, Our Priority"',
    subtext: "Trusted doctors and care at your doorstep.",
  },
  {
    image: "/3.png",
    heading: '"Seamless Care, Delivered"',
    subtext: "Consult, treat, and heal—hassle-free.",
  },
  {
    image: "/4.png",
    heading: '"Affordable Healthcare For Everyone"',
    subtext: "Quality care for every budget.",
  },
];

const Onboarding: React.FC = () => {
  const [current, setCurrent] = useState<number>(0);
  const touchStartX = useRef<number | null>(null);
  const navigate = useNavigate();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && current < slides.length - 1) {
        setCurrent((prev) => prev + 1);
      } else if (e.key === "ArrowLeft" && current > 0) {
        setCurrent((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [current]);

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && current < slides.length - 1) {
        setCurrent(current + 1); // Swipe left
      } else if (diff < 0 && current > 0) {
        setCurrent(current - 1); // Swipe right
      }
    }
    touchStartX.current = null;
  };

  // Auto advance
  useEffect(() => {
    if (slides[current].autoAdvance && current < slides.length - 1) {
      const timer = setTimeout(() => {
        setCurrent((prev) => prev + 1);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [current]);

  // Handlers
  const nextSlide = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
  };

  const skipSlides = () => {
    setCurrent(slides.length - 1);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const handleGetStarted = () => {
    navigate("/home-Page");
  };

  // State flags
  const isLastSlide = current === slides.length - 1;
  const isFirstSlide = current === 0;

  return (
    <div
      className="onboarding-banner"
      style={{ backgroundImage: `url(${slides[current].image})` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overlay">
        <div className="banner-text">
          <div key={current} className="slide-fade">
            <h1>{slides[current].heading}</h1>
            <p>{slides[current].subtext}</p>
            {isLastSlide && (
              <button className="get-started" onClick={handleGetStarted}>
                Get Started
              </button>
            )}
          </div>
        </div>

        <div className="controls-wrapper">
          {!isFirstSlide && (
            <div className="dots-container">
              {slides.map((_, index) =>
                index === 0 ? null : (
                  <span
                    key={index}
                    className={`dot ${index === current ? "active" : ""}`}
                    onClick={() => goToSlide(index)}
                  />
                )
              )}
            </div>
          )}

          {!isFirstSlide && !isLastSlide && (
            <div className="nav-buttons">
              <button className="skip" onClick={skipSlides}>
                Skip
              </button>
              <button onClick={nextSlide}>
                Next <span className="arrow">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
