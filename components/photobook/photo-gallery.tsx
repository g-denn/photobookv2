"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface PhotoItem {
  id: number
  src: string
  caption: string
  size: "large" | "medium" | "small"
}

const photos: PhotoItem[] = [
  { id: 1, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.46%20%282%29-qrW2gxkgrhAgyuQpTBBc8B7IR4FKyI.jpeg", caption: "Cheers to love", size: "large" },
  { id: 2, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.47%20%281%29-nbxUy67tzaW1PNI0Njb7Ixv6yPJzFj.jpeg", caption: "Celebrating together", size: "small" },
  { id: 3, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.38-yzBdpaTz7prz9xMmZEPtaa6L411Aef.jpeg", caption: "Chinese New Year", size: "small" },
  { id: 4, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.46%20%281%29-pKpRdZKRwo5eNotyTIZ7VIfKkxL47D.jpeg", caption: "Lantern Festival", size: "medium" },
  { id: 5, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.44-qVnceHFZrRgXhxNhPqcVWisikcvkDx.jpeg", caption: "Under the blossoms", size: "large" },
  { id: 6, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.33-v8fwIvFaKAzgkCR4urfWpHkxoRuJqh.jpeg", caption: "Christmas joy", size: "small" },
  { id: 7, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.48%20%281%29-796p2F4gegim8ibgFqRsQd7ATfrQpq.jpeg", caption: "Tropical getaway", size: "small" },
  { id: 8, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.32-O5OZZpYMkre8UtfDobyGcQvuycebV1.jpeg", caption: "Elegant evening", size: "medium" },
  { id: 9, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.34%20%281%29-2g8ip96PKgQvtAT5iZbh16CEqbHPfB.jpeg", caption: "Dinner date", size: "small" },
  { id: 10, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.48-swjcoMMH8gxCmLkCutU3UPz7SwPzwI.jpeg", caption: "Tea time", size: "small" },
  { id: 11, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.47-p2EACjY43IobjLhm76EZEhqtvDYboR.jpeg", caption: "Reading together", size: "large" },
  { id: 12, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.45-LFPFmZdNUIfzc9kh2Pfz7Xx5lVznMx.jpeg", caption: "Cozy moments", size: "small" },
  { id: 13, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.46-0YcuAPyM3SjLaclG2bUqiXyp29IguT.jpeg", caption: "Family celebration", size: "small" },
  { id: 14, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.33%20%281%29-UEHv2MsrsQNNrxeTFB5gAFnOsfnex1.jpeg", caption: "Sweet moments", size: "medium" },
  { id: 15, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.43-iUBjqz3DhvU9uSTJRk9Ds8Gk62vgBN.jpeg", caption: "Lunch date", size: "small" },
  { id: 16, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.47%20%282%29-vyxUVDNe5t08aunBRspaQctSqfT9Z0.jpeg", caption: "Year of the Rat", size: "small" },
  { id: 17, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.34-XAoXwcaEE2gyPes7kbtvCA7TFliQ9J.jpeg", caption: "Fun times", size: "large" },
  { id: 18, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.45%20%281%29-tGtDS4zkT6jqoFkphwFNb6P7rsdl57.jpeg", caption: "Casual day out", size: "small" },
  { id: 19, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.34%20%282%29-hU47vmMwxI76AeIaID5z7Dr3cljAd5.jpeg", caption: "Playful memories", size: "small" },
  { id: 20, src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-03-13%20at%2020.37.45%20%282%29-Wu28Ijge4sl6Wm3r8juiyjf2jfxEjr.jpeg", caption: "Fine dining", size: "medium" },
]

export function PhotoGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Gallery items with dramatic reveal
      const items = galleryRef.current?.querySelectorAll(".gallery-item")
      if (items) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
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
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
              delay: (index % 3) * 0.1,
            }
          )

          // Hover animation setup
          const card = item.querySelector(".photo-card")
          if (card) {
            item.addEventListener("mouseenter", () => {
              gsap.to(card, {
                scale: 1.03,
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                duration: 0.4,
                ease: "power2.out",
              })
            })
            item.addEventListener("mouseleave", () => {
              gsap.to(card, {
                scale: 1,
                y: 0,
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                duration: 0.4,
                ease: "power2.out",
              })
            })
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const getSizeClasses = (size: PhotoItem["size"]) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2"
      case "medium":
        return "col-span-1 row-span-1 md:row-span-2"
      case "small":
        return "col-span-1 row-span-1"
    }
  }

  return (
    <section ref={sectionRef} className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div ref={headingRef} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Precious Memories</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            <span className="text-pretty">
              Each photograph tells a chapter of Gong Gong & Popo's beautiful journey together
            </span>
          </p>
        </div>

        <div
          ref={galleryRef}
          className="grid auto-rows-[150px] grid-cols-2 gap-3 md:auto-rows-[200px] md:grid-cols-4 md:gap-6"
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`gallery-item ${getSizeClasses(photo.size)}`}
              style={{ perspective: "1000px" }}
            >
              <Card className="photo-card group relative h-full w-full cursor-pointer overflow-hidden border-border/30 transition-colors">
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Caption overlay - always visible on mobile, hover on desktop */}
                <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-3 md:translate-y-full md:p-4 md:transition-transform md:duration-300 md:group-hover:translate-y-0">
                  <p className="text-xs font-medium text-background md:text-sm">
                    {photo.caption}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <span className="hidden md:inline">Hover over</span>
          <span className="md:hidden">Tap</span>
          {" "}photos to see their captions
        </p>
      </div>
    </section>
  )
}
