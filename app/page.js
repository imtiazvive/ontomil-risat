"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getBookUrl, getWhatsAppUrl } from "../lib/whatsapp";
import { withBasePath } from "../lib/site";
import books from "../lib/books";

const categories = [
  "সব বই",
  "উপন্যাস",
  "বাংলা সাহিত্য",
  "শিশু-কিশোর",
  "মন ও জীবন",
  "মুক্তিযুদ্ধ",
];

function formatPrice(price) {
  return `৳${price.toLocaleString("bn-BD")}`;
}

function getDiscountPercent(price, oldPrice) {
  return Math.round(((oldPrice - price) / oldPrice) * 100).toLocaleString("bn-BD");
}

function formatNumber(number) {
  return number.toLocaleString("bn-BD");
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.52 3.48A11.83 11.83 0 0 0 12.1 0C5.55 0 .22 5.32.22 11.87c0 2.09.55 4.13 1.59 5.93L.12 24l6.36-1.67a11.9 11.9 0 0 0 5.61 1.43h.01c6.54 0 11.87-5.33 11.87-11.88 0-3.17-1.23-6.15-3.45-8.4ZM12.1 21.75a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.77.99 1.01-3.67-.24-.38a9.87 9.87 0 0 1-1.52-5.23c0-5.46 4.45-9.9 9.92-9.9a9.83 9.83 0 0 1 7.01 2.9 9.83 9.83 0 0 1 2.9 7.01c0 5.47-4.45 9.92-9.91 9.92Zm5.44-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.81-1.51-1.81-1.69-2.11-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.49-.5-.68-.51l-.58-.01c-.2 0-.53.07-.81.38s-1.06 1.04-1.06 2.52 1.08 2.92 1.23 3.12c.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16 16 4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" width="19" height="19" viewBox="0 0 24 24" fill="none">
      <path d="M5 8h14l1 13H4L5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BookSymbol() {
  return (
    <svg className="block size-[1em]" aria-hidden="true" viewBox="0 0 32 32" fill="none">
      <path d="M16 8.5c-3.1-2.2-7.3-2.7-12-1.6v17c4.7-1.1 8.9-.6 12 1.6m0-17c3.1-2.2 7.3-2.7 12-1.6v17c-4.7-1.1-8.9-.6-12 1.6m0-17v17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11.5c1.8-.2 3.4.1 4.8.8m-4.8 3c1.8-.2 3.4.1 4.8.8m10.4-4.6c-1.8-.2-3.4.1-4.8.8m4.8 3c-1.8-.2-3.4.1-4.8.8" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

function BookCover({ book }) {
  return (
    <div className="relative aspect-[.7] w-full overflow-hidden shadow-[5px_7px_12px_rgba(35,42,33,.19)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[8px_13px_18px_rgba(35,42,33,.2)]">
      <img className="h-full w-full object-contain" src={withBasePath(book.cover)} alt={`${book.title} বইয়ের প্রচ্ছদ`} />
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("সব বই");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const visibleBooks = useMemo(() => {
    const query = search.trim().toLowerCase();
    return books.filter((book) => {
      const matchesCategory =
        activeCategory === "সব বই" || book.category === activeCategory;
      const matchesSearch =
        !query ||
        `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartItems = books.filter((book) => cart[book.id]);
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, book) => sum + book.price * cart[book.id],
    0,
  );

  function orderOnWhatsApp(message) {
    const url = getWhatsAppUrl(message);
    if (!url) {
      window.alert(
        "হোয়াটসঅ্যাপ নম্বরটি সঠিকভাবে সেট করা নেই। অনুগ্রহ করে বিক্রেতার সঙ্গে যোগাযোগ করুন।",
      );
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function orderBook(book) {
    orderOnWhatsApp(
      `আসসালামু আলাইকুম অন্ত্যমিল প্রকাশনী,\n\nআমি এই বইটি অর্ডার করতে চাই:\n${book.title} — ${book.author}\nদাম: ${formatPrice(book.price)}\nবইটির পেজ: ${getBookUrl(book.id)}\n\nবইটির প্রাপ্যতা ও ডেলিভারির তথ্য জানাবেন।`,
    );
  }

  function orderCart() {
    if (!cartItems.length) return;
    const lines = cartItems.map(
      (book) =>
        `• ${book.title} × ${formatNumber(cart[book.id])} — ${formatPrice(book.price * cart[book.id])}\n  বইটির পেজ: ${getBookUrl(book.id)}`,
    );
    orderOnWhatsApp(
      `আসসালামু আলাইকুম অন্ত্যমিল প্রকাশনী,\n\nআমি নিচের বইগুলো অর্ডার করতে চাই:\n\n${lines.join("\n")}\n\nসর্বমোট: ${formatPrice(cartTotal)}\n\nবইগুলোর প্রাপ্যতা ও ডেলিভারির তথ্য জানাবেন।`,
    );
  }

  function submitPublishingProposal(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const authorName = formData.get("authorName");
    const phone = formData.get("phone");
    const bookTitle = formData.get("bookTitle");
    const category = formData.get("category");
    const manuscriptStatus = formData.get("manuscriptStatus");
    const summary = formData.get("summary");

    orderOnWhatsApp(
      `আসসালামু আলাইকুম অন্ত্যমিল প্রকাশনী,\n\nআমি লেখক হিসেবে বই প্রকাশের প্রস্তাব দিতে চাই।\n\nলেখকের নাম: ${authorName}\nযোগাযোগ নম্বর: ${phone}\nবইয়ের নাম: ${bookTitle}\nবইয়ের ধরন: ${category}\nপাণ্ডুলিপির অবস্থা: ${manuscriptStatus}${summary ? `\nবই সম্পর্কে: ${summary}` : ""}\n\nপাণ্ডুলিপি প্রস্তুত থাকলে এই মেসেজ পাঠানোর পর WhatsApp-এ ফাইল হিসেবে পাঠাব। প্রকাশনার পরবর্তী ধাপ সম্পর্কে জানাবেন।`,
    );
  }

  function changeQuantity(bookId, change) {
    setCart((current) => {
      const quantity = (current[bookId] || 0) + change;
      if (quantity <= 0) {
        const next = { ...current };
        delete next[bookId];
        return next;
      }
      return { ...current, [bookId]: quantity };
    });
  }

  return (
    <main className="min-h-screen">
      <div className="flex min-h-[34px] items-center justify-center gap-3 bg-green px-5 py-2 text-xs text-[#f9f6ec]">
        <span>লেখকের গল্প থেকে পাঠকের হাতে</span>
        <span className="text-[#e6a47f]">·</span>
        <span>বই প্রকাশে আপনার বিশ্বস্ত ঠিকানা</span>
      </div>

      <header className="sticky top-0 z-10 flex h-[82px] items-center justify-between border-b border-ink/10 bg-paper/95 px-[7.2%] backdrop-blur-xl max-[900px]:px-[5%] max-[640px]:h-[70px]">
        <a className="group inline-flex shrink-0 items-center gap-2.5" href="#" aria-label="অন্ত্যমিল প্রকাশনী — হোম">
          <img className="h-[54px] w-[49px] object-contain mix-blend-multiply transition duration-300 group-hover:scale-105 max-[640px]:h-12 max-[640px]:w-11" src={withBasePath("/ontomil-logo.png")} alt="" width="49" height="54" />
          <span className="flex flex-col leading-none">
            <strong className="font-serif text-[22px] font-semibold max-[640px]:text-[18px]">অন্ত্যমিল</strong>
            <small className="mt-[5px] text-[10px]">প্রকাশনী</small>
          </span>
        </a>
        <nav className="flex gap-[30px] text-sm text-[#526055] max-[1000px]:gap-4 max-[760px]:hidden" aria-label="প্রধান নেভিগেশন">
          <a className="transition-colors hover:text-orange" href="#books">বইসমূহ</a>
          <a className="transition-colors hover:text-orange" href="#publish">লেখকদের জন্য</a>
          <a className="transition-colors hover:text-orange" href="#about">আমাদের কথা</a>
          <a className="transition-colors hover:text-orange" href="#visit">যোগাযোগ</a>
        </nav>
        <div className="flex shrink-0 items-center gap-[18px] max-[640px]:gap-[9px]">
          <a className="flex items-center gap-[7px] text-[13px] font-semibold text-green max-[640px]:grid max-[640px]:size-[34px] max-[640px]:place-items-center max-[640px]:rounded-full max-[640px]:border max-[640px]:border-line" href="#books" aria-label="বইসমূহ দেখুন">
            <WhatsAppIcon size={16} />
            <span className="max-[640px]:hidden">বই অর্ডার করুন</span>
          </a>
          <button
            className="relative grid size-[38px] place-items-center border-0 bg-transparent"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`ব্যাগ খুলুন, ${formatNumber(cartCount)}টি বই`}
          >
            <BagIcon />
            <span className="absolute -top-0 -right-0 grid size-4 place-items-center rounded-full bg-orange text-[9px] text-white">{formatNumber(cartCount)}</span>
          </button>
        </div>
      </header>

      <section className="grid min-h-[570px] grid-cols-[.86fr_1.14fr] items-center gap-[6%] overflow-hidden px-[7.2%] py-[58px] max-[900px]:gap-[5%] max-[900px]:px-[5%] max-[760px]:grid-cols-1 max-[760px]:gap-[30px] max-[760px]:px-[8%] max-[640px]:gap-[30px] max-[640px]:px-[6%] max-[640px]:pt-11 max-[640px]:pb-[34px]">
        <div className="pl-[4.8%] pt-[15px] max-[900px]:pl-[1%] max-[760px]:pl-0 max-[640px]:p-0">
          <span className="animate-settle-in flex items-center gap-[9px] text-[11px] font-bold text-[#6a7968] [animation-delay:80ms]"><span className="size-1.5 rounded-full bg-orange" /> অন্ত্যমিল প্রকাশনী · লেখক ও পাঠকের পাশে</span>
          <h1 className="animate-settle-in mt-6 mb-4 font-serif text-[clamp(48px,5vw,72px)] font-medium leading-[1.35] [animation-delay:160ms] max-[640px]:mt-[18px] max-[640px]:text-[clamp(44px,11vw,62px)]">আপনার গল্প<br />পাঠকের <em className="text-orange not-italic">হাতে।</em></h1>
          <p className="animate-settle-in mb-[25px] max-w-[370px] text-[15px] leading-[1.8] text-muted [animation-delay:240ms] max-[640px]:text-xs">
            পছন্দের বই কিনুন, আর আপনার লেখা বই প্রকাশের প্রস্তাব দিন, দুটোই এখানে।
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a className="inline-flex min-h-[47px] items-center justify-center gap-[11px] rounded-sm bg-green px-[19px] text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#243c30]" href="#books">
              পছন্দের বই কিনুন <span aria-hidden="true">↗</span>
            </a>
            <a className="inline-flex min-h-[47px] items-center justify-center gap-[9px] rounded-sm border border-green/25 px-4 text-[13px] font-semibold text-green transition hover:-translate-y-0.5 hover:border-green hover:bg-[#f4f0e7]" href="#publish">
              লেখক হিসেবে প্রকাশ করুন <BookSymbol />
            </a>
          </div>
        </div>
        <div className="hero-image animate-settle-in relative min-h-[405px] overflow-hidden rounded-[48%_48%_4px_4px/8%_8%_4px_4px] shadow-[0_18px_45px_rgba(34,47,37,.13)] after:absolute after:inset-0 after:border after:border-white/25 after:content-[''] max-[900px]:min-h-[360px] max-[640px]:min-h-[310px] max-[640px]:rounded-[46%_46%_3px_3px/8%_8%_3px_3px]">
          <span className="absolute top-[13%] right-[12%] z-[2] rotate-[7deg] font-serif text-[17px] leading-[1.4] text-[#fff4dc] [text-shadow:0_2px_14px_rgba(0,0,0,.35)] max-[640px]:top-[12%] max-[640px]:right-[10%] max-[640px]:text-sm">পাতা ওল্টান,<br />মন খুলে যাবে</span>
          <div className="absolute top-[34%] left-[12%] flex flex-col text-[#fffaf0] [text-shadow:0_2px_15px_rgba(0,0,0,.2)]">
            <span className="mb-[9px] text-[11px]">বইয়ের পাতায়</span>
            <strong className="font-serif text-4xl font-medium leading-[1.35] max-[640px]:text-[30px]">হারিয়ে যাওয়ার<br />আনন্দই আলাদা।</strong>
          </div>
          <span className="absolute bottom-5 left-[10%] text-[11px] text-[#fffaf0]">আমাদের ছোট্ট জগৎ&nbsp; · &nbsp;ঢাকা</span>
          <span className="animate-stamp-in absolute right-6 bottom-[22px] grid size-[65px] rotate-[12deg] place-content-center rounded-full border border-white/80 text-center text-[10px] leading-[1.7] text-white">ধীরে<br />পড়ুন</span>
        </div>
      </section>

      <section className="flex min-h-[82px] items-center justify-around border-y border-line bg-[#f6f3ec] px-[10%] py-5 max-[640px]:min-h-0 max-[640px]:flex-wrap max-[640px]:justify-center max-[640px]:gap-5 max-[640px]:px-[5%]" aria-label="আমাদের অঙ্গীকার">
        <div className="flex items-center gap-2.5 text-xs text-[#566357] max-[640px]:gap-1.5"><span className="text-[17px] text-orange"><BookSymbol /></span><span>লেখকের পাণ্ডুলিপি</span></div>
        <div className="flex items-center gap-2.5 text-xs text-[#566357] max-[640px]:gap-1.5"><span className="text-[17px] text-orange">↗</span><span>প্রকাশনা ও বইয়ের অর্ডার</span></div>
        <div className="flex items-center gap-2.5 text-xs text-[#566357] max-[640px]:hidden"><span className="text-[17px] text-orange">♡</span><span>লেখক ও পাঠকের জন্য</span></div>
      </section>

      <section className="bg-[#f3f0e8] px-[9.5%] py-[88px] max-[900px]:px-[6%] max-[640px]:px-[5%] max-[640px]:py-[62px]" id="publish">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[.9fr_1.1fr] items-center gap-[8%] max-[900px]:gap-[5%] max-[760px]:grid-cols-1 max-[760px]:gap-8">
          <div>
            <span className="text-[11px] font-bold text-[#a45b40]">লেখকদের জন্য · বই প্রকাশের প্রস্তাব</span>
            <h2 className="mt-3 mb-4 font-serif text-[clamp(36px,3.8vw,52px)] font-medium leading-[1.4] max-[640px]:text-[38px]">আপনার লেখা<br />বই হয়ে <em className="text-orange not-italic">উঠুক।</em></h2>
            <p className="mb-7 max-w-[460px] text-[13px] leading-[1.9] text-[#6e7469]">
              নতুন বা অভিজ্ঞ—সব লেখকই তাঁদের বই প্রকাশের প্রস্তাব পাঠাতে পারেন।
              বইয়ের প্রাথমিক তথ্য দিন; পাণ্ডুলিপি প্রস্তুত থাকলে WhatsApp-এ
              মেসেজ পাঠানোর পর ফাইল হিসেবে যুক্ত করুন।
            </p>
            <div className="mb-7 grid gap-3">
              <div className="flex items-start gap-3 rounded-lg border border-[#e4ddcf] bg-[#fcfaf5] p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f2e4d8] font-serif text-sm text-[#a45b40]">১</span>
                <span><strong className="block text-[13px]">বইয়ের প্রস্তাব পাঠান</strong><span className="mt-1 block text-[11px] leading-[1.7] text-muted">লেখক, বই ও পাণ্ডুলিপির অবস্থা সম্পর্কে জানান।</span></span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#e4ddcf] bg-[#fcfaf5] p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f2e4d8] font-serif text-sm text-[#a45b40]">২</span>
                <span><strong className="block text-[13px]">প্রকাশনা টিমের সঙ্গে কথা বলুন</strong><span className="mt-1 block text-[11px] leading-[1.7] text-muted">পাণ্ডুলিপি ও প্রকাশনার সম্ভাব্য ধাপ নিয়ে আলোচনা করুন।</span></span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#e4ddcf] bg-[#fcfaf5] p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f2e4d8] font-serif text-sm text-[#a45b40]">৩</span>
                <span><strong className="block text-[13px]">পরবর্তী পরিকল্পনা ঠিক করুন</strong><span className="mt-1 block text-[11px] leading-[1.7] text-muted">প্রস্তাব পর্যালোচনার পর বিস্তারিত ও শর্তাবলি নিয়ে কথা হবে।</span></span>
              </div>
            </div>
            <p className="mb-0 text-[11px] leading-[1.8] text-muted">প্রস্তাব পাঠালেই প্রকাশনা নিশ্চিত হয় না; পাণ্ডুলিপি পর্যালোচনা করে পরবর্তী সিদ্ধান্ত জানানো হবে।</p>
          </div>

          <form className="rounded-xl border border-line bg-[#fcfaf5] p-7 shadow-[0_14px_40px_rgba(55,53,38,.07)] max-[640px]:p-5" onSubmit={submitPublishingProposal}>
            <div className="mb-5">
              <span className="text-[10px] font-bold text-[#a45b40]">প্রাথমিক তথ্য</span>
              <h3 className="mt-1 mb-0 font-serif text-[25px] font-medium">বই প্রকাশের প্রস্তাব</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
              <label className="grid gap-1.5 text-[11px] font-semibold text-[#566357]">
                লেখকের নাম
                <input className="min-h-11 w-full rounded-md border border-line bg-white px-3 text-[13px] font-normal text-ink outline-none transition focus:border-green" name="authorName" autoComplete="name" required />
              </label>
              <label className="grid gap-1.5 text-[11px] font-semibold text-[#566357]">
                যোগাযোগ নম্বর
                <input className="min-h-11 w-full rounded-md border border-line bg-white px-3 text-[13px] font-normal text-ink outline-none transition focus:border-green" name="phone" type="tel" autoComplete="tel" required />
              </label>
              <label className="grid gap-1.5 text-[11px] font-semibold text-[#566357]">
                বইয়ের নাম
                <input className="min-h-11 w-full rounded-md border border-line bg-white px-3 text-[13px] font-normal text-ink outline-none transition focus:border-green" name="bookTitle" required />
              </label>
              <label className="grid gap-1.5 text-[11px] font-semibold text-[#566357]">
                আপনার বইয়ের ধরন
                <select className="min-h-11 w-full rounded-md border border-line bg-white px-3 text-[13px] font-normal text-ink outline-none transition focus:border-green" name="category" defaultValue="" required>
                  <option value="" disabled>ধরন বেছে নিন</option>
                  <option>উপন্যাস</option>
                  <option>গল্প</option>
                  <option>কবিতা</option>
                  <option>শিশু-কিশোর</option>
                  <option>প্রবন্ধ / গবেষণা</option>
                  <option>অন্যান্য</option>
                </select>
              </label>
              <label className="col-span-2 grid gap-1.5 text-[11px] font-semibold text-[#566357] max-[520px]:col-span-1">
                পাণ্ডুলিপির অবস্থা
                <select className="min-h-11 w-full rounded-md border border-line bg-white px-3 text-[13px] font-normal text-ink outline-none transition focus:border-green" name="manuscriptStatus" defaultValue="" required>
                  <option value="" disabled>অবস্থা বেছে নিন</option>
                  <option>পাণ্ডুলিপি সম্পূর্ণ</option>
                  <option>লেখা চলছে</option>
                  <option>প্রকাশনার জন্য প্রস্তুত</option>
                </select>
              </label>
              <label className="col-span-2 grid gap-1.5 text-[11px] font-semibold text-[#566357] max-[520px]:col-span-1">
                বইটি সম্পর্কে দু-একটি কথা <span className="font-normal text-muted">(ঐচ্ছিক)</span>
                <textarea className="min-h-[92px] w-full resize-y rounded-md border border-line bg-white px-3 py-2.5 text-[13px] font-normal leading-[1.7] text-ink outline-none transition focus:border-green" name="summary" maxLength={700} placeholder="বইটির বিষয় বা পাঠক সম্পর্কে সংক্ষেপে লিখুন" />
              </label>
            </div>
            <button className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-md bg-green px-5 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#243c30]" type="submit">
              <WhatsAppIcon /> WhatsApp-এ প্রকাশনার প্রস্তাব পাঠান <span aria-hidden="true">↗</span>
            </button>
            <p className="mt-3 mb-0 text-center text-[10px] leading-[1.7] text-muted">এই ফর্মে পাণ্ডুলিপি আপলোড হয় না। WhatsApp খুললে ফাইলটি আলাদাভাবে পাঠাতে পারবেন।</p>
          </form>
        </div>
      </section>

      <section className="px-[9.5%] pt-[92px] pb-[104px] max-[900px]:px-[6%] max-[640px]:px-[5%] max-[640px]:pt-[66px] max-[640px]:pb-[72px]" id="books">
        <div className="mb-[34px] flex items-end justify-between max-[640px]:mb-6 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-3">
          <div>
            <span className="text-[11px] font-bold text-[#a45b40]">আমাদের বইয়ের সংগ্রহ</span>
            <h2 className="mt-3 font-serif text-[clamp(35px,3.4vw,47px)] font-medium leading-[1.35] max-[640px]:text-[37px]">খুঁজে নিন <em className="text-orange not-italic">আপনার গল্প।</em></h2>
          </div>
          <p className="mb-1 mr-[1%] text-[13px] leading-[1.8] text-muted max-[640px]:[&_br]:hidden">ভালো গল্প ঠিক খুঁজে নেয় তার পাঠককে।<br />এবার খুঁজে নিই আপনার গল্প।</p>
        </div>

        <div className="mb-[27px] flex items-center justify-between gap-5 max-[640px]:flex-col max-[640px]:items-stretch max-[640px]:gap-[13px]">
          <div className="flex flex-wrap gap-2 max-[640px]:gap-1.5" role="group" aria-label="বইয়ের ধরন বেছে নিন">
            {categories.map((category) => (
              <button
                className={`rounded-full border px-[14px] py-[9px] text-xs transition-all hover:border-green hover:bg-green hover:text-white max-[640px]:px-[11px] max-[640px]:py-2 max-[640px]:text-[9px] ${activeCategory === category ? "border-green bg-green text-white" : "border-line bg-transparent text-[#657067]"}`}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="flex h-[37px] w-[224px] items-center gap-2 border border-line px-2.5 text-[#829083] focus-within:border-green max-[640px]:h-10 max-[640px]:w-full">
            <SearchIcon />
            <input
              className="w-full border-0 bg-transparent p-0 text-xs text-ink outline-none placeholder:text-[#93958c]"
              type="search"
              placeholder="বই বা লেখকের নাম লিখুন"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="বই বা লেখক খুঁজুন"
            />
          </label>
        </div>

        {visibleBooks.length ? (
          <div className="grid grid-cols-4 gap-x-[22px] gap-y-9 max-[900px]:grid-cols-3 max-[640px]:grid-cols-2 max-[640px]:gap-x-[13px] max-[640px]:gap-y-[26px]">
            {visibleBooks.map((book, index) => (
              <article className="group min-w-0 animate-settle-in rounded-[3px_3px_38px_3px] bg-white/40 p-2 pb-3.5 shadow-[0_2px_9px_rgba(55,53,38,.025)] transition duration-300 hover:-translate-y-1 hover:rotate-[-.25deg] hover:bg-[#fffdf8] hover:shadow-[0_12px_26px_rgba(55,53,38,.09)] max-[640px]:p-[5px] max-[640px]:pb-[11px]" key={book.id} style={{ animationDelay: `${index * 65}ms` }}>
                <div className={`relative overflow-hidden bg-[#f0ede5] p-3 pt-3 max-[640px]:px-[11px] max-[640px]:pt-[9px] ${index % 4 === 1 ? "bg-[#eee9df]" : index % 4 === 2 ? "bg-[#f1e9e1]" : index % 4 === 3 ? "bg-[#ecece3]" : ""}`}>
                  <Link className="block" href={`/read/${book.id}`} aria-label={`${book.title} নমুনা পড়ুন`}>
                    <BookCover book={book} />
                  </Link>
                  <span className="absolute top-[21px] left-2 rounded-full bg-[#d94a42] px-2 py-1.5 text-[10px] font-semibold text-white shadow-sm max-[640px]:top-4 max-[640px]:left-[5px] max-[640px]:px-1.5 max-[640px]:py-[5px] max-[640px]:text-[9px]">{getDiscountPercent(book.price, book.oldPrice)}% ছাড়</span>
                  <button
                    className="absolute right-2 bottom-2 grid size-[31px] place-items-center rounded-full bg-paper text-xl text-green shadow-md transition hover:rotate-90 hover:bg-green hover:text-white max-[640px]:right-1.5 max-[640px]:bottom-1.5 max-[640px]:size-7"
                    type="button"
                    onClick={() => changeQuantity(book.id, 1)}
                    aria-label={`ব্যাগে যোগ করুন: ${book.title}`}
                  >
                    +
                  </button>
                </div>
                <div className="pt-[13px]">
                  <span className="text-[10px] font-semibold text-[#a3684d]">{book.category}</span>
                  <h3 className="mt-1.5 mb-1 font-serif text-[15px] font-semibold leading-[1.5] max-[640px]:text-sm"><Link className="hover:text-orange" href={`/read/${book.id}`}>{book.title}</Link></h3>
                  <p className="mb-[11px] min-h-[15px] text-[11px] text-muted max-[640px]:min-h-[26px] max-[640px]:text-[10px] max-[640px]:leading-[1.4]">লেখক: {book.author}</p>
                  <Link className="mb-[11px] mt-[-4px] inline-flex items-center gap-[5px] text-[11px] text-[#647261] hover:text-orange max-[640px]:mt-[-5px] max-[640px]:text-[10px]" href={`/read/${book.id}`}>৫ পৃষ্ঠা নমুনা পড়ুন <span className="text-orange" aria-hidden="true">↗</span></Link>
                  <div className="flex items-center justify-between max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-2">
                    <div className="flex items-center gap-[7px]">
                      <strong className="text-[13px]">{formatPrice(book.price)}</strong>
                      {book.oldPrice && <del className="text-[11px] text-[#9c9b91]">{formatPrice(book.oldPrice)}</del>}
                    </div>
                    <button className="border-0 bg-transparent text-xs font-semibold text-green" type="button" onClick={() => orderBook(book)}>
                      অর্ডার <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-5 py-[70px] text-center">
            <span className="mx-auto block w-8 text-3xl text-orange"><BookSymbol /></span>
            <h3 className="mt-3 mb-1 font-serif text-2xl">এই নামে কোনো বই পাওয়া যায়নি।</h3>
            <p className="text-xs text-muted">অন্য নাম, লেখক বা বিভাগ দিয়ে খুঁজে দেখুন।</p>
            <button className="border-0 border-b border-green bg-transparent text-[11px]" type="button" onClick={() => { setSearch(""); setActiveCategory("সব বই"); }}>
              সব বই দেখুন
            </button>
          </div>
        )}
      </section>

      <section className="relative grid grid-cols-2 items-center gap-[10%] bg-[#f1eee6] px-[11%] pt-[88px] pb-[94px] max-[900px]:gap-[7%] max-[900px]:px-[8%] max-[640px]:grid-cols-1 max-[640px]:gap-8 max-[640px]:px-[6%] max-[640px]:pt-[70px] max-[640px]:pb-[62px]" id="about">
        <span className="absolute top-[26px] right-[7%] rotate-1 font-serif text-[13px] text-[#b98569]">আমাদের গল্প</span>
        <div className="story-image relative min-h-[340px] rounded-[4px_44%_4px_4px] shadow-[12px_14px_0_#e5dfd3] transition hover:-translate-y-1 max-[640px]:min-h-[280px]">
          <div className="absolute bottom-[25px] left-[25px] text-white">
            <span className="mb-2 block text-[11px]">আমাদের বিশ্বাস</span>
            <strong className="font-serif text-2xl font-medium leading-[1.4]">ঠিক সময়ে<br />ঠিক বইটি।</strong>
          </div>
          <span className="absolute top-[17px] right-[18px] grid size-[42px] place-items-center rounded-full border border-white/75 font-serif text-[22px] text-white">অ</span>
        </div>
        <div>
          <span className="text-[11px] font-bold text-[#a45b40]">প্রকাশক ও পাঠকের পাশে</span>
          <h2 className="mt-3 mb-[17px] font-serif text-[clamp(34px,3.1vw,43px)] font-medium leading-[1.35] max-[640px]:text-[38px]">লেখার যত্ন,<br /><em className="text-orange not-italic">পাঠকের ভালোবাসা।</em></h2>
          <p className="mb-5 max-w-[430px] text-[13px] leading-[1.9] text-[#6e7469]">
            অন্ত্যমিল প্রকাশনী লেখকের নতুন পাণ্ডুলিপি প্রকাশের প্রস্তাব গ্রহণ করে,
            আর পাঠকদের জন্য সাজায় বেছে নেওয়া বইয়ের সংগ্রহ। লেখক হিসেবে
            প্রস্তাব পাঠান, অথবা আপনার পরের প্রিয় বইটি খুঁজে নিন।
          </p>
          <div className="flex flex-wrap gap-5">
            <a className="border-b border-[#6d7f6f] pb-1 text-xs font-semibold" href="#publish">প্রকাশনার প্রস্তাব দিন <span className="pl-2 text-orange" aria-hidden="true">↗</span></a>
            <a className="border-b border-[#6d7f6f] pb-1 text-xs font-semibold" href="#books">বইয়ের সংগ্রহ দেখুন <span className="pl-2 text-orange" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[290px] items-center justify-between overflow-hidden bg-green px-[13%] py-[63px] text-[#fbf8ee] before:absolute before:inset-[14px] before:border before:border-white/10 before:content-[''] max-[640px]:min-h-[300px] max-[640px]:flex-col max-[640px]:items-start max-[640px]:justify-center max-[640px]:gap-6 max-[640px]:px-[7%] max-[640px]:py-[50px]" id="visit">
        <div>
          <span className="text-[11px] font-bold text-[#d7b79a]">লেখক হোন বা পাঠক—আমরা কথা বলতে প্রস্তুত।</span>
          <h2 className="mt-[14px] font-serif text-[clamp(37px,3.7vw,50px)] font-medium leading-[1.35] max-[640px]:text-[41px]">আপনার পরের অধ্যায়<br />শুরু হোক <em className="text-[#e2a27d] not-italic">আলাপে।</em></h2>
        </div>
        <button
          className="relative z-[1] inline-flex min-h-[47px] items-center justify-center gap-[11px] rounded-sm bg-[#f5f0e5] px-[19px] text-[13px] font-semibold text-green transition hover:-translate-y-0.5 hover:bg-white"
          type="button"
          onClick={() => orderOnWhatsApp("আসসালামু আলাইকুম অন্ত্যমিল প্রকাশনী, আমার পরের পছন্দের বইটি খুঁজে পেতে একটু পরামর্শ চাই।")}
        >
          <WhatsAppIcon />
          হোয়াটসঅ্যাপে কথা বলুন
          <span aria-hidden="true">↗</span>
        </button>
        <span className="pointer-events-none absolute right-[4%] bottom-[-90px] text-[280px] leading-none text-white/[.07] max-[640px]:right-[-30px] max-[640px]:bottom-[-85px] max-[640px]:text-[210px]"><BookSymbol /></span>
      </section>

      <footer className="border-t border-line bg-[#f6f3ec]">
        <div className="mx-auto grid max-w-[1180px] grid-cols-[1.2fr_.8fr_auto] items-center gap-10 px-[7.2%] py-9 max-[900px]:gap-6 max-[760px]:grid-cols-2 max-[760px]:gap-x-5 max-[760px]:gap-y-7 max-[640px]:px-[6%] max-[640px]:py-7">
          <div className="flex items-center gap-3 max-[760px]:col-span-2">
            <a className="inline-flex shrink-0 items-center gap-2.5" href="#" aria-label="অন্ত্যমিল প্রকাশনী — হোম">
              <img className="h-[58px] w-[53px] object-contain mix-blend-multiply" src={withBasePath("/ontomil-logo.png")} alt="" width="53" height="58" />
              <span className="flex flex-col leading-none"><strong className="font-serif text-xl font-semibold">অন্ত্যমিল</strong><small className="mt-[5px] text-[10px]">প্রকাশনী</small></span>
            </a>
            <p className="mb-0 max-w-[175px] border-l border-[#ded7ca] pl-3 text-[11px] leading-[1.7] text-[#77766d] max-[640px]:max-w-[150px] max-[640px]:text-[10px]">বইয়ের পাতায় খুঁজে নিন আপনার পরের গল্প।</p>
          </div>
          <nav className="flex flex-col items-start gap-2.5 text-xs text-[#626c61] max-[760px]:col-start-1 max-[760px]:row-start-2" aria-label="ফুটার নেভিগেশন">
            <a className="transition-colors hover:text-orange" href="#books">বইয়ের সংগ্রহ</a>
            <a className="transition-colors hover:text-orange" href="#publish">লেখকদের জন্য</a>
            <a className="transition-colors hover:text-orange" href="#about">আমাদের কথা</a>
            <a className="transition-colors hover:text-orange" href="#visit">যোগাযোগ</a>
          </nav>
          <div className="flex flex-col items-start gap-2 max-[760px]:col-start-2 max-[760px]:row-start-2 max-[760px]:justify-self-end">
            <span className="text-[10px] text-[#858579]">Developed with care by</span>
            <a
              className="group flex min-h-12 min-w-[158px] items-center justify-between gap-2 rounded-lg border border-line bg-[#fffdf8] px-3 py-1.5 text-[#77766d] shadow-[0_3px_10px_rgba(55,53,38,.045)] transition hover:-translate-y-0.5 hover:border-[#c9b8a4] hover:shadow-[0_7px_17px_rgba(55,53,38,.1)] max-[640px]:min-w-[142px] max-[640px]:px-2.5"
              href="https://codervive.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CoderVive-এর ওয়েবসাইট নতুন ট্যাবে খুলুন"
            >
              <img className="h-9 w-[116px] object-contain max-[640px]:h-[33px] max-[640px]:w-[106px]" src={withBasePath("/codervive-logo.svg")} alt="CoderVive" width="116" height="36" />
              <span className="text-sm text-[#8d907f] transition group-hover:translate-x-0.5 group-hover:text-orange" aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="col-span-3 flex items-center justify-between border-t border-[#e5ded2] pt-4 text-[10px] text-[#858579] max-[760px]:col-span-2 max-[760px]:row-start-3 max-[640px]:text-[9px]">
            <span>বইয়ের প্রতি ভালোবাসায় তৈরি। © {formatNumber(new Date().getFullYear())}</span>
            <a className="transition-colors hover:text-orange" href="#">উপরে ফিরুন ↑</a>
          </div>
        </div>
      </footer>

      <button
        className="animate-float-soft fixed right-[23px] bottom-[22px] z-[5] grid size-[47px] place-items-center rounded-full border-0 bg-[#258b5b] text-white shadow-[0_5px_18px_rgba(29,57,38,.24)] transition hover:-translate-y-[3px] max-[640px]:right-[15px] max-[640px]:bottom-[15px] max-[640px]:size-11"
        type="button"
        onClick={() => orderOnWhatsApp("আসসালামু আলাইকুম অন্ত্যমিল প্রকাশনী, আপনাদের বই সম্পর্কে আরও জানতে চাই।")}
        aria-label="হোয়াটসঅ্যাপে অন্ত্যমিল প্রকাশনীর সঙ্গে কথা বলুন"
      >
        <WhatsAppIcon size={21} />
      </button>

      {cartOpen && (
        <div className="animate-fade-in fixed inset-0 z-10 flex justify-end bg-[rgba(22,31,25,.45)]" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCartOpen(false);
        }}>
          <aside className="animate-slide-in flex h-full w-[min(460px,100%)] flex-col bg-paper p-[30px] shadow-[-10px_0_35px_rgba(0,0,0,.1)] max-[640px]:px-5 max-[640px]:py-[23px]" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="flex items-start justify-between border-b border-line pb-[22px]">
              <div><span className="text-[11px] font-bold text-[#a45b40]">আপনার পছন্দের বই</span><h2 id="cart-title" className="mt-[7px] font-serif text-[29px] font-medium">আপনার ব্যাগ <span className="font-sans text-[15px] text-[#87877c]">({formatNumber(cartCount)})</span></h2></div>
              <button className="grid size-9 place-items-center rounded-full border border-line bg-transparent text-[23px]" type="button" onClick={() => setCartOpen(false)} aria-label="ব্যাগ বন্ধ করুন">×</button>
            </div>
            {cartItems.length ? (
              <>
                <div className="flex-1 overflow-y-auto">
                  {cartItems.map((book) => (
                    <div className="flex items-center gap-[13px] border-b border-line py-[17px]" key={book.id}>
                      <img className="h-[72px] w-[54px] shrink-0 rounded-sm object-cover shadow-[2px_3px_6px_rgba(0,0,0,.12)]" src={withBasePath(book.cover)} alt="" />
                      <div className="flex flex-1 flex-col gap-[5px]">
                        <strong className="font-serif text-[13px]">{book.title}</strong><span className="text-xs">{formatPrice(book.price)}</span>
                        <div className="mt-1 flex w-max items-center border border-line">
                          <button className="h-6 w-[26px] border-0 bg-transparent" type="button" onClick={() => changeQuantity(book.id, -1)} aria-label={`${book.title} একটি কমান`}>−</button>
                          <span className="min-w-[21px] text-center text-[10px]">{formatNumber(cart[book.id])}</span>
                          <button className="h-6 w-[26px] border-0 bg-transparent" type="button" onClick={() => changeQuantity(book.id, 1)} aria-label={`${book.title} একটি বাড়ান`}>+</button>
                        </div>
                      </div>
                      <strong className="self-start text-xs">{formatPrice(book.price * cart[book.id])}</strong>
                    </div>
                  ))}
                </div>
                <div className="border-t border-line pt-[18px]">
                  <div className="flex justify-between text-[15px]"><span>সর্বমোট</span><strong>{formatPrice(cartTotal)}</strong></div>
                  <p className="mt-[9px] mb-[17px] text-xs text-muted">ডেলিভারির তথ্য হোয়াটসঅ্যাপে নিশ্চিত করা যাবে।</p>
                  <button className="inline-flex min-h-[47px] w-full items-center justify-center gap-[11px] rounded-sm bg-green px-[19px] text-[13px] font-semibold text-white transition hover:bg-[#243c30]" type="button" onClick={orderCart}>
                    <WhatsAppIcon /> হোয়াটসঅ্যাপে অর্ডার করুন <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="my-auto text-center">
                <span className="mx-auto block w-[34px] text-[34px] text-orange"><BookSymbol /></span><h3 className="mt-[15px] mb-[7px] font-serif text-[23px]">আপনার পরের প্রিয় বইটি অপেক্ষায়।</h3>
                <p className="mb-[18px] text-xs text-muted">শুরু করতে পছন্দের বইটি ব্যাগে যোগ করুন।</p>
                <button className="inline-flex min-h-[47px] items-center justify-center gap-[11px] rounded-sm bg-green px-[19px] text-[13px] font-semibold text-white" type="button" onClick={() => { setCartOpen(false); document.getElementById("books")?.scrollIntoView({ behavior: "smooth" }); }}>
                  বইয়ের সংগ্রহ দেখুন
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
