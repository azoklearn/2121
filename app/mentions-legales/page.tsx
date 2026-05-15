import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Mentions Légales — 2121 Maison Privée",
};

export default function MentionsLegales() {
  return (
    <main className="relative bg-ivory text-ink min-h-screen">
      <Navbar />
      <section className="pt-40 md:pt-52 pb-20 md:pb-32">
        <div className="mx-auto px-6 md:px-10 max-w-3xl">
          <Link href="/" className="text-[10px] tracking-widest uppercase opacity-60 hover:opacity-100 mb-10 md:mb-16 inline-flex items-center gap-3">
            <span>↖</span>
            <span>Retour</span>
          </Link>

          <h1 className="text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-[1.05] tracking-tighter mb-12">
            Mentions <span className="font-serif italic">légales</span>
          </h1>

          <div className="prose prose-sm max-w-none space-y-8 text-[15px] leading-[1.8] text-ink/80">
            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Éditeur</h2>
              <p>
                2121 Maison Privée<br />
                21, Rue de la Paix · 75002 Paris · France<br />
                Email : <a href="mailto:private@2121.paris" className="underline underline-offset-2 hover:opacity-70">private@2121.paris</a><br />
                WhatsApp : +33 (0)6 21 21 21 21
              </p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Directeur de la publication</h2>
              <p>2121 Maison Privée</p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Hébergement</h2>
              <p>
                Vercel Inc.<br />
                440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
                <a href="https://vercel.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:opacity-70">vercel.com</a>
              </p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Propriété intellectuelle</h2>
              <p>
                L'ensemble des contenus présents sur le site (textes, images, vidéos, logos)
                est la propriété exclusive de 2121 Maison Privée. Toute reproduction, même
                partielle, est interdite sans autorisation écrite préalable.
              </p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Contact</h2>
              <p>
                Pour toute demande relative aux présentes mentions légales, merci de nous
                contacter par email à <a href="mailto:private@2121.paris" className="underline underline-offset-2 hover:opacity-70">private@2121.paris</a>.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
