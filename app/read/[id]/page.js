import { notFound } from "next/navigation";
import BookReader from "./reader";

const books = [
  { id: 1, title: "নীরবতার শিল্প", author: "পিকো আইয়ার", price: 520 },
  { id: 2, title: "হাজারো ঝলমলে সূর্য", author: "খালেদ হোসেইনি", price: 690 },
  { id: 3, title: "পথের পাঁচালী", author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়", price: 380 },
  { id: 4, title: "মধ্যরাতের লাইব্রেরি", author: "ম্যাট হেইগ", price: 590 },
  { id: 5, title: "ইকিগাই", author: "হেক্টর গার্সিয়া ও ফ্রান্সেস মিরালেস", price: 450 },
  { id: 6, title: "চোখের বালি", author: "রবীন্দ্রনাথ ঠাকুর", price: 320 },
  { id: 7, title: "কফি ঠান্ডা হওয়ার আগে", author: "তোশিকাজু কাওয়াগুচি", price: 560 },
  { id: 8, title: "অ্যাটমিক হ্যাবিটস", author: "জেমস ক্লিয়ার", price: 620 },
];

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
