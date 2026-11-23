import books from "../lib/books";
import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...books.map((book) => ({
      url: `${siteUrl}read/${book.id}/`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
