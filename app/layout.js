import "./globals.css";

export const metadata = {
  title: "অন্তমিল প্রকাশনী | বই থাকুক আপনজন",
  description:
    "অন্তমিল প্রকাশনীতে খুঁজে নিন আপনার পছন্দের বই। হোয়াটসঅ্যাপে সহজেই অর্ডার করুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
