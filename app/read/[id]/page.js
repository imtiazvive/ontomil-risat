import { notFound } from "next/navigation";
import books from "../../../lib/books";
import { siteUrl, withBasePath } from "../../../lib/site";
import BookReader from "./reader";

export function generateStaticParams() {
  return books.map((book) => ({ id: String(book.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = books.find((item) => item.id === Number(id));

  if (!book) return { title: "বই পাওয়া যায়নি | অন্ত্যমিল প্রকাশনী" };

  const canonicalUrl = `${siteUrl}read/${book.id}/`;
  const title = `${book.title} — নমুনা পাঠ | Ontymil | অন্ত্যমিল প্রকাশনী`;
  const description = `${book.title} বইটি কিনুন এবং ৫ পৃষ্ঠার নমুনা পড়ুন। লেখক: ${book.author}। Ontymil Prokashon Books—অন্ত্যমিল প্রকাশনী।`;

  return {
    title,
    description,
    keywords: [
      book.title,
      book.author,
      book.category,
      "Ontymil",
      "Ontymil Prokashon",
      "Ontymil Prokashon Books",
      "অন্ত্যমিল",
      "অন্ত্যমিল প্রকাশনী",
      "বাংলা বই",
      "বই কিনুন",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "bn_BD",
      url: canonicalUrl,
      siteName: "অন্ত্যমিল প্রকাশনী",
      title,
      description,
      images: [
        {
          url: withBasePath("/opengraph-image.png"),
          width: 1200,
          height: 630,
          alt: `${book.title} — অন্ত্যমিল প্রকাশনীর বই`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [withBasePath("/opengraph-image.png")],
    },
  };
}

export default async function ReadBookPage({ params }) {
  const { id } = await params;
  const book = books.find((item) => item.id === Number(id));

  if (!book) notFound();

  return <BookReader book={book} />;
}
