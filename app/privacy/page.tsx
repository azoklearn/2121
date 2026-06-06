import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Politique de confidentialité — 2121 Maison Privée",
};

export default function Privacy() {
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
            Politique de <span className="font-serif italic">confidentialité</span>
          </h1>

          <div className="space-y-8 text-[15px] leading-[1.8] text-ink/80">
            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Données collectées</h2>
              <p>
                2121 Maison Privée ne collecte aucune donnée personnelle automatiquement
                sur ce site. Aucun cookie de tracking, aucun service d'analyse tiers.
              </p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Échanges privés</h2>
              <p>
                Lorsque vous nous contactez via WhatsApp, email ou Instagram, les
                informations que vous partagez (nom, coordonnées, demandes) sont
                conservées uniquement le temps de traiter votre demande, et ne sont
                jamais transmises à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Vos droits (RGPD)</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données, vous
                disposez d'un droit d'accès, de rectification et de suppression de vos
                données. Pour exercer ces droits, contactez-nous à{" "}
                <a href="mailto:yb@2121collection.com" className="underline underline-offset-2 hover:opacity-70">yb@2121collection.com</a>.
              </p>
            </section>

            <section>
              <h2 className="text-[10px] tracking-widest uppercase opacity-55 mb-3">Hébergement & cookies techniques</h2>
              <p>
                Le site est hébergé chez Vercel. Seul un cookie technique (préférence de
                langue) est stocké localement dans votre navigateur. Aucune donnée n'est
                transmise à un serveur.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
