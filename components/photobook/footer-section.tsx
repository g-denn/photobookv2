"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Heart } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const initialsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in and up
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Heart pulsing animation
      gsap.to(heartRef.current, {
        scale: 1.2,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Initials dramatic reveal
      const letters = initialsRef.current?.querySelectorAll(".initial-letter")
      if (letters) {
        gsap.fromTo(
          letters,
          { opacity: 0, y: 100, rotateX: 90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: initialsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={sectionRef}
      className="relative overflow-hidden bg-primary py-24 md:py-32"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      <div ref={contentRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Large initials display */}
        <div
          ref={initialsRef}
          className="mb-8 flex items-center justify-center gap-4 md:gap-8"
          style={{ perspective: "1000px" }}
        >
          <span
            className="initial-letter text-7xl font-bold text-primary-foreground/90 md:text-9xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            G
          </span>
          <div ref={heartRef} className="flex items-center justify-center">
            <Heart className="h-10 w-10 fill-primary-foreground text-primary-foreground md:h-14 md:w-14" />
          </div>
          <span
            className="initial-letter text-7xl font-bold text-primary-foreground/90 md:text-9xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            G
          </span>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
          <span className="text-balance">Grandma & Grandpa</span>
        </h2>

        <p className="mb-8 text-lg text-primary-foreground/80 md:text-xl">
          <span className="text-pretty">
            A love story that continues to inspire us all
          </span>
        </p>

        <div className="flex items-center justify-center gap-4 text-sm uppercase tracking-widest text-primary-foreground/60">
          <span className="h-px w-8 bg-primary-foreground/30" />
          <span>Happy Anniversary</span>
          <span className="h-px w-8 bg-primary-foreground/30" />
        </div>

        <p className="mt-12 text-sm text-primary-foreground/50">
          Made with love by your family
        </p>
      </div>
    </footer>
  )
}
