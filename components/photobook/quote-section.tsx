"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const quotes = [
  {
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
  },
  {
    text: "Grow old along with me, the best is yet to be.",
    author: "Robert Browning",
  },
  {
    text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou",
  },
  {
    text: "Whatever our souls are made of, his and mine are the same.",
    author: "Emily Brontë",
  },
  {
    text: "I have found the one whom my soul loves.",
    author: "Song of Solomon 3:4",
  },
  {
    text: "True love stories never have endings.",
    author: "Richard Bach",
  },
  {
    text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    author: "Unknown",
  },
]

export function QuoteSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLQuoteElement>(null)
  const authorRef = useRef<HTMLParagraphElement>(null)

  const nextQuote = () => {
    gsap.to([textRef.current, authorRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        gsap.fromTo(
          [textRef.current, authorRef.current],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        )
      },
    })
  }

  const prevQuote = () => {
    gsap.to([textRef.current, authorRef.current], {
      opacity: 0,
      y: 30,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)
        gsap.fromTo(
          [textRef.current, authorRef.current],
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        )
      },
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(sectionRef.current, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Quote icon spinning in
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, rotation: -90, scale: 0.5 },
        {
          opacity: 1,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Quote text reveal
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Author fade in
      gsap.fromTo(
        authorRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Subtle floating animation on the quote
      gsap.to(quoteRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-24 md:min-h-[70vh] md:py-32"
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div ref={quoteRef} className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div ref={iconRef} className="mb-8 flex justify-center">
          <Quote className="h-12 w-12 text-primary/60 md:h-16 md:w-16" />
        </div>

        <blockquote
          ref={textRef}
          className="mb-8 min-h-[160px] text-xl font-bold leading-relaxed text-foreground md:min-h-[200px] md:text-4xl lg:text-5xl"
        >
          <span className="text-balance">
            &ldquo;{quotes[currentQuote].text}&rdquo;
          </span>
        </blockquote>

        <p
          ref={authorRef}
          className="mb-10 text-lg font-medium italic text-muted-foreground"
        >
          — {quotes[currentQuote].author}
        </p>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prevQuote}
            className="h-12 w-12 rounded-full border-primary/30 transition-all hover:scale-110 hover:border-primary hover:bg-primary/10"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Previous quote</span>
          </Button>

          {/* Quote indicators */}
          <div className="flex gap-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index !== currentQuote) {
                    gsap.to([textRef.current, authorRef.current], {
                      opacity: 0,
                      duration: 0.3,
                      onComplete: () => {
                        setCurrentQuote(index)
                        gsap.to([textRef.current, authorRef.current], {
                          opacity: 1,
                          duration: 0.5,
                          stagger: 0.1,
                        })
                      },
                    })
                  }
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentQuote
                    ? "w-6 bg-primary"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
              >
                <span className="sr-only">Go to quote {index + 1}</span>
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={nextQuote}
            className="h-12 w-12 rounded-full border-primary/30 transition-all hover:scale-110 hover:border-primary hover:bg-primary/10"
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Next quote</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
