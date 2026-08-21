"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type BackgroundVideoProps = {
  /** Path under /public, e.g. "/videos/clinic-loop.mp4" — keep this a
   *  SHORT, LOW-RESOLUTION clip (720p or less, <4MB, H.264) so it loads
   *  fast on mobile. See README "Adding the hero background video". */
  src: string;
  posterSrc?: string;
  className?: string;
};

/**
 * BackgroundVideo
 * Muted, looping background video that only starts loading once it
 * scrolls near the viewport (IntersectionObserver) and never blocks
 * first paint. If the file at `src` doesn't exist yet, it fails
 * silently and the poster image / gradient behind it keeps showing —
 * safe to ship before a real video file is added to /public/videos.
 */
export function BackgroundVideo({ src, posterSrc, className }: BackgroundVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (failed) return null;

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}>
      {shouldLoad && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={() => setFailed(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
