import {useT} from '~/lib/ui-strings';
import {Underline} from './Underline';

interface StoryImage {
  src: string;
  alt: string;
}

export interface AboutStoryProps {
  /** Small eyebrow label above the headline. */
  eyebrow?: string;
  /** Section headline (serif display). */
  title?: string;
  /** Story paragraphs, top to bottom. */
  paragraphs?: string[];
  /** Wide kasbah image (top card). */
  kasbah?: StoryImage;
  /** Founder-with-camel image (center card). */
  camel?: StoryImage;
  /** Campfire-at-night image (bottom card). */
  campfire?: StoryImage;
  /** Founder pull-quote. */
  quote?: string;
  /** Attribution name. */
  author?: string;
  /** Attribution role. */
  role?: string;
}

const DEFAULT_PARAGRAPHS = [
  'I grew up in the Moroccan Sahara. The dunes were my playground. The stars were my nightlight. Mint tea by a fire was just how every evening ended. As a kid, I thought every grandmother told stories under that many stars. I thought every road home crossed a sea of sand.',
  'It took leaving to realize that wasn\u2019t a normal childhood. That the silence I knew, the hospitality I grew up with, and a sky so full of stars they look fake \u2014 most people never get to feel any of it. Not once. And the few who do come are often hurried past the best parts of it.',
  'So in 2017, I started Budget Desert Tour. The mission is simple: share the Sahara I grew up in with travelers who want more than a photo. Small groups. Real Berber families. Honest prices. Three days slow enough to put your camera down, sit with people, eat what they eat, and let the silence work on you the way it worked on me.',
  'Come and see. We\u2019ll take you across the Atlas. We\u2019ll bring you to a real Berber camp tucked into the dunes. You\u2019ll sleep under stars so close you\u2019ll instinctively reach for them. And when the silence really lands \u2014 usually somewhere after dinner on Night 1 \u2014 you\u2019ll know exactly what I mean. \u263A',
];

export function AboutStory({
  eyebrow = 'Our Story',
  title = 'Born under the stars.',
  paragraphs = DEFAULT_PARAGRAPHS,
  kasbah = {
    src: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80',
    alt: 'Ancient Kasbah Ait Ben Haddou at golden hour',
  },
  camel = {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
    alt: 'Berber guide leading camels through the Sahara dunes',
  },
  campfire = {
    src: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=600&q=80',
    alt: 'Campfire under a star-filled desert sky',
  },
  quote = '\u201cI\u2019m not selling the Sahara. I\u2019m sharing the Morocco I fell in love with. \u2665\u2665\u2665\u201d',
  author = 'Fatima',
  role = 'Founder',
}: AboutStoryProps) {
  const t = useT();
  return (
    <section
      aria-label={t('aria.about.story', 'Our story')}
      className="relative overflow-hidden bg-sand py-section font-body"
    >
      <div className="container relative z-10 mx-auto max-w-content px-8">
        <div className="grid items-start gap-18 md:grid-cols-[minmax(0,30rem)_1fr]">
          {/* Story copy */}
          <div className="text-center">
            <div className="mb-[1.1rem] inline-flex flex-col items-center gap-1.5">
              <span className="text-label font-bold uppercase text-primary">
                {eyebrow}
              </span>
              <Underline />
            </div>

            <h2 className="mb-3 font-display text-[clamp(2rem,3.2vw,2.375rem)] text-dark">
              {title}
            </h2>

            <div className="flex flex-col gap-[1.15rem] text-label text-dark text-justify">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* Overlapping photo collage */}
          <div className="relative md:min-h-184">

            {/* ── Mobile: mosaic grid ── */}
            <div className="grid grid-cols-5 gap-3 md:hidden">
              <figure className="col-span-5 aspect-video overflow-hidden rounded-card shadow-card">
                <img src={kasbah.src} alt={kasbah.alt} className="h-full w-full object-cover" loading="lazy" />
              </figure>
              <figure className="col-span-3 aspect-3/4 overflow-hidden rounded-card shadow-card">
                <img src={camel.src} alt={camel.alt} className="h-full w-full object-cover" loading="lazy" />
              </figure>
              <figure className="col-span-2 aspect-3/4 overflow-hidden rounded-card shadow-card">
                <img src={campfire.src} alt={campfire.alt} className="h-full w-full object-cover" loading="lazy" />
              </figure>
            </div>

            {/* ── Desktop: overlapping collage ──
                Placed from the left so it keeps the same gap to the text: the
                middle card overlaps the top one by ~45px and the portrait card
                sticks out ~48px past the top card's right edge. */}
            <figure className="hidden md:block absolute left-15 top-0 aspect-8/5 w-117 overflow-hidden rounded-card shadow-card-m">
              <img src={kasbah.src} alt={kasbah.alt} className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <figure className="hidden md:block absolute left-0 top-62 aspect-3/2 w-108 overflow-hidden rounded-card shadow-card-m">
              <img src={camel.src} alt={camel.alt} className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <figure className="hidden md:block absolute left-95 top-100 aspect-2/3 w-49 overflow-hidden rounded-card shadow-card-m">
              <img src={campfire.src} alt={campfire.alt} className="h-full w-full object-cover" loading="lazy" />
            </figure>
            <span aria-hidden="true" className="hidden md:block absolute left-116 top-82 text-3xl">
              &#128525;
            </span>
          </div>
        </div>

        {/* Founder pull-quote */}
        <figure className="relative mx-auto mt-12 max-w-100 text-center md:-mt-section">
          <span aria-hidden="true" className="absolute -bottom-20 left-0 md:left-5 font-display text-9xl text-primary/5">
            &ldquo;
          </span>
          <span aria-hidden="true" className="absolute -bottom-20 right-0 md:right- 5 font-display text-9xl text-primary/5">
            &rdquo;
          </span>
          <blockquote className="text-base font-bold text-dark md:text-[clamp(0.6rem,1.8vw,0.875rem)]">
            {quote}
          </blockquote>
          <figcaption className="mt-[1.15rem] inline-flex items-center gap-2 text-label text-dark/80">
            <span className="font-semibold">{author}</span>
            <span aria-hidden="true">&middot;</span>
            <MoroccoFlag label={t('aria.about.flag', 'Morocco')} />
            <span aria-hidden="true">&middot;</span>
            <span>{role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

// ── Sub-components ──────────────────────────────────────────────

/** Round Moroccan flag: red field with the green interlaced pentagram, drawn
 *  as a vector so it stays sharp at any size. */
function MoroccoFlag({label}: {label: string}) {
  return (
    <svg
      role="img"
      aria-label={label}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="12" fill="#C1272D" />
      <path
        d="M12 5.2 16.11 17.86 5.34 10.04h13.32L7.89 17.86Z"
        fill="none"
        stroke="#006233"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export default AboutStory;