"use client";

import React, { useEffect, useRef, useState } from "react";
import { expandShortUrl } from "./Action";
import { getEmbedSrc } from "./mapUtils";

export const MapPreview = ({
  url,
  height = "350px",
  borderRadius = "0px",
  showError = true,
  className = "",
  style = {},
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [embedSrc, setEmbedSrc] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const ref = useRef(null);

  // Only activate when visible
  useEffect(() => {
    if (!ref.current) return;

    let mounted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && mounted) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(ref.current);

    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || !url) return;

    let cancelled = false;

    const processUrl = async () => {
      try {
        let processedUrl = url;

        if (
          url.includes("goo.gl") ||
          url.includes("g.co") ||
          url.includes("bit.ly")
        ) {
          processedUrl = await expandShortUrl(url);
        }

        const src = getEmbedSrc(processedUrl);

        if (!cancelled) {
          setEmbedSrc(src);
          setIsValid(!!src);
        }
      } catch {
        if (!cancelled) setIsValid(false);
      }
    };

    processUrl();

    return () => {
      cancelled = true;
    };
  }, [shouldLoad, url]);

  if (!isValid && !showError) return null;

  return (
    <div
      ref={ref}
      className={`map-preview-container w-full h-full relative bg-gray-100 overflow-hidden ${className}`}
      style={{ height, borderRadius, ...style }}
    >
      {!shouldLoad ? (
        // 🧱 Placeholder
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
          Map will load on scroll
        </div>
      ) : embedSrc ? (
        <iframe
          src={embedSrc}
          width="100%"
          height="100%"
          loading="lazy"
          className="border-0 block w-full h-full"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map Preview"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-500">
          Invalid Map URL provided.
        </div>
      )}
    </div>
  );
};
