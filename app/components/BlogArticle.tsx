import type {ReactNode} from 'react';
import {SafeImage} from './SafeImage';
import {Underline} from './Underline';

interface ArticleImage {
  src: string;
  alt: string;
}

export interface BlogArticleProps {
  /** Full-bleed hero background. Editable via page_section `blog.post`. */
  heroImage?: ArticleImage;
  /** Article headline. Wraps on its own — no manual line breaks needed. */
  title: string;
  /** Publication date, already formatted for the store's language. */
  date?: string;
  /** Estimated read time, e.g. "8 min read". */
  readTime?: string;
  /** The post's own featured image, overlapping the hero. */
  featuredImage?: ArticleImage | null;
  /** Rendered above the headline — the back link to the journal. */
  breadcrumb?: ReactNode;
  /** Article body. */
  children?: ReactNode;
}

export function BlogArticle({
  heroImage,
  title,
  date,
  readTime,
  featuredImage,
  breadcrumb,
  children,
}: BlogArticleProps) {
  const meta = [date, readTime].filter(Boolean).join(' · ');

  return (
    <article className="bg-sand font-body">
      {/* ── Hero ── */}
      <header className="relative flex h-[502px] flex-col overflow-hidden bg-sand">
        {heroImage?.src && (
          <SafeImage
            src={heroImage.src}
            alt={heroImage.alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        )}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(120,58,20,0.30) 0%, rgba(120,58,20,0.12) 45%, rgb(245 237 224 / 0.85) 92%, var(--color-sand) 100%)',
          }}
        />

        {/* SiteNavbar is positioned by the page, so the copy clears it here.
            Type matches PageHero, the hero on every other page. */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-27.5 text-center">
          {breadcrumb && <div className="mb-5">{breadcrumb}</div>}
          <h1 className="font-display text-hero max-w-180 text-white text-balance">
            {title}
          </h1>
          <Underline tone="light" className="mt-4" />
          {meta && (
            <p className="mt-6 text-lg text-white md:text-h3">
              {meta}
            </p>
          )}
        </div>
      </header>

      {/* ── Featured image, overlapping the hero — same column as the body ── */}
      {featuredImage?.src && (
        <div className="relative z-20 mx-auto -mt-20 max-w-316 px-6">
          <div className="grid grid-cols-12 gap-6">
            <figure className="col-span-12 md:col-span-8 md:col-start-3">
              <div className="aspect-[802/390] overflow-hidden rounded-2xl shadow-card-m">
                <SafeImage
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </figure>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="mx-auto max-w-316 px-6 pb-25 pt-20">
        <div className="grid grid-cols-12 gap-6">
          <div className="article-body col-span-12 text-base leading-[22px] text-dark/80 md:col-span-8 md:col-start-3">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogArticle;
