Add a real clinic clip here as `clinic-loop.mp4` to activate the background
video in CTABanner (see components/ui/BackgroundVideo.tsx). Keep it:
- ≤ 15 seconds, looping
- 720p or lower, H.264, no audio track needed (it's muted anyway)
- Under ~4MB so it doesn't hurt mobile load time

Until a file is added here, the component fails silently and the section
falls back to its existing dot-pattern background — nothing breaks.
