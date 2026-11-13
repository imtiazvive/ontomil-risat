"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const books = [
  {
    id: 1,
    title: "নীরবতার শিল্প",
    author: "পিকো আইয়ার",
    category: "মন ও জীবন",
    price: 520,
    oldPrice: 650,
    label: "বেস্টসেলার",
    cover: "stillness",
    coverTitle: "নীরবতার\nশিল্প",
    coverAuthor: "পিকো আইয়ার",
  },
  {
    id: 2,
    title: "হাজারো ঝলমলে সূর্য",
    author: "খালেদ হোসেইনি",
    category: "উপন্যাস",
    price: 690,
    oldPrice: null,
    label: "পাঠকের পছন্দ",
    cover: "suns",
    coverTitle: "হাজারো\nঝলমলে সূর্য",
    coverAuthor: "খালেদ হোসেইনি",
  },
  {
    id: 3,
    title: "পথের পাঁচালী",
    author: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
    category: "বাংলা সাহিত্য",
    price: 380,
    oldPrice: null,
    label: "বাংলা ক্লাসিক",
    cover: "pather",
    coverTitle: "পথের\nপাঁচালী",
    coverAuthor: "বিভূতিভূষণ বন্দ্যোপাধ্যায়",
  },
  {
    id: 4,
    title: "মধ্যরাতের লাইব্রেরি",
    author: "ম্যাট হেইগ",
    category: "উপন্যাস",
    price: 590,
    oldPrice: 720,
    label: "আমাদের পছন্দ",
    cover: "midnight",
    coverTitle: "মধ্যরাতের\nলাইব্রেরি",
    coverAuthor: "ম্যাট হেইগ",
  },
  {
    id: 5,
    title: "ইকিগাই",
    author: "হেক্টর গার্সিয়া ও ফ্রান্সেস মিরালেস",
    category: "মন ও জীবন",
    price: 450,
    oldPrice: null,
    label: "নতুন দৃষ্টিভঙ্গি",
    cover: "ikigai",
    coverTitle: "ইকিগাই",
    coverAuthor: "দীর্ঘ ও সুখী জীবনের জাপানি রহস্য",
  },
  {
    id: 6,
    title: "চোখের বালি",
    author: "রবীন্দ্রনাথ ঠাকুর",
    category: "বাংলা সাহিত্য",
    price: 320,
    oldPrice: null,
    label: "বাংলা ক্লাসিক",
    cover: "bali",
    coverTitle: "চোখের\nবালি",
    coverAuthor: "রবীন্দ্রনাথ ঠাকুর",
  },
  {
    id: 7,
    title: "কফি ঠান্ডা হওয়ার আগে",
    author: "তোশিকাজু কাওয়াগুচি",
    category: "উপন্যাস",
    price: 560,
    oldPrice: 640,
    label: "এক বসায় পড়া যায়",
    cover: "coffee",
    coverTitle: "কফি ঠান্ডা\nহওয়ার আগে",
    coverAuthor: "তোশিকাজু কাওয়াগুচি",
  },
  {
    id: 8,
    title: "অ্যাটমিক হ্যাবিটস",
    author: "জেমস ক্লিয়ার",
    category: "মন ও জীবন",
    price: 620,
    oldPrice: null,
    label: "নিজেকে গড়ুন",
    cover: "habits",
    coverTitle: "অ্যাটমিক\nহ্যাবিটস",
    coverAuthor: "জেমস ক্লিয়ার",
  },
];

const categories = ["সব বই", "উপন্যাস", "বাংলা সাহিত্য", "মন ও জীবন"];

function formatPrice(price) {
  return `৳${price.toLocaleString("bn-BD")}`;
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

function BookCover({ book }) {
  return (
    <div className={`book-cover cover-${book.cover}`} aria-label={`${book.title} বইয়ের প্রচ্ছদ`}>
      <span className="cover-mark" aria-hidden="true">
        অ
      </span>
      <span className="cover-title">{book.coverTitle}</span>
      <span className="cover-rule" />
      <span className="cover-author">{book.coverAuthor}</span>
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
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
    if (!phone || phone.length < 8 || phone.length > 15) {
      window.alert(
        "অর্ডার চালু করতে .env.local ফাইলে NEXT_PUBLIC_WHATSAPP_NUMBER-এ বিক্রেতার হোয়াটসঅ্যাপ নম্বর যোগ করুন।",
      );
      return;
    }

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function orderBook(book) {
    orderOnWhatsApp(
      `আসসালামু আলাইকুম অন্তমিল প্রকাশনী,\n\nআমি এই বইটি অর্ডার করতে চাই:\n${book.title} — ${book.author}\nদাম: ${formatPrice(book.price)}\n\nবইটির প্রাপ্যতা ও ডেলিভারির তথ্য জানাবেন।`,
    );
  }

  function orderCart() {
    if (!cartItems.length) return;
    const lines = cartItems.map(
      (book) =>
        `• ${book.title} × ${formatNumber(cart[book.id])} — ${formatPrice(book.price * cart[book.id])}`,
    );
    orderOnWhatsApp(
      `আসসালামু আলাইকুম অন্তমিল প্রকাশনী,\n\nআমি নিচের বইগুলো অর্ডার করতে চাই:\n\n${lines.join("\n")}\n\nসর্বমোট: ${formatPrice(cartTotal)}\n\nবইগুলোর প্রাপ্যতা ও ডেলিভারির তথ্য জানাবেন।`,
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
    <main>
      <div className="announcement">
        <span>বই হোক নিত্যসঙ্গী</span>
        <span className="announcement-separator">✳</span>
        <span>হোয়াটসঅ্যাপে সহজে অর্ডার</span>
      </div>

      <header className="site-header">
        <a className="brand" href="#" aria-label="অন্তমিল প্রকাশনী — হোম">
          <span className="brand-seal">অ</span>
          <span className="brand-copy">
            <strong>অন্তমিল</strong>
            <small>প্রকাশনী</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="প্রধান নেভিগেশন">
          <a href="#books">বইসমূহ</a>
          <a href="#about">আমাদের কথা</a>
          <a href="#visit">যোগাযোগ</a>
        </nav>
        <div className="header-actions">
          <a className="header-whatsapp" href="#books">
            <WhatsAppIcon size={16} />
            <span>বই অর্ডার করুন</span>
          </a>
          <button
            className="cart-button"
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`ব্যাগ খুলুন, ${formatNumber(cartCount)}টি বই`}
          >
            <BagIcon />
            <span className="cart-count">{formatNumber(cartCount)}</span>
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span /> মনের মতো বইয়ের ছোট্ট ঠিকানা</span>
          <h1>যে গল্প<br />থেকে যায় <em>মনে।</em></h1>
          <p>
            এমন একটি বই খুঁজে নিন, যা পড়তে পড়তে সময়ের হিসাব ভুলে যাবেন।
          </p>
          <a className="button button-dark" href="#books">
            পছন্দের বই খুঁজুন <span aria-hidden="true">↗</span>
          </a>
          <div className="hero-note">
            <span className="note-star">✳</span>
            <span>যত্ন করে বাছাই।<br /><strong>আপনার জন্যই।</strong></span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="উষ্ণ আলোয় সাজানো শান্ত একটি পাঠাগার">
          <div className="hero-art-label">
            <span>বইয়ের পাতায়</span>
            <strong>হারিয়ে যাওয়ার<br />আনন্দই আলাদা।</strong>
          </div>
          <span className="hero-art-caption">আমাদের ছোট্ট জগৎ&nbsp; · &nbsp;ঢাকা</span>
          <span className="hero-art-stamp">ধীরে<br />পড়ুন</span>
        </div>
      </section>

      <section className="promise-strip" aria-label="আমাদের অঙ্গীকার">
        <div><span className="promise-icon">✿</span><span>বেছে নেওয়া বই</span></div>
        <div><span className="promise-icon">↗</span><span>হোয়াটসঅ্যাপে সহজ অর্ডার</span></div>
        <div><span className="promise-icon">♡</span><span>সব পাঠকের জন্য</span></div>
      </section>

      <section className="books-section" id="books">
        <div className="section-heading">
          <div>
            <span className="eyebrow">আমাদের বইয়ের সংগ্রহ</span>
            <h2>খুঁজে নিন <em>আপনার গল্প।</em></h2>
          </div>
          <p>ভালো গল্প ঠিক খুঁজে নেয় তার পাঠককে।<br />এবার খুঁজে নিই আপনার গল্প।</p>
        </div>

        <div className="catalog-controls">
          <div className="category-list" role="group" aria-label="বইয়ের ধরন বেছে নিন">
            {categories.map((category) => (
              <button
                className={`category-chip${activeCategory === category ? " active" : ""}`}
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <label className="search-box">
            <SearchIcon />
            <input
              type="search"
              placeholder="বই বা লেখকের নাম লিখুন"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="বই বা লেখক খুঁজুন"
            />
          </label>
        </div>

        {visibleBooks.length ? (
          <div className="book-grid">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.id}>
                <div className="book-art-wrap">
                  <Link className="preview-cover-link" href={`/read/${book.id}`} aria-label={`${book.title} নমুনা পড়ুন`}>
                    <BookCover book={book} />
                  </Link>
                  <span className="book-label">{book.label}</span>
                  <button
                    className="quick-add"
                    type="button"
                    onClick={() => changeQuantity(book.id, 1)}
                    aria-label={`ব্যাগে যোগ করুন: ${book.title}`}
                  >
                    +
                  </button>
                </div>
                <div className="book-details">
                  <span className="book-category">{book.category}</span>
                  <h3><Link href={`/read/${book.id}`}>{book.title}</Link></h3>
                  <p className="book-author">লেখক: {book.author}</p>
                  <Link className="preview-text-link" href={`/read/${book.id}`}>৫ পৃষ্ঠা নমুনা পড়ুন <span aria-hidden="true">↗</span></Link>
                  <div className="book-buy-row">
                    <div className="price">
                      <strong>{formatPrice(book.price)}</strong>
                      {book.oldPrice && <del>{formatPrice(book.oldPrice)}</del>}
                    </div>
                    <button className="order-link" type="button" onClick={() => orderBook(book)}>
                      অর্ডার <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <span>✳</span>
            <h3>এই নামে কোনো বই পাওয়া যায়নি।</h3>
            <p>অন্য নাম, লেখক বা বিভাগ দিয়ে খুঁজে দেখুন।</p>
            <button type="button" onClick={() => { setSearch(""); setActiveCategory("সব বই"); }}>
              সব বই দেখুন
            </button>
          </div>
        )}
      </section>

      <section className="story-section" id="about">
        <div className="story-art">
          <div className="story-art-note">
            <span>আমাদের বিশ্বাস</span>
            <strong>ঠিক সময়ে<br />ঠিক বইটি।</strong>
          </div>
          <span className="story-art-seal">অ</span>
        </div>
        <div className="story-copy">
          <span className="eyebrow">বইওয়ালার ছোট্ট কথা</span>
          <h2>শুধু বই নয়,<br /><em>নতুন এক জগৎ।</em></h2>
          <p>
            অন্তমিল প্রকাশনীর শুরু একটি সহজ বিশ্বাস থেকে: ভালো একটি বই ঠিক
            আপনার মনের দরজায় কড়া নাড়তে পারে। বাংলা ক্লাসিক থেকে বন্ধুর
            মুখে শোনা নতুন গল্প—আপনার পরের প্রিয় বইটি খুঁজে দিতে আমরা আছি।
          </p>
          <a className="text-link" href="#visit">কথা বলুন <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="contact-section" id="visit">
        <div>
          <span className="eyebrow">বই নিয়ে কিছু জানতে চান? আমরা আছি।</span>
          <h2>আপনার পরের অধ্যায়<br />শুরু হোক <em>আলাপে।</em></h2>
        </div>
        <button
          className="button button-light"
          type="button"
          onClick={() => orderOnWhatsApp("আসসালামু আলাইকুম অন্তমিল প্রকাশনী, আমার পরের পছন্দের বইটি খুঁজে পেতে একটু পরামর্শ চাই।")}
        >
          <WhatsAppIcon />
          হোয়াটসঅ্যাপে কথা বলুন
          <span aria-hidden="true">↗</span>
        </button>
        <span className="contact-doodle" aria-hidden="true">✳</span>
      </section>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#" aria-label="অন্তমিল প্রকাশনী — হোম">
          <span className="brand-seal">অ</span>
          <span className="brand-copy"><strong>অন্তমিল</strong><small>প্রকাশনী</small></span>
        </a>
        <span className="footer-note">বইয়ের প্রতি ভালোবাসায় তৈরি। © {formatNumber(new Date().getFullYear())}</span>
        <a className="footer-top" href="#">উপরে ফিরুন ↑</a>
      </footer>

      <button
        className="floating-whatsapp"
        type="button"
        onClick={() => orderOnWhatsApp("আসসালামু আলাইকুম অন্তমিল প্রকাশনী, আপনাদের বই সম্পর্কে আরও জানতে চাই।")}
        aria-label="হোয়াটসঅ্যাপে অন্তমিল প্রকাশনীর সঙ্গে কথা বলুন"
      >
        <WhatsAppIcon size={21} />
      </button>

      {cartOpen && (
        <div className="drawer-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setCartOpen(false);
        }}>
          <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
            <div className="drawer-heading">
              <div><span className="eyebrow">আপনার পছন্দের বই</span><h2 id="cart-title">আপনার ব্যাগ <span>({formatNumber(cartCount)})</span></h2></div>
              <button className="drawer-close" type="button" onClick={() => setCartOpen(false)} aria-label="ব্যাগ বন্ধ করুন">×</button>
            </div>
            {cartItems.length ? (
              <>
                <div className="cart-items">
                  {cartItems.map((book) => (
                    <div className="cart-item" key={book.id}>
                      <div className={`cart-cover cover-${book.cover}`} aria-hidden="true">অ</div>
                      <div className="cart-item-info">
                        <strong>{book.title}</strong><span>{formatPrice(book.price)}</span>
                        <div className="quantity-controls">
                          <button type="button" onClick={() => changeQuantity(book.id, -1)} aria-label={`${book.title} একটি কমান`}>−</button>
                          <span>{formatNumber(cart[book.id])}</span>
                          <button type="button" onClick={() => changeQuantity(book.id, 1)} aria-label={`${book.title} একটি বাড়ান`}>+</button>
                        </div>
                      </div>
                      <strong className="cart-line-total">{formatPrice(book.price * cart[book.id])}</strong>
                    </div>
                  ))}
                </div>
                <div className="cart-summary">
                  <div><span>সর্বমোট</span><strong>{formatPrice(cartTotal)}</strong></div>
                  <p>ডেলিভারির তথ্য হোয়াটসঅ্যাপে নিশ্চিত করা যাবে।</p>
                  <button className="button button-dark checkout-button" type="button" onClick={orderCart}>
                    <WhatsAppIcon /> হোয়াটসঅ্যাপে অর্ডার করুন <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <span>✳</span><h3>আপনার পরের প্রিয় বইটি অপেক্ষায়।</h3>
                <p>শুরু করতে পছন্দের বইটি ব্যাগে যোগ করুন।</p>
                <button className="button button-dark" type="button" onClick={() => { setCartOpen(false); document.getElementById("books")?.scrollIntoView({ behavior: "smooth" }); }}>
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
