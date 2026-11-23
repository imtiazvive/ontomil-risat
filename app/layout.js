import "./globals.css";
import { siteOrigin, siteUrl, withBasePath } from "../lib/site";

const description =
  "অন্তমিল প্রকাশনী (Ontomil Prokashoni)—বাংলা বই কিনুন, অথবা নতুন লেখক হিসেবে পাণ্ডুলিপি প্রকাশের প্রস্তাব দিন।";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}#organization`,
      name: "অন্তমিল প্রকাশনী",
      alternateName: ["Ontomil Prokashoni", "Ontomil"],
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
      knowsAbout: ["বাংলা বই", "বই প্রকাশনা", "পাণ্ডুলিপি"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      name: "অন্তমিল প্রকাশনী",
      alternateName: "Ontomil",
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
  title: "অন্তমিল প্রকাশনী | Ontomil Prokashoni",
  description,
  applicationName: "অন্তমিল প্রকাশনী",
  keywords: [
    "অন্তমিল",
    "Ontomil",
    "Ontomil Prokashoni",
    "বাংলা বই",
    "বাংলা প্রকাশনী",
    "বই প্রকাশ করুন",
    "পাণ্ডুলিপি প্রকাশ",
    "বাংলাদেশে বই অর্ডার",
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
    siteName: "অন্তমিল প্রকাশনী",
    title: "অন্তমিল প্রকাশনী | Ontomil Prokashoni",
    description,
    images: [
      {
        url: withBasePath("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: "অন্তমিল প্রকাশনী—বই কিনুন, বই প্রকাশ করুন",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "অন্তমিল প্রকাশনী | Ontomil Prokashoni",
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
