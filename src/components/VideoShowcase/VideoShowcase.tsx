"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import styles from "./VideoShowcase.module.css";

export default function VideoShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Scroll-driven Scaling Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1500", // Increased scroll distance for more dramatic zoom
          scrub: 1,
          markers: false,
          refreshPriority: 2,
        },
      });

      tl.to(wrapperRef.current, {
        width: "100%",
        height: "100vh",
        borderRadius: 0,
        scale: 1,
        ease: "none",
      });

      // 4. Entrance Animation: Control Bar
      gsap.fromTo(
        controlsRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.videoWrapper} ref={wrapperRef}>
          <video
            ref={videoRef}
            className={styles.video}
            muted={isMuted}
            loop
            playsInline
            src="/cutri_video/huong_dan.mp4"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className={styles.controlBar} ref={controlsRef}>
            <button className={styles.controlButton} onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" style={{ marginLeft: "4px" }} />}
            </button>

            <div className={styles.volumeContainer}>
              <button className={styles.controlButton} onClick={toggleMute} style={{ width: "40px", height: "40px" }} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>

            <button className={styles.controlButton} onClick={handleReplay} aria-label="Replay">
              <RotateCcw size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
