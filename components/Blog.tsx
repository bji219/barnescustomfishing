import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

interface SanityPost {
  _id: string;
  title: string;
  publishedAt: string;
  mainImage?: SanityImageSource;
  body?: PortableTextBlock[];
}

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  publishedAt,
  mainImage,
  body
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

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => (
      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={urlFor(value).width(900).url()}
          alt={(value as { alt?: string }).alt ?? ""}
          className="w-full rounded"
        />
      </figure>
    ),
    videoEmbed: ({ value }: { value: { url: string } }) => {
      // Convert a standard YouTube/Vimeo watch URL to an embed URL
      const embedUrl = value.url
        .replace("watch?v=", "embed/")
        .replace("youtu.be/", "www.youtube.com/embed/")
        .replace("vimeo.com/", "player.vimeo.com/video/");
      return (
        <div className="my-6 aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full rounded"
            allowFullScreen
            title="Embedded video"
          />
        </div>
      );
    },
  },
};

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
    <div className="max-w-3xl mx-auto space-y-16">
      {posts.map((post) => (
        <article
          key={post._id}
          className="border-b border-navy/10 pb-16 last:border-0 last:pb-0"
        >
          <time className="text-sm uppercase tracking-widest text-teal font-medium">
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="text-2xl md:text-3xl font-heading font-light text-navy mt-2 mb-6">
            {post.title}
          </h3>
          {post.mainImage && (
            <figure className="mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={urlFor(post.mainImage).width(900).url()}
                alt={post.title}
                className="w-full rounded"
              />
            </figure>
          )}
          {post.body && (
            <div className="prose prose-navy max-w-none text-navy/70 leading-relaxed [&_strong]:text-navy [&_p]:mb-4 [&_p:last-child]:mb-0">
              <PortableText
                value={post.body}
                components={portableTextComponents}
              />
            </div>
          )}
        </article>
      ))}
    </div>
  );
}
