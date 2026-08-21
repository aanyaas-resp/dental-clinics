import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BookingPromo } from "@/components/sections/BookingPromo";
import { VisitSteps } from "@/components/sections/VisitSteps";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Location } from "@/components/sections/Location";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services limit={6} />
      <AboutTeaser />
      <WhyChooseUs />
      <BookingPromo />
      <VisitSteps />
      <Gallery />
      <FAQ />
      <Location />
      <CTABanner />
    </>
  );
}
