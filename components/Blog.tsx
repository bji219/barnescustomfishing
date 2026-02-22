import Link from "next/link";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: SanityImageSource;
  excerpt?: string;
  body?: PortableTextBlock[];
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  excerpt,
  body[0..0]
}`;

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Extract a plain-text preview from the first body block when no excerpt exists. */
function bodyPreview(blocks?: PortableTextBlock[]): string {
  if (!blocks || blocks.length === 0) return "";
  const first = blocks[0] as { children?: { text?: string }[] };
  const text = (first.children ?? [])
    .map((span) => span.text ?? "")
    .join("");
  return text.length > 220 ? text.slice(0, 220).trimEnd() + "…" : text;
}

export default async function Blog() {
  let posts: SanityPost[] = [];
  try {
    posts = await client.fetch<SanityPost[]>(
      POSTS_QUERY,
      {},
      { next: { revalidate: 60 } }
    );
  } catch {
    // Sanity not yet configured or unreachable — show placeholder
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center text-navy/50 py-8">
        No posts yet — check back soon.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12">
      {posts.map((post) => {
        const slug = post.slug?.current;
        const preview = post.excerpt || bodyPreview(post.body);

        return (
          <article
            key={post._id}
            className="border-b border-navy/10 pb-12 last:border-0 last:pb-0"
          >
            <Link href={`/blog/${slug}`} className="group block">
              <time className="text-sm uppercase tracking-widest text-teal font-medium group-hover:text-teal/70 transition-colors">
                {formatDate(post.publishedAt)}
              </time>
              <h3 className="text-2xl md:text-3xl font-heading font-light text-navy mt-2 mb-4 group-hover:text-navy/70 transition-colors">
                {post.title}
              </h3>
            </Link>
            {post.mainImage && (
              <Link href={`/blog/${slug}`} className="block mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(post.mainImage).width(900).url()}
                  alt={post.title}
                  className="w-full rounded"
                />
              </Link>
            )}
            {preview && (
              <p className="text-navy/70 leading-relaxed mb-4">{preview}</p>
            )}
            <Link
              href={`/blog/${slug}`}
              className="inline-flex items-center gap-1 text-teal text-sm font-medium uppercase tracking-widest hover:gap-2 transition-all"
            >
              Read more <span aria-hidden>→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
