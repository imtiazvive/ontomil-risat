"use client";

import Link from "next/link";
import { useState } from "react";

const previewPages = [
  {
    heading: "একটি নতুন শুরু",
    paragraphs: [
      "সকালের আলো জানালার কাচ ছুঁয়ে ঘরে এসে পড়ল। টেবিলের ওপর রাখা বইটি যেন নীরবে অপেক্ষা করছিল—কেউ একজন এসে তার পাতা উল্টে দেবে, নতুন একটি গল্পে হারিয়ে যাবে।",
      "বই পড়ার মধ্যে এক আশ্চর্য শান্তি আছে। বাইরের পৃথিবী যতই ব্যস্ত হোক, কয়েকটি পৃষ্ঠা খুললেই নিজের জন্য আলাদা একটি সময় তৈরি হয়। সেখানে তাড়া নেই, আছে শুধু কৌতূহল আর কল্পনা।",
    ],
  },
  {
    heading: "পাতার ভেতর পথচলা",
    paragraphs: [
      "প্রতিটি গল্প আমাদের কোথাও না কোথাও নিয়ে যায়। কখনো অচেনা কোনো শহরে, কখনো শৈশবের উঠোনে, আবার কখনো এমন এক ভাবনার কাছে—যার কথা আগে কখনো মনে হয়নি।",
      "পড়তে পড়তে আমরা শুধু চরিত্রদের চিনি না; নিজেদেরও নতুন করে চিনতে শিখি। কোনো একটি বাক্য হয়তো দিনের শেষে মনে থেকে যায়, আরেকটি বাক্য খুলে দেয় নতুন প্রশ্নের দরজা।",
    ],
  },
  {
    heading: "একটু থেমে দেখা",
    paragraphs: [
      "সব পৃষ্ঠা দ্রুত পড়ে শেষ করতে হয় না। কখনো একটি অনুচ্ছেদের পাশে থামতে হয়, জানালার বাইরে তাকাতে হয়, কিংবা মনে মনে ভাবতে হয়—এই কথাটি কি আমার জীবনেও সত্যি?",
      "ভালো বইয়ের সৌন্দর্য এখানেই। সে আমাদের ওপর উত্তর চাপিয়ে দেয় না; বরং ভাবার জন্য একটু নীরব জায়গা তৈরি করে দেয়।",
    ],
  },
  {
    heading: "গল্পের ছোট্ট উপহার",
    paragraphs: [
      "একটি বই কাউকে উপহার দিলে তার সঙ্গে সময়ও উপহার দেওয়া হয়—নিজের সঙ্গে কাটানোর সময়, নতুন কিছু জানার সময়, আর কল্পনার জগতে একটু ঘুরে আসার সময়।",
      "তাই বইয়ের মলাট খুললেই শুরু হয় ছোট্ট এক যাত্রা। গন্তব্য জানা না থাকলেও ক্ষতি নেই; কখনো কখনো পথটুকুই সবচেয়ে সুন্দর।",
    ],
  },
  {
    heading: "এখান থেকে আপনার পালা",
    paragraphs: [
      "এই নমুনা পাঠের শেষ পাতায় এসে গল্প থামে না। বরং এখান থেকেই শুরু হতে পারে আপনার নিজের পড়ার অভ্যাস—প্রতিদিন কয়েকটি পৃষ্ঠা, পছন্দের একটি কোণ, আর এক কাপ চা।",
      "যে বইটি আপনার সঙ্গে কথা বলে, তাকে সময় দিন। হয়তো তার পাতায় অপেক্ষা করছে এমন একটি ভাবনা, যা অনেক দিন আপনার সঙ্গী হয়ে থাকবে।",
    ],
  },
];

const bengaliNumber = (number) => number.toLocaleString("bn-BD");
const formatPrice = (price) => `৳${price.toLocaleString("bn-BD")}`;

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.1 0C5.55 0 .22 5.32.22 11.87c0 2.09.55 4.13 1.59 5.93L.12 24l6.36-1.67a11.9 11.9 0 0 0 5.61 1.43h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.23-6.15-3.45-8.4ZM12.1 21.75a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.77.99 1.01-3.67-.24-.38a9.87 9.87 0 0 1-1.52-5.23c0-5.46 4.45-9.9 9.92-9.9a9.83 9.83 0 0 1 7.01 2.9 9.83 9.83 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.91 9.92Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.81-1.51-1.81-1.69-2.11-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.53.07-.81.38s-1.06 1.04-1.06 2.52 1.08 2.92 1.23 3.12c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function orderOnWhatsApp(book) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!phone || phone.length < 8 || phone.length > 15) {
    window.alert(
      "অর্ডার চালু করতে .env.local ফাইলে NEXT_PUBLIC_WHATSAPP_NUMBER-এ বিক্রেতার হোয়াটসঅ্যাপ নম্বর যোগ করুন।",
    );
    return;
  }

  const message = `আসসালামু আলাইকুম অন্তমিল প্রকাশনী,\n\nআমি ${book.title} বইটি অর্ডার করতে চাই।\nলেখক: ${book.author}\nদাম: ${formatPrice(book.price)}\n\nবইটির প্রাপ্যতা ও ডেলিভারির তথ্য জানাবেন।`;
  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

function LockIcon() {
  return (
    <svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="15.5" r="1.3" fill="currentColor" />
    </svg>
  );
}

export default function BookReader({ book }) {
  const [page, setPage] = useState(1);
  const isLocked = page > previewPages.length;
  const currentPage = previewPages[page - 1];

  return (
    <main className="reader-page">
      <header className="reader-header">
        <Link className="reader-brand" href="/">
          <span className="brand-seal">অ</span>
          <span className="brand-copy"><strong>অন্তমিল</strong><small>প্রকাশনী</small></span>
        </Link>
        <Link className="reader-back-link" href="/#books">← বইয়ের সংগ্রহে ফিরুন</Link>
      </header>

      <section className="reader-heading">
        <span className="eyebrow">বইয়ের নমুনা পাঠ</span>
        <h1>{book.title}</h1>
        <p>লেখক: {book.author}</p>
        <div className="reader-notice">
          <span aria-hidden="true">i</span>
          <p>নিচের ৫টি পৃষ্ঠা নমুনা পাঠের জন্য। এগুলো মূল বইয়ের পৃষ্ঠা নয়।</p>
        </div>
      </section>

      <section className="reader-workspace" aria-label="বই পড়ার অংশ">
        <div className={`reader-paper${isLocked ? " reader-paper-locked" : ""}`}>
          <div className="paper-topline">
            <span>অন্তমিল প্রকাশনী</span>
            <span>{book.title}</span>
          </div>
          {isLocked ? (
            <div className="locked-page">
              <span className="locked-icon"><LockIcon /></span>
              <span className="eyebrow">নমুনা পাঠ শেষ</span>
              <h2>বাকি পাতাগুলো<br />লক করা আছে</h2>
              <p>সম্পূর্ণ বইটি পেতে হোয়াটসঅ্যাপে অর্ডার করুন।</p>
              <button className="button button-dark" type="button" onClick={() => orderOnWhatsApp(book)}>
                <WhatsAppIcon /> বইটি অর্ডার করুন · {formatPrice(book.price)}
              </button>
            </div>
          ) : (
            <article className="paper-content">
              <span className="paper-section-label">নমুনা পাঠ · পৃষ্ঠা {bengaliNumber(page)}</span>
              <h2>{currentPage.heading}</h2>
              {currentPage.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <div className="paper-flourish" aria-hidden="true">✳</div>
            </article>
          )}
          <div className="paper-footer">
            <span>নমুনা পাঠ</span>
            <span>{bengaliNumber(page)}</span>
          </div>
        </div>

        <div className="reader-controls">
          <button
            className="reader-page-button"
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            ← আগের পৃষ্ঠা
          </button>
          <div className="reader-progress" aria-label={`পৃষ্ঠা ${bengaliNumber(page)}; ৫টি বিনামূল্যের পৃষ্ঠা`}>
            {previewPages.map((_, index) => (
              <button
                className={`progress-dot${page === index + 1 ? " active" : ""}${page > index + 1 ? " visited" : ""}`}
                key={index}
                type="button"
                onClick={() => setPage(index + 1)}
                aria-label={`পৃষ্ঠা ${bengaliNumber(index + 1)} পড়ুন`}
              >
                {bengaliNumber(index + 1)}
              </button>
            ))}
            <span className={`progress-lock${isLocked ? " active" : ""}`} aria-label="লক করা পৃষ্ঠা">
              <LockIcon />
            </span>
          </div>
          <button
            className="reader-page-button reader-next-button"
            type="button"
            onClick={() => setPage((current) => Math.min(previewPages.length + 1, current + 1))}
            disabled={isLocked}
          >
            পরের পৃষ্ঠা →
            {page === previewPages.length && <span className="next-lock"><LockIcon /></span>}
          </button>
        </div>
        <p className="reader-progress-caption">
          {isLocked
            ? "এই পৃষ্ঠাটি পড়তে সম্পূর্ণ বইটি অর্ডার করুন।"
            : `${bengaliNumber(page)} / ${bengaliNumber(previewPages.length)}টি বিনামূল্যের পৃষ্ঠা`}
        </p>
      </section>

      <footer className="reader-footer">
        <Link href="/#books">← অন্য বই বেছে নিন</Link>
        {!isLocked && (
          <button className="reader-order-link" type="button" onClick={() => orderOnWhatsApp(book)}>
            <WhatsAppIcon /> সম্পূর্ণ বই অর্ডার করুন · {formatPrice(book.price)}
          </button>
        )}
      </footer>
    </main>
  );
}
