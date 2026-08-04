import Reveal from "./Reveal";
import { REVIEWS, type Review } from "@/lib/data";
import { GoogleG, Star } from "./Icons";

const GOLD = "#f5b731";

function Stars() {
  return (
    <span className="flex gap-0.5" style={{ color: GOLD }} aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4" />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initial = review.name.charAt(0).toUpperCase();
  return (
    <figure className="card-surface mx-3 flex h-full w-[290px] shrink-0 flex-col rounded-2xl p-6 sm:w-[360px]">
      <Stars />
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-white/80">
        “{review.text}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border border-line bg-white/5 font-display text-sm font-bold text-chrome">
          {initial}
        </span>
        <span className="min-w-0">
          <span className="block truncate font-display text-sm font-bold text-white">
            {review.name}
            {review.badge ? (
              <span className="ml-2 align-middle text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
                {review.badge}
              </span>
            ) : null}
          </span>
          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
            <GoogleG className="h-3.5 w-3.5" />
            Google Review
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** One seamless marquee row — content is duplicated so the loop has no seam. */
function MarqueeRow({
  items,
  reverse = false,
  duration = "46s",
}: {
  items: Review[];
  reverse?: boolean;
  duration?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee overflow-hidden py-2">
      <div
        className={`marquee-track items-stretch ${reverse ? "is-reverse" : ""}`}
        style={{ "--marquee-dur": duration } as React.CSSProperties}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  );
}

export default function Reviews() {
  // Two rows drifting in opposite directions for a premium, dynamic feel.
  const topRow = REVIEWS;
  const bottomRow = [...REVIEWS.slice(3), ...REVIEWS.slice(0, 3)];

  return (
    <section id="reviews" className="relative overflow-hidden border-t border-line bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
            Testimonials
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
              What Our Customers Say
            </h2>
            {/* 5.0 ★ on Google badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-4 py-2 text-sm backdrop-blur">
              <GoogleG className="h-4 w-4" />
              <span className="font-display font-bold text-white">5.0</span>
              <Stars />
              <span className="text-muted">on Google</span>
            </span>
          </div>
        </Reveal>
      </div>

      <Reveal delay={80} className="mt-12 flex flex-col gap-4">
        <MarqueeRow items={topRow} duration="52s" />
        <MarqueeRow items={bottomRow} reverse duration="64s" />
      </Reveal>
    </section>
  );
}
