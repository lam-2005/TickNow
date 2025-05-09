"use client";
import { useEffect } from "react";
import aos from "aos";
import "aos/dist/aos.css";

export default function AOSConfig() {
  useEffect(() => {
    aos.init({
      offset: 50,
      duration: 600,
      easing: "ease-in-sine",
      delay: 0,
      once: false,
      mirror: true,
    });
  }, []);

  return null;
}
