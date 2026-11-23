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

  if (!book) return { title: "বই পাওয়া যায়নি | অন্তমিল প্রকাশনী" };

  const canonicalUrl = `${siteUrl}read/${book.id}/`;
  const title = `${book.title} — নমুনা পাঠ | অন্তমিল প্রকাশনী`;
  const description = `${book.title} বইটির ৫ পৃষ্ঠার নমুনা পড়ুন। লেখক: ${book.author}।`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "bn_BD",
      url: canonicalUrl,
      siteName: "অন্তমিল প্রকাশনী",
      title,
      description,
      images: [
        {
          url: withBasePath("/opengraph-image.png"),
          width: 1200,
          height: 630,
          alt: `${book.title} — অন্তমিল প্রকাশনীর বই`,
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
