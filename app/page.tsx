import Blog from "@/components/Blog";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-white">
          <p className="text-teal uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Handcrafted in New Jersey
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-light tracking-wide mb-6 text-navy">
            Custom Wrapped Fishing Rods
          </h1>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto">
            Premium fishing rods built with precision and care in Manahawkin, NJ
          </p>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-center mb-4 text-navy">
              Latest from the Shop
            </h2>
            <p className="text-navy/60 text-center mb-10 max-w-xl mx-auto">
              Stories, builds, and thoughts from the bench
            </p>
            <Blog />
          </div>
        </section>

        {/* Rod Art Section */}
        <section id="rod-art" className="py-20 px-4 bg-sand">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-light text-center mb-4 text-navy">
              Rod Art
            </h2>
            <p className="text-navy/60 text-center mb-12 max-w-xl mx-auto">
              Each rod is unique and custom built by hand
            </p>
            <Gallery />
          </div>
        </section>

        {/* Our Story Section */}
        <section id="our-story" className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-light mb-8 text-navy">
              Our Story
            </h2>
            <p className="text-navy/70 text-lg leading-relaxed mb-6">
              We are a small batch, custom art-focused rod builder exploring the boundaries of light tackle & advanced carbon prototype blanks for offshore and nearshore species off the New Jersey coast.
              Based in Manahawkin, NJ we take pride in hand crafting the very latest in rod technology.
            </p>
            <p className="text-navy/70 text-lg leading-relaxed">
              Every rod is hand wrapped with attention to detail and a commitment to quality
              that you can feel the moment you pick it up.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 text-center bg-navy text-white">
          <p className="font-heading text-2xl mb-2">Barnes Custom Fishing</p>
          <p className="text-white/60 mb-6">Manahawkin, NJ</p>
          <a
            href="https://www.instagram.com/barnescustomfishing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/70 hover:text-teal-light transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
            <span>@barnescustomfishing</span>
          </a>
          <p className="mt-8 text-white/40 text-sm">
            © {new Date().getFullYear()} Barnes Custom Fishing. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}
