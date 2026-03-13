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
  const card2Ref = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  const heart2Ref = useRef<HTMLDivElement>(null)
  const fromRef = useRef<HTMLParagraphElement>(null)
  const from2Ref = useRef<HTMLParagraphElement>(null)
  const messageRef = useRef<HTMLParagraphElement>(null)
  const message2Ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card 1 entrance
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 100, scale: 0.8, rotateX: 15 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: cardRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      )

      // Card 2 entrance
      gsap.fromTo(
        card2Ref.current,
        { opacity: 0, y: 100, scale: 0.8, rotateX: 15 },
        {
          opacity: 1, y: 0, scale: 1, rotateX: 0,
          duration: 1.2, ease: "power3.out", delay: 0.2,
          scrollTrigger: { trigger: card2Ref.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      )

      // Heart animations
      ;[{ h: heartRef, c: cardRef }, { h: heart2Ref, c: card2Ref }].forEach(({ h, c }, i) => {
        gsap.fromTo(
          h.current,
          { opacity: 0, scale: 0, rotation: -180 },
          {
            opacity: 1, scale: 1, rotation: 0,
            duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.3 + i * 0.2,
            scrollTrigger: { trigger: c.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        )
        gsap.to(h.current, { scale: 1.15, duration: 0.7, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 + i * 0.3 })
      })

      // From labels
      gsap.fromTo(fromRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5,
        scrollTrigger: { trigger: cardRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      })
      gsap.fromTo(from2Ref.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7,
        scrollTrigger: { trigger: card2Ref.current, start: "top 80%", toggleActions: "play none none reverse" },
      })

      // Messages
      gsap.fromTo(messageRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.7,
        scrollTrigger: { trigger: cardRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      })
      gsap.fromTo(message2Ref.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.9,
        scrollTrigger: { trigger: card2Ref.current, start: "top 80%", toggleActions: "play none none reverse" },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="bg-card py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* E-Va's card */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 shadow-lg md:p-10"
            style={{ perspective: "1000px" }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            </div>
            <div className="relative z-10 text-center">
              <div ref={heartRef} className="mb-8 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                  <Heart className="h-10 w-10 fill-red-500 text-red-500" />
                </div>
              </div>
              <p ref={fromRef} className="mb-6 text-lg font-semibold uppercase tracking-widest text-primary">
                A Message from E-Va
              </p>
              <p ref={messageRef} className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                <span className="text-pretty">
                  Happy anniversary Popo and Gong Gong! Wishing you both joy and happiness. May your love grow more and more each passing year!
                </span>
              </p>
              <div className="mt-10 flex justify-center gap-2">
                <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                <Heart className="h-4 w-4 fill-red-400 text-red-400" />
              </div>
            </div>
          </div>

          {/* Family message card */}
          <div
            ref={card2Ref}
            className="relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 shadow-lg md:p-10"
            style={{ perspective: "1000px" }}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-red-500/5 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
            </div>
            <div className="relative z-10 text-center">
              <div ref={heart2Ref} className="mb-8 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                  <Heart className="h-10 w-10 fill-red-500 text-red-500" />
                </div>
              </div>
              <p ref={from2Ref} className="mb-6 text-lg font-semibold uppercase tracking-widest text-primary">
                A Message from G-Den
              </p>
              <p ref={message2Ref} className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                <span className="text-pretty">
                  Happy Anniversary Popo &amp; Gong Gong ❤️ Thank you for showing our whole family what love, happiness, and commitment look like over a lifetime. The way you have supported each other through the years is something we all admire and learn from. Your love built the family we are blessed to be part of today.
                </span>
              </p>
              <div className="mt-10 flex justify-center gap-2">
                <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                <Heart className="h-4 w-4 fill-red-400 text-red-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
