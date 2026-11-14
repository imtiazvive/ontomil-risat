import { notFound } from "next/navigation";
import books from "../../../lib/books";
import BookReader from "./reader";

export function generateStaticParams() {
  return books.map((book) => ({ id: String(book.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = books.find((item) => item.id === Number(id));

  if (!book) return { title: "বই পাওয়া যায়নি | অন্তমিল প্রকাশনী" };

  return {
    title: `${book.title} — নমুনা পাঠ | অন্তমিল প্রকাশনী`,
    description: `${book.title} বইটির ৫ পৃষ্ঠার নমুনা পড়ুন।`,
  };
}

export default async function ReadBookPage({ params }) {
  const { id } = await params;
  const book = books.find((item) => item.id === Number(id));

  if (!book) notFound();

  return <BookReader book={book} />;
}
