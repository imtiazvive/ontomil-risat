import "./globals.css";
import { siteOrigin, siteUrl, withBasePath } from "../lib/site";

const description =
  "অন্ত্যমিল প্রকাশনী (Ontymil, Ontomil, Ontymel) বাংলাদেশের বাংলা বই প্রকাশনী। পছন্দের বই কিনুন, নতুন বই প্রকাশ করুন এবং লেখক হিসেবে পাণ্ডুলিপি প্রকাশের প্রস্তাব দিন।";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "অন্ত্যমিল প্রকাশনী",
      alternateName: [
        "Ontymil",
        "Ontymil Prokashon",
        "Ontymil Prokashon Books",
        "Ontymel",
        "Ontomil",
        "Ontomil Prokashoni",
        "অন্তমিল প্রকাশনী",
      ],
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteOrigin}${withBasePath("/ontomil-logo.png")}`,
      },
      description,
      areaServed: {
        "@type": "Country",
        name: "Bangladesh",
      },
      knowsAbout: ["বাংলা বই", "বাংলা বই প্রকাশনী", "বই প্রকাশনী", "বই প্রকাশনা", "পাণ্ডুলিপি"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: "অন্ত্যমিল প্রকাশনী",
      alternateName: ["Ontymil", "Ontomil", "Ontymel", "Ontymil Prokashon Books"],
      url: siteUrl,
      inLanguage: "bn-BD",
      publisher: {
        "@id": `${siteUrl}#organization`,
      },
    },
  ],
};

export const metadata = {
  metadataBase: new URL(siteOrigin),
  title: "অন্ত্যমিল প্রকাশনী | Ontymil বাংলা বই ও বই প্রকাশনা",
  description,
  applicationName: "অন্তমিল প্রকাশনী",
  keywords: [
    "অন্ত্যমিল",
    "অন্ত্যমিল প্রকাশনী",
    "অন্তমিল",
    "Ontymil",
    "Ontymil Prokashon",
    "Ontymil Prokashon Books",
    "Ontymel",
    "Ontymil Books",
    "Ontomil",
    "Ontomil Prokashoni",
    "Ontomil Prokashon",
    "Ontymil বাংলা বই",
    "Ontymil প্রিন্ট বুক",
    "বাংলা বই",
    "বাংলা বই প্রকাশনী",
    "বাংলা প্রকাশনী",
    "বই প্রকাশনী",
    "বই প্রকাশন",
    "বই প্রকাশনা",
    "বই কিনুন",
    "বাংলা বই কিনুন",
    "বই প্রকাশ করুন",
    "পাণ্ডুলিপি প্রকাশ",
    "বাংলাদেশে বই অর্ডার",
    "বাংলাদেশ প্রকাশনী",
  ],
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      {
        url: withBasePath("/icon.png"),
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: withBasePath("/apple-icon.png"),
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: siteUrl,
    siteName: "অন্ত্যমিল প্রকাশনী",
    title: "অন্ত্যমিল প্রকাশনী | Ontymil বাংলা বই ও বই প্রকাশনা",
    description,
    images: [
      {
        url: withBasePath("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: "অন্ত্যমিল প্রকাশনী—Ontymil Prokashon Books",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "অন্ত্যমিল প্রকাশনী | Ontymil বাংলা বই ও বই প্রকাশনা",
    description,
    images: [withBasePath("/opengraph-image.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
