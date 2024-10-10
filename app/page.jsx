"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { debounce } from "lodash";
import Head from "next/head";

import track from "../app/assets/icons/track.png";
import livestock from "../app/assets/icons/livestock.png";
import analyze from "../app/assets/icons/analyze.png";
import vision from "../app/assets/icons/vision.jpg";
import mission from "../app/assets/icons/mission.jpg";


export default function Home() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsSticky(scrollTop > 100);
    }, 50);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    gsap
      .timeline()
      .fromTo(
        ".contents h1",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 }
      )
      .fromTo(
        ".contents p",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        ".contents button",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.5"
      );
  }, []);

  useEffect(() => {
    const featureSection = document.querySelector(".features");

    const handleScroll = debounce(() => {
      const featurePosition = featureSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (featurePosition <= windowHeight - 100) {
        gsap.to(".box", { width: "40px", duration: 1, ease: "power3.out" });
      } else {
        gsap.to(".box", { width: "0px", duration: 1, ease: "power3.out" });
      }
    }, 50);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>FarmRuler - Advanced Farm Management Solutions</title>
        <meta
          name="description"
          content="FarmRuler provides an advanced solution for tracking crops, managing livestock, and analyzing farm performance."
        />
        <link rel="canonical" href="https://www.farmruler.com" />
        <meta
          property="og:title"
          content="FarmRuler - Manage Your Farm Smarter"
        />
        <meta
          property="og:description"
          content="Track crops, manage livestock, and analyze farm performance all in one platform."
        />
        <meta property="og:url" content="https://www.farmruler.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/path/to/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="relative">
          <Navbar />
        </div>

        <div
          className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
            isSticky ? "bg-white shadow-lg" : "bg-transparent"
          }`}
          style={{
            transform: isSticky ? "translateY(0)" : "translateY(-100%)",
          }}
        >
          <Navbar />
        </div>

        <section className="hero relative" role="banner">
          <div className="hero h-[95vh] flex justify-center flex-col items-center relative overflow-hidden">
            <div
              className="bg absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
              style={{
                backgroundImage:
                  "url('https://www.villagesquare.in/wp-content/uploads/2021/04/pexels-sajals-gallery-7415330-scaled.jpg')",
              }}
              role="img"
              aria-label="FarmRuler Hero Image - A field with lush green crops."
            ></div>
            <div
              className="bg absolute top-0 left-0 w-full h-full bg-black z-[-1]"
              style={{ opacity: 0.7 }}
            ></div>

            <div className="contents text-center">
              <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                Welcome to FarmRuler
              </h1>
              <p className="text-2xl text-white mt-4">
                Your ultimate farm management solution
              </p>

              <button
                className="btn w-64 h-16 bg-green-600 mt-10 text-white text-lg rounded shadow-lg hover:bg-green-700 transition-colors"
                aria-label="Get Started with FarmRuler"
              >
                Get Started
              </button>
            </div>

            <div
              className="scroll-down absolute bottom-4 flex flex-col items-center"
              onClick={scrollToSection}
              aria-label="Scroll down to explore features"
            >
              <span className="text-white text-lg">Scroll Down</span>
              <svg
                className="w-6 h-6 text-white mt-2 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </section>

        <section
          className="max-w-[1350px] m-auto h-[70vh] flex flex-col justify-center"
          role="region"
          aria-labelledby="features-heading"
        >
          <div className="features flex justify-center items-center flex-col">
            <h2 id="features-heading" className="text-5xl font-semibold">
              Features
            </h2>
            <div className="box bg-green-500 rounded-2xl h-1 w-0 mb-20"></div>
          </div>
          <div className="icon_list flex justify-between w-[1450px]">
            {[
              { title: "Track Your Crops", icon: track },
              { title: "Manage Livestock", icon: livestock },
              { title: "Analyze Farm Performance", icon: analyze },
            ].map((feature, index) => (
              <div key={index} className="images flex flex-col py-4">
                <div className="relative w-full h-64">
                  <Image
                    src={feature.icon}
                    alt={`${feature.title} Icon`}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-3xl mt-4 text-center">{feature.title}</h3>
              </div>
            ))}
          </div>
        </section>

        <section
          className="max-w-[1350px] m-auto"
          role="region"
          aria-labelledby="vision-heading"
        >
          <div className="vision flex flex-col justify-center items-center">
            <h2 id="vision-heading" className="text-5xl font-semibold ">
              Our Vision
            </h2>
            <div className="box bg-green-500 rounded-2xl h-1 w-0 mb-20"></div>

            <div className="vision_box flex w-[1450px] h-[60vh] justify-center items-center">
              <div className="left w-1/2 h-full">
                <div
                  className="relative w-3/4 h-3/4 bg-cover bg-center rounded-lg shadow-xl"
                  style={{ backgroundImage: `url(${vision.src})` }} // Use vision.src for Next.js
                >
                  {/* Optional: Add content or an overlay here */}
                </div>
              </div>
              <div className="right w-1/2 ml-10 h-full">
                <h2 className="text-2xl">
                  Our vision is to empower farmers with an intuitive,
                  data-driven farm management tool that enhances productivity,
                  sustainability, and profitability. By providing a
                  user-friendly dashboard, farmers can easily access key metrics
                  such as crop health, weather forecasts, and financial data.
                  <br />
                  <br />
                  Key features include resource management for tracking seeds
                  and fertilizers, real-time weather integration, and mobile
                  accessibility for on-the-go management. Collaboration tools
                  facilitate communication among farm workers.
                  <br />
                  <br />
                  Ultimately, we aim to equip farmers with the necessary tools
                  and knowledge to thrive, ensuring a sustainable future for
                  agriculture while fostering a strong community of support and
                  collaboration.
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section
          className="max-w-[1350px] m-auto"
          role="region"
          aria-labelledby="vision-heading"
        >
          <div className="vision flex flex-col justify-center items-center">
            <h2 id="vision-heading" className="text-5xl font-semibold ">
              Our Mission
            </h2>
            <div className="box bg-green-500 rounded-2xl h-1 w-0 mb-20"></div>

            <div className="vision_box flex w-[1450px] h-[60vh] justify-between items-center">
              <div className="left w-1/2 ml-10 h-full">
                <h2 className="text-2xl">
                  Our mission is to transform farm management by delivering
                  innovative, intuitive tools that empower farmers to enhance
                  their operations. We are committed to boosting agricultural
                  productivity and sustainability through insightful data
                  analytics, efficient resource management, and seamless
                  collaboration. <br /> <br /> By harnessing cutting-edge
                  technology and nurturing a vibrant community, we aim to equip
                  farmers with the expertise and resources necessary to make
                  informed decisions, increase profitability, and champion
                  environmental stewardship. Together, we aspire to cultivate a
                  prosperous agricultural future for generations to come.
                </h2>
              </div>
              <div className="right w-2/5 h-full">
                <div
                  className="relative w-full h-3/4 bg-cover bg-center rounded-lg shadow-xl"
                  style={{ backgroundImage: `url(${mission.src})` }} // Use vision.src for Next.js
                >
                  {/* Optional: Add content or an overlay here */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}
