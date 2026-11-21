import { useEffect, type RefObject } from "react";

/**
 * Motion layer for the story home: staggered scroll reveals, count-up numbers,
 * light parallax on [data-px] layers, and the chapter counter / dark-chrome
 * switching. All scoped to the story root; everything degrades to fully
 * visible content under reduced-motion or without IntersectionObserver.
 */
export function useStoryMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    /* staggered reveals */
    const rvs = Array.from(root.querySelectorAll<HTMLElement>("[data-rv]"));
    const perParent = new Map<Element | null, number>();
    rvs.forEach((el) => {
      const p = el.parentElement;
      const n = perParent.get(p) ?? 0;
      perParent.set(p, n + 1);
      el.style.transitionDelay = `${Math.min(n * 80, 400)}ms`;
    });
    if ("IntersectionObserver" in window && !rm) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("on");
              io.unobserve(en.target);
            }
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.06 },
      );
      rvs.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      rvs.forEach((el) => el.classList.add("on"));
    }
    const failsafe = window.setTimeout(() => rvs.forEach((el) => el.classList.add("on")), 3000);
    cleanups.push(() => window.clearTimeout(failsafe));

    /* count-up numbers */
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const count = (el: HTMLElement) => {
      const raw = el.getAttribute("data-count") ?? "0";
      const suffix = el.getAttribute("data-suffix") ?? "";
      const target = parseFloat(raw);
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1300, 1);
        const v = target * (1 - Math.pow(1 - p, 3));
        el.textContent = `${Math.round(v)}${suffix}`;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (nums.length) {
      if ("IntersectionObserver" in window && !rm) {
        nums.forEach((el) => {
          el.textContent = `0${el.getAttribute("data-suffix") ?? ""}`;
        });
        const io2 = new IntersectionObserver(
          (entries) => {
            entries.forEach((en) => {
              if (en.isIntersecting) {
                count(en.target as HTMLElement);
                io2.unobserve(en.target);
              }
            });
          },
          { threshold: 0.4 },
        );
        nums.forEach((el) => io2.observe(el));
        cleanups.push(() => io2.disconnect());
      }
    }

    /* chapter counter + dark chrome over dark chapters */
    const secs = Array.from(root.querySelectorAll<HTMLElement>(".st-ch[id]"));
    const chc = root.querySelector<HTMLElement>("#st-chc");
    const topEl = root.querySelector<HTMLElement>(".st-top");
    if (secs.length && "IntersectionObserver" in window) {
      const io3 = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const el = en.target as HTMLElement;
            const n = el.id.replace("c", "");
            if (chc) {
              chc.textContent = `0${n} / 07`;
              chc.style.opacity = n === "1" ? "0" : "1";
            }
            if (topEl) topEl.classList.toggle("on-dark", /\b(who|nums)\b/.test(el.className));
          });
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
      );
      secs.forEach((el) => io3.observe(el));
      cleanups.push(() => io3.disconnect());
    }

    /* parallax */
    const pxs = Array.from(root.querySelectorAll<HTMLElement>("[data-px]"));
    if (pxs.length && !rm) {
      let ticking = false;
      const px = () => {
        const vh = window.innerHeight;
        pxs.forEach((el) => {
          const r = el.getBoundingClientRect();
          const c = r.top + r.height / 2 - vh / 2;
          el.style.setProperty(
            "--py",
            `${(-c * parseFloat(el.getAttribute("data-px") ?? "0")).toFixed(1)}px`,
          );
        });
        ticking = false;
      };
      const onScroll = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(px);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      px();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [rootRef]);
}
