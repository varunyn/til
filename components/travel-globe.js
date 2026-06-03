"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";

const visitedCountries = [
  { id: "india", name: "India", location: [20.59, 78.96] },
  { id: "united-states", name: "United States", location: [39.83, -98.58] },
  { id: "japan", name: "Japan", location: [36.2, 138.25] },
  {
    id: "united-arab-emirates",
    name: "UAE",
    location: [23.42, 53.85],
  },
  { id: "mexico", name: "Mexico", location: [23.63, -102.55] },
  { id: "thailand", name: "Thailand", location: [15.87, 100.99] },
  { id: "new-zealand", name: "New Zealand", location: [-40.9, 174.89] },
  { id: "egypt", name: "Egypt", location: [26.82, 30.8] },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function TravelGlobe() {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!(canvas && wrapper)) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let globe;
    let frameId;
    let phi = 0.18;
    let theta = 0.24;
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let spinVelocity = 0;

    const buildGlobe = () => {
      const size = Math.min(wrapper.clientWidth, 420);
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (globe) {
        globe.destroy();
      }

      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;

      globe = createGlobe(canvas, {
        devicePixelRatio: pixelRatio,
        width: size * pixelRatio,
        height: size * pixelRatio,
        phi,
        theta,
        dark: document.documentElement.classList.contains("dark") ? 1 : 0,
        diffuse: 1.25,
        mapSamples: 12_000,
        mapBrightness: 5.4,
        baseColor: [0.95, 0.97, 1],
        markerColor: [0.94, 0.32, 0.12],
        glowColor: [0.95, 0.97, 1],
        opacity: 0.98,
        scale: 1,
        markers: visitedCountries.map((country) => ({
          id: country.id,
          location: country.location,
          size: 0.055,
        })),
        onRender: (state) => {
          state.phi = phi;
          state.theta = theta;

          if (isDragging || prefersReducedMotion) {
            return;
          }

          if (Math.abs(spinVelocity) > 0.0001) {
            phi += spinVelocity;
            spinVelocity *= 0.96;
          } else {
            phi += 0.0022;
          }
        },
      });
    };

    buildGlobe();

    const resizeObserver = new ResizeObserver(buildGlobe);
    resizeObserver.observe(wrapper);

    const handlePointerDown = (event) => {
      isDragging = true;
      spinVelocity = 0;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
      canvas.classList.add("cursor-grabbing");
    };

    const handlePointerMove = (event) => {
      if (!isDragging) {
        return;
      }

      const deltaX = event.clientX - lastPointerX;
      const deltaY = event.clientY - lastPointerY;

      phi += deltaX * 0.006;
      theta = clamp(theta + deltaY * 0.004, -0.55, 0.72);
      spinVelocity = deltaX * 0.0008;
      lastPointerX = event.clientX;
      lastPointerY = event.clientY;
    };

    const handlePointerUp = (event) => {
      isDragging = false;
      if (canvas.hasPointerCapture?.(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
      canvas.classList.remove("cursor-grabbing");
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);
    canvas.addEventListener("lostpointercapture", handlePointerUp);

    const rotate = () => {
      globe?.update({ phi, theta });
      frameId = requestAnimationFrame(rotate);
    };

    frameId = requestAnimationFrame(rotate);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
      canvas.removeEventListener("lostpointercapture", handlePointerUp);
      globe?.destroy();
    };
  }, []);

  return (
    <section
      aria-labelledby="travel-map-title"
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)] md:items-center">
        <div>
          <p className="mb-2 font-semibold text-sm text-sorbus-700 dark:text-sorbus-300">
            Travel
          </p>
          <h2
            className="font-bold text-gray-950 text-xl tracking-normal dark:text-white"
            id="travel-map-title"
          >
            Countries I&apos;ve Been To
          </h2>
          <p className="mt-2 max-w-md text-gray-600 text-sm leading-relaxed dark:text-gray-300">
            A small map of places that have shaped my notes, demos, and travel
            backlog.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {visitedCountries.map((country) => (
              <span
                className="rounded-full bg-sorbus-50 px-3 py-1 font-medium text-sorbus-800 text-xs dark:bg-sorbus-950/40 dark:text-sorbus-200"
                key={country.name}
              >
                {country.name}
              </span>
            ))}
          </div>
        </div>
        <div
          className="relative mx-auto flex aspect-square w-full max-w-[26rem] items-center justify-center"
          ref={wrapperRef}
        >
          <canvas
            aria-label="Animated globe with markers for countries visited. Drag to rotate."
            className="block max-w-full cursor-grab touch-none"
            ref={canvasRef}
          />
          {visitedCountries.map((country) => (
            <span
              className="pointer-events-none absolute rounded-full border border-gray-200 bg-white/90 px-2 py-1 font-semibold text-[0.68rem] text-gray-700 shadow-sm backdrop-blur-sm transition-[opacity,filter,transform] duration-300 dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-200"
              key={country.id}
              style={{
                bottom: "anchor(top)",
                filter: `blur(calc((1 - var(--cobe-visible-${country.id}, 0)) * 4px))`,
                left: "anchor(center)",
                opacity: `var(--cobe-visible-${country.id}, 0)`,
                positionAnchor: `--cobe-${country.id}`,
                translate: "-50% 0",
              }}
            >
              {country.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
