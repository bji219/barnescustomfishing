import { notFound } from "next/navigation";
import Link from "next/link";
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

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
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

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post: SanityPost | null = null;
  try {
    post = await client.fetch<SanityPost>(
      POST_QUERY,
      { slug },
      { next: { revalidate: 60 } }
    );
  } catch {
    // Sanity not configured
  }

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-white">
      <header className="py-6 px-4 border-b border-navy/10">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/#blog"
            className="text-teal text-sm uppercase tracking-widest font-medium hover:text-teal/70 transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <time className="text-sm uppercase tracking-widest text-teal font-medium">
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="text-3xl md:text-5xl font-heading font-light text-navy mt-2 mb-8">
          {post.title}
        </h1>
        {post.mainImage && (
          <figure className="mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(post.mainImage).width(1200).url()}
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
    </div>
  );
}
