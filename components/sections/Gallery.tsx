import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";

export function Gallery() {
  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Inside the clinic"
            title="A clean, calm space to be treated in"
            align="center"
          />
        </Reveal>

        <Reveal
          stagger
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-xl2 shadow-soft ${
                i === 0 || i === 3
                  ? "col-span-2 row-span-2 aspect-square"
                  : "aspect-square"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </Reveal>

        <p className="mt-6 text-center text-xs text-ink/40">
          Representative photography — updated clinic photographs coming soon.
        </p>
      </Container>
    </section>
  );
}
