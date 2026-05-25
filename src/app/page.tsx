"use client";

import Loader from "@/components/Loader";
import ScrollToTop from "@/components/ScrollToTop";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/sections/Hero"), {
  ssr: false,
  loading: () => <Loader />,
});

const About = dynamic(() => import("@/sections/About"), {
  ssr: false,
  loading: () => <Loader />,
});

const Services = dynamic(() => import("@/sections/Services"), {
  ssr: false,
  loading: () => <Loader />,
});

// const Pricing = dynamic(() => import("@/sections/PricingSection"), {
//   ssr: false,
//   loading: () => <Loader />,
// });

const Skills = dynamic(() => import("@/sections/Skills"), {
  ssr: false,
  loading: () => <Loader />,
});

const Portfolio = dynamic(() => import("@/sections/Portfolio"), {
  ssr: false,
  loading: () => <Loader />,
});

const Education = dynamic(() => import("@/sections/Education"), {
  ssr: false,
  loading: () => <Loader />,
});

// const Testimonials = dynamic(() => import("@/sections/Testimonials"), {
//   ssr: false,
//   loading: () => <Loader />,
// });

const Contact = dynamic(() => import("@/sections/Contact"), {
  ssr: false,
  loading: () => <Loader />,
});

const Footer = dynamic(() => import("@/sections/Footer"), {
  ssr: false,
  loading: () => <Loader />,
});

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      {/* <Pricing /> */}
      <Skills />
      <Portfolio />
      <Education />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
