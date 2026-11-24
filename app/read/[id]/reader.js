"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import books from "../../../lib/books";
import { getBookUrl, getWhatsAppUrl } from "../../../lib/whatsapp";
import { withBasePath } from "../../../lib/site";

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
  const message = `আসসালামু আলাইকুম অন্ত্যমিল প্রকাশনী,\n\nআমি ${book.title} বইটি অর্ডার করতে চাই।\nলেখক: ${book.author}\nদাম: ${formatPrice(book.price)}\nবইটির পেজ: ${getBookUrl(book.id)}\n\nবইটির প্রাপ্যতা ও ডেলিভারির তথ্য জানাবেন।`;
  const url = getWhatsAppUrl(message);
  if (!url) {
    window.alert(
      "হোয়াটসঅ্যাপ নম্বরটি সঠিকভাবে সেট করা নেই। অনুগ্রহ করে বিক্রেতার সঙ্গে যোগাযোগ করুন।",
    );
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
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
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const viewerRef = useRef(null);
  const pageRefs = useRef([]);
  const isLocked = page > previewPages.length;

  useEffect(() => {
    const candidates = books.filter((item) => item.id !== book.id);
    for (let index = candidates.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [candidates[index], candidates[randomIndex]] = [candidates[randomIndex], candidates[index]];
    }
    setSuggestedBooks(candidates.slice(0, 3));
  }, [book.id]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (mostVisible) setPage(Number(mostVisible.target.dataset.page));
      },
      { root: viewer, threshold: [0.25, 0.5, 0.75] },
    );

    pageRefs.current.filter(Boolean).forEach((pageElement) => observer.observe(pageElement));
    return () => observer.disconnect();
  }, [book.id]);

  function goToPage(nextPage) {
    setPage(nextPage);
    pageRefs.current[nextPage - 1]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <main className="min-h-screen bg-cream px-[7.2%] pb-9 max-[640px]:px-[5%] max-[640px]:pb-[25px]">
      <header className="flex min-h-[76px] items-center justify-between border-b border-line max-[640px]:min-h-[65px]">
        <Link className="inline-flex items-center gap-2.5" href="/">
          <img className="h-[50px] w-[46px] object-contain mix-blend-multiply max-[640px]:h-11 max-[640px]:w-10" src={withBasePath("/ontomil-logo.png")} alt="" width="46" height="50" />
          <span className="flex flex-col leading-none"><strong className="font-serif text-xl font-semibold max-[640px]:text-lg">অন্ত্যমিল</strong><small className="mt-[5px] text-[11px]">প্রকাশনী</small></span>
        </Link>
        <Link className="inline-flex min-h-10 items-center rounded-sm border border-[#dcd7cb] bg-paper px-3 text-[13px] text-[#657067] transition hover:border-green hover:text-green max-[640px]:min-h-9 max-[640px]:px-2 max-[640px]:text-[11px]" href="/#books">← বইয়ের সংগ্রহে ফিরুন</Link>
      </header>

      <section className="px-4 pt-[34px] pb-[21px] text-center max-[640px]:px-0 max-[640px]:pt-[27px] max-[640px]:pb-[17px]">
        <span className="text-[11px] font-bold text-[#a45b40]">বইয়ের নমুনা পাঠ</span>
        <h1 className="mt-2 mb-0.5 font-serif text-[clamp(29px,4vw,40px)] font-semibold leading-[1.4]">{book.title}</h1>
        <p className="mb-0 text-sm text-muted">লেখক: {book.author}</p>
        <div className="mx-auto mt-[17px] flex w-fit max-w-full items-center gap-[9px] border border-[#e6ddc9] bg-[#faf6ea] px-[13px] py-2 text-left text-[#71664f] max-[640px]:px-[9px] max-[640px]:py-[7px]">
          <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-[#e9dfc8] font-serif text-xs font-bold" aria-hidden="true">i</span>
          <p className="mb-0 text-xs max-[640px]:text-[10px]">নিচের ৫টি পৃষ্ঠা নমুনা পাঠের জন্য। এগুলো মূল বইয়ের পৃষ্ঠা নয়।</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[760px]" aria-label="বই পড়ার অংশ">
        <div
          ref={viewerRef}
          className="max-h-[76vh] min-h-[440px] snap-y snap-mandatory space-y-4 overflow-y-auto overscroll-contain scroll-smooth pr-2 max-[640px]:max-h-[68vh] max-[640px]:min-h-[390px] max-[640px]:pr-1"
          aria-label="পাঁচ পৃষ্ঠার নমুনা বই ভিউয়ার; স্ক্রল করে পড়ুন"
          tabIndex={0}
        >
          {previewPages.map((content, index) => (
            <article
              className="animate-paper-arrive flex min-h-[620px] snap-start flex-col border border-[#e5dfd1] bg-[#fffdf8] px-12 pt-[25px] pb-[19px] shadow-[0_9px_28px_rgba(49,48,36,.1)] max-[640px]:min-h-[530px] max-[640px]:px-[19px] max-[640px]:pt-[17px] max-[640px]:pb-[14px]"
              data-page={index + 1}
              key={content.heading}
              ref={(element) => { pageRefs.current[index] = element; }}
            >
              <img
                className="animate-paper-text mx-auto block h-auto w-full max-w-[650px] shadow-[0_2px_12px_rgba(49,48,36,.08)]"
                src={withBasePath(`/book-pages/sample-page-${index + 1}.jpg`)}
                alt={`পৃষ্ঠা ${bengaliNumber(index + 1)} — ${content.heading}. ${content.paragraphs.join(" ")}`}
                width="900"
                height="1200"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </article>
          ))}
          <div
            className="flex min-h-[430px] snap-start flex-col items-center justify-center border border-[#e5dfd1] bg-[#fffdf8] px-8 py-10 text-center shadow-[0_9px_28px_rgba(49,48,36,.1)] max-[640px]:min-h-[390px] max-[640px]:px-4"
            data-page={previewPages.length + 1}
            ref={(element) => { pageRefs.current[previewPages.length] = element; }}
          >
            <span className="mb-[17px] grid size-[54px] place-items-center rounded-full bg-[#f1eee6] text-green"><LockIcon /></span>
            <span className="text-[11px] font-bold text-[#a45b40]">নমুনা পাঠ শেষ</span>
            <h2 className="mt-2 mb-[9px] font-serif text-[27px] font-semibold leading-[1.5] max-[640px]:text-[23px]">বাকি পাতাগুলো<br />লক করা আছে</h2>
            <p className="mb-[18px] text-[13px] text-muted">সম্পূর্ণ বইটি পেতে হোয়াটসঅ্যাপে অর্ডার করুন।</p>
            <button className="inline-flex min-h-[47px] items-center justify-center gap-[11px] rounded-sm bg-green px-[19px] text-[13px] font-semibold text-white transition hover:bg-[#243c30]" type="button" onClick={() => orderOnWhatsApp(book)}>
              <WhatsAppIcon /> বইটি অর্ডার করুন · {formatPrice(book.price)}
            </button>
          </div>
        </div>

        <div className="mt-[18px] flex items-center justify-between gap-3 max-[640px]:flex-wrap max-[640px]:justify-center">
          <button
            className="inline-flex min-h-[38px] items-center gap-[7px] border border-[#dcd7cb] bg-paper px-3 text-xs transition hover:border-green hover:text-green disabled:cursor-not-allowed disabled:opacity-40 max-[640px]:min-h-9 max-[640px]:text-[11px]"
            type="button"
            onClick={() => goToPage(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            ← আগের পৃষ্ঠা
          </button>
          <div className="flex items-center gap-[7px] max-[640px]:order-first max-[640px]:w-full max-[640px]:justify-center" aria-label={`পৃষ্ঠা ${bengaliNumber(page)}; ৫টি বিনামূল্যের পৃষ্ঠা`}>
            {previewPages.map((_, index) => (
              <button
                className={`grid size-[30px] place-items-center rounded-full border text-[11px] transition hover:-translate-y-0.5 ${page === index + 1 ? "border-green bg-green text-white" : page > index + 1 ? "border-[#9baa95] bg-paper text-green" : "border-[#ded9ce] bg-paper text-[#717469]"}`}
                key={index}
                type="button"
                onClick={() => goToPage(index + 1)}
                aria-label={`পৃষ্ঠা ${bengaliNumber(index + 1)} পড়ুন`}
              >
                {bengaliNumber(index + 1)}
              </button>
            ))}
            <button className={`grid size-[30px] place-items-center rounded-full border transition ${isLocked ? "border-[#c9825f] bg-[#f6e8df] text-[#a45b40]" : "border-[#ded9ce] text-[#858579] hover:border-green hover:text-green"}`} type="button" onClick={() => goToPage(previewPages.length + 1)} aria-label="লক করা পৃষ্ঠা দেখুন">
              <LockIcon />
            </button>
          </div>
          <button
            className="inline-flex min-h-[38px] items-center gap-[7px] border border-[#dcd7cb] bg-paper px-3 text-xs transition hover:border-green hover:text-green disabled:cursor-not-allowed disabled:opacity-40 max-[640px]:min-h-9 max-[640px]:text-[11px]"
            type="button"
            onClick={() => goToPage(Math.min(previewPages.length + 1, page + 1))}
            disabled={isLocked}
          >
            পরের পৃষ্ঠা →
            {page === previewPages.length && <span className="inline-flex"><LockIcon /></span>}
          </button>
        </div>
        <p className="mt-2 mb-0 text-center text-[11px] text-[#858579]">
          {isLocked
            ? "এই পৃষ্ঠাটি পড়তে সম্পূর্ণ বইটি অর্ডার করুন।"
            : `${bengaliNumber(page)} / ${bengaliNumber(previewPages.length)}টি বিনামূল্যের পৃষ্ঠা`}
        </p>
      </section>

      <section className="mx-auto mt-10 w-full max-w-[1000px]" aria-labelledby="suggested-books-heading">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#dfdacd] pb-3 max-[640px]:items-start">
          <div>
            <span className="text-[11px] font-bold text-[#a45b40]">আরও পড়ুন</span>
            <h2 className="mb-0 mt-1 font-serif text-xl font-semibold" id="suggested-books-heading">আপনার জন্য কিছু বই</h2>
          </div>
          <span className="text-[11px] text-muted">প্রতিবার আসলে নতুন বই দেখানো হয়</span>
        </div>
        <div className="grid grid-cols-3 gap-4 max-[640px]:grid-cols-1">
          {suggestedBooks.map((suggestedBook) => (
            <article className="flex items-center gap-3 border border-[#e5dfd1] bg-[#fffdf8] p-3" key={suggestedBook.id}>
              <Link className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-green" href={`/read/${suggestedBook.id}`} aria-label={`${suggestedBook.title} নমুনা পড়ুন`}>
                <img className="h-[92px] w-[66px] object-cover shadow-[2px_3px_8px_rgba(0,0,0,.15)]" src={withBasePath(suggestedBook.cover)} alt={`${suggestedBook.title} বইয়ের প্রচ্ছদ`} width="66" height="92" />
              </Link>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold text-[#a3684d]">{suggestedBook.category}</span>
                <h3 className="mb-1 mt-1 font-serif text-sm font-semibold leading-[1.5]">{suggestedBook.title}</h3>
                <p className="mb-2 text-[10px] text-muted">{suggestedBook.author}</p>
                <Link className="inline-flex min-h-8 items-center rounded-sm border border-[#dcd7cb] bg-paper px-2.5 text-[11px] transition hover:border-green hover:text-green" href={`/read/${suggestedBook.id}`}>নমুনা পড়ুন →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="mx-auto mt-[23px] flex w-full max-w-[1000px] items-center justify-between gap-[14px] border-t border-[#dfdacd] pt-4 max-[640px]:flex-col max-[640px]:items-stretch">
        <Link className="inline-flex min-h-10 w-fit items-center rounded-sm border border-[#dcd7cb] bg-paper px-3 text-xs text-[#657067] transition hover:border-green hover:text-green" href="/#books">← বইয়ের সংগ্রহে ফিরুন</Link>
        <button className="inline-flex min-h-10 items-center justify-center gap-2 rounded-sm bg-green px-4 text-xs font-semibold text-white transition hover:bg-[#243c30]" type="button" onClick={() => orderOnWhatsApp(book)}>
          <WhatsAppIcon /> সম্পূর্ণ বই অর্ডার করুন · {formatPrice(book.price)}
        </button>
      </footer>
    </main>
  );
}
