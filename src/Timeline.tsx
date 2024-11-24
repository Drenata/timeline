import { useEffect, useLayoutEffect, useState } from "react";
import milestones from "d3-milestones";
import { TimelineEvent } from "./App";

interface TimelineProps {
  items: TimelineEvent[];
}

export function Timeline({ items }: TimelineProps) {
  const [useHorizontal] = useState(window.innerHeight < window.innerWidth);

  useLayoutEffect(() => {
    const onResize = () => {
      const n = window.innerHeight < window.innerWidth;
      if (n != useHorizontal) window.location.reload();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [useHorizontal]);

  useEffect(() => {
    milestones("#timeline")
      .mapping({
        timestamp: "year",
        text: "title",
      })
      .parseTime("%Y")
      .aggregateBy("year")
      .labelFormat("%-Y")
      .optimize(true)
      .orientation(useHorizontal ? "horizontal" : "vertical")
      .render(items);
  }, [items, useHorizontal]);

  const style = useHorizontal
    ? {}
    : { height: `${items.length * 60}px`, padding: "2em" };

  return <div style={style} id="timeline" />;
}
