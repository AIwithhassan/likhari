import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Pinyon_Script,
  Noto_Nastaliq_Urdu,
  Noto_Sans_Devanagari,
  // Display faces (headline "lead")
  Instrument_Sans,
  Bricolage_Grotesque,
  Fraunces,
  Sora,
  // Script faces (headline "accent")
  Instrument_Serif,
  Playfair_Display,
  Caveat,
  Gloock,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const script = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
});
const urdu = Noto_Nastaliq_Urdu({
  variable: "--font-urdu",
  subsets: ["arabic"],
  weight: ["400", "600"],
});
const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "600"],
});

/* ---- Font experiment: five pairings, switchable via data-font ---- */
const instrumentSans = Instrument_Sans({
  variable: "--f-instrument-sans",
  subsets: ["latin"],
});
const bricolage = Bricolage_Grotesque({
  variable: "--f-bricolage",
  subsets: ["latin"],
});
const fraunces = Fraunces({ variable: "--f-fraunces", subsets: ["latin"] });
const sora = Sora({ variable: "--f-sora", subsets: ["latin"] });

const instrumentSerif = Instrument_Serif({
  variable: "--f-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const playfair = Playfair_Display({
  variable: "--f-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});
const caveat = Caveat({ variable: "--f-caveat", subsets: ["latin"] });
const gloock = Gloock({ variable: "--f-gloock", subsets: ["latin"], weight: "400" });

const THEME_INIT = `(function(){try{var t=localStorage.getItem('likhari-theme'),p=localStorage.getItem('likhari-palette'),f=localStorage.getItem('likhari-font');if(!t)t='dark';document.documentElement.setAttribute('data-theme',t);if(p)document.documentElement.setAttribute('data-palette',p);document.documentElement.setAttribute('data-font',f||'editorial');}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Likhari | لکھاری — Mirza Ghalib's favorite AI tool",
  description:
    "Likhari is a free voice-to-text app that turns everything you say into clean, formatted writing — in any app on your machine.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${geistSans.variable} ${geistMono.variable} ${script.variable} ${urdu.variable} ${hindi.variable} ${instrumentSans.variable} ${bricolage.variable} ${fraunces.variable} ${sora.variable} ${instrumentSerif.variable} ${playfair.variable} ${caveat.variable} ${gloock.variable}`} data-theme="dark" data-palette="lime" data-font="editorial" suppressHydrationWarning>
      <head>
        {/* Applies the saved theme before first paint so there is no flash. */}
        <script
          suppressHydrationWarning
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: THEME_INIT }}
        />
      </head>
      <body
        className="min-h-full"
      >
        {children}
      </body>
    </html>
  );
}
