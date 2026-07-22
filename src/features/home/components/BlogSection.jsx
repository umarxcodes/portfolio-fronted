import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import { Award } from "lucide-react";
import { Section } from "./FeaturedProjects";
import { Badge } from "@/components/ui";
import { truncate } from "@/lib/format";

function BlogCard({ post, index }) {
  return (
    <Reveal key={post._id} delay={index * 80}>
      <Link
        to={`/blog/${post.slug}`}
        className="group block h-full rounded-lg border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md"
      >
        {post.coverImage && (
          <img
            src={post.coverImage}
            alt=""
            width={640}
            height={360}
            loading="lazy"
            className="mb-4 aspect-video w-full rounded-md object-cover"
          />
        )}
        <Badge tone="brand">{post.category}</Badge>
        <h3 className="mt-3 font-heading text-lg font-bold text-content-primary group-hover:text-brand-500">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-content-secondary">
          {truncate(post.excerpt, 100)}
        </p>
      </Link>
    </Reveal>
  );
}

export function BlogSection({ blogs }) {
  if (!blogs.length) {
    return <p className="py-8 text-center text-sm text-content-muted">No blog posts yet.</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {blogs.map((post, i) => (
        <BlogCard key={post._id} post={post} index={i} />
      ))}
    </div>
  );
}

export function BlogSectionWrapper({ blogs }) {
  return (
    <Section icon={Award} title="Latest Writing" action="All posts" actionTo="/blog">
      <BlogSection blogs={blogs} />
    </Section>
  );
}
