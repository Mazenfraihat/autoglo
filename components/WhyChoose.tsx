import { FadeIn, Stagger, StaggerItem, CountUp } from "./motion";
import { WHY_CHOOSE } from "@/lib/data";

export default function WhyChoose() {
  return (
    <section className="relative border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="font-display text-xs font-bold uppercase tracking-[0.3em] text-chrome">
            Why Choose Auto Glo
          </p>
          <h2 className="font-display mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Detailing done properly, from the driveway up.
          </h2>
        </FadeIn>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {WHY_CHOOSE.map((item, i) => (
            <StaggerItem key={item.n}>
              <div className="card-surface card-hover group h-full rounded-2xl p-8">
                <span className="font-display block text-5xl font-extrabold tracking-tight text-white/10 transition-colors duration-300 group-hover:text-chrome/80">
                  <CountUp to={i + 1} />
                </span>
                <h3 className="font-display mt-6 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-chrome">
                  {item.kicker}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/70">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
