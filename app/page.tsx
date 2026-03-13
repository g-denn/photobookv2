import { HeroSection } from "@/components/photobook/hero-section"
import { PhotoGallery } from "@/components/photobook/photo-gallery"
import { QuoteSection } from "@/components/photobook/quote-section"
import { MessageSection } from "@/components/photobook/message-section"
import { FooterSection } from "@/components/photobook/footer-section"

export default function PhotobookPage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <PhotoGallery />
      <QuoteSection />
      <MessageSection />
      <FooterSection />
    </main>
  )
}
