"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { Heart } from "lucide-react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([titleRef.current, subtitleRef.current, dateRef.current], {
        opacity: 0,
        y: 60,
      })
      gsap.set(heartRef.current, {
        opacity: 0,
        scale: 0,
        rotation: -180,
      })
      gsap.set(scrollIndicatorRef.current, {
        opacity: 0,
        y: 20,
      })

      // Timeline animation
      const tl = gsap.timeline({ delay: 0.5 })

      tl.to(heartRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
      })
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          dateRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        )

      // Continuous heart beat animation
      gsap.to(heartRef.current, {
        scale: 1.1,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      })

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6"
    >
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-secondary/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div ref={heartRef} className="mb-8">
          <Heart className="h-16 w-16 fill-red-500 text-red-500 md:h-20 md:w-20" />
        </div>

        <h1
          ref={titleRef}
          className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl"
        >
          <span className="block">Happy Wedding Anniversary</span>
          <span className="block whitespace-nowrap">Gong&nbsp;Gong &amp; Popo</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mb-8 max-w-xl text-lg font-medium text-muted-foreground md:text-xl lg:text-2xl"
        >
          <span className="text-pretty">
            A celebration of love, laughter, and a lifetime together
          </span>
        </p>

        <div
          ref={dateRef}
          className="flex items-center gap-4 text-sm font-semibold uppercase tracking-widest text-primary"
        >
          <span className="h-px w-12 bg-primary/50" />
          <span>Wedding Anniversary</span>
          <span className="h-px w-12 bg-primary/50" />
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Scroll to explore
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  )
}
