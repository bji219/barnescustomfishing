"use client";

import ReactMarkdown from "react-markdown";

// ---------------------------------------------------------------------------
// Blog post data
// ---------------------------------------------------------------------------
// TODO: Replace this static array with a fetch from your chosen blog service
// (e.g. a headless CMS, Ghost, Buttondown, or a custom API endpoint).
// Each post needs: title, date (ISO string), and body (markdown string).
// ---------------------------------------------------------------------------

interface BlogPost {
  id: string;
  title: string;
  date: string;
  body: string;
}

const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "First Build of the Season",
    date: "2026-02-15",
    body: `Spring is almost here and the shop is already buzzing. I just finished wrapping the first blank of the season — a custom light-tackle 7'6" built around a Fuji skeleton reel seat and some color combinations I've been sketching all winter.

The thread work on this one uses a deep navy base with teal mid-wraps and a single gold trim ring. Simple, but clean.

**Blank:** ALPS prototype carbon
**Guide train:** Fuji K-Frame titanium SiC
**Finish:** 2-part epoxy, three coats

More photos coming once the epoxy cures fully. Offshore season can't come soon enough.`,
  },
  {
    id: "2",
    title: "Why I Wrap by Hand",
    date: "2026-01-28",
    body: `A lot of people ask why I don't use a CNC thread-winder. The honest answer is feel.

When you wrap by hand you can sense the tension in the thread before it shows up as a problem. You develop a relationship with the blank — every flat spot, every spine, every subtle variation in the carbon fiber tells you something.

Production rod building is a different craft. There's nothing wrong with it. But custom rod building is about translating what an angler *needs* into something you can hold in your hands. That's hard to automate.

Every rod that leaves the shop has my hands on it from blank to butt cap.`,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto space-y-16">
      {PLACEHOLDER_POSTS.map((post) => (
        <article key={post.id} className="border-b border-navy/10 pb-16 last:border-0 last:pb-0">
          <time className="text-sm uppercase tracking-widest text-teal font-medium">
            {formatDate(post.date)}
          </time>
          <h3 className="text-2xl md:text-3xl font-heading font-light text-navy mt-2 mb-6">
            {post.title}
          </h3>
          <div className="prose prose-navy max-w-none text-navy/70 leading-relaxed [&_strong]:text-navy [&_p]:mb-4 [&_p:last-child]:mb-0">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </article>
      ))}
    </div>
  );
}
