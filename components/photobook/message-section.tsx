"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function MessageSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLParagraphElement>(null)
  const messageRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance with scale and rotation
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotateX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Heart animation
      gsap.fromTo(
        heartRef.current,
        { opacity: 0, scale: 0, rotation: -180 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: 0.3,
        }
      )

      // From text
      gsap.fromTo(
        fromRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: 0.5,
        }
      )

      // Message text reveal word by word
      gsap.fromTo(
        messageRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: 0.7,
        }
      )

      // Continuous heart pulse
      gsap.to(heartRef.current, {
        scale: 1.15,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 shadow-lg md:p-12"
          style={{ perspective: "1000px" }}
        >
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <div className="relative z-10 text-center">
            {/* Heart icon */}
            <div ref={heartRef} className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                <Heart className="h-10 w-10 fill-red-500 text-red-500" />
              </div>
            </div>

            {/* From label */}
            <p
              ref={fromRef}
              className="mb-6 text-lg font-semibold uppercase tracking-widest text-primary"
            >
              A Message from E-Va
            </p>

            {/* Message */}
            <p
              ref={messageRef}
              className="text-xl font-medium leading-relaxed text-foreground md:text-3xl lg:text-4xl"
            >
              <span className="text-pretty">
                Happy anniversary Popo and Gong Gong! Wishing you both joy and happiness. May your love grow more and more each passing year!
              </span>
            </p>

            {/* Decorative hearts */}
            <div className="mt-10 flex justify-center gap-2">
              <Heart className="h-4 w-4 fill-red-400 text-red-400" />
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
              <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
