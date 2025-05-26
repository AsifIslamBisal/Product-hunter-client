import React, { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1920&q=80",
    heading: "Discover the Best Tech Products",
    subtext: "Curated by the community, for the community.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1920&q=80",
    heading: "Innovate, Launch, Inspire",
    subtext: "Showcase your startup to the world.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    heading: "Join a Passionate Community",
    subtext: "Discover new tools every day.",
  },
];
const Banner = () => {
    const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

    return (
        <div>
            <div className="relative w-full h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.heading}</h2>
            <p className="text-lg md:text-2xl mb-6">{slide.subtext}</p>
            <a href="/products" className="btn bg-white text-black px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition">
              Explore Products
            </a>
          </div>
        </div>
      ))}
    </div>
        </div>
    );
};

export default Banner;