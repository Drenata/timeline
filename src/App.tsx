import { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./Table";
import { Timeline } from "./Timeline";

export interface TimelineEvent {
  title: string;
  year: number;
}

function App() {
  const [items, setItems] = useState<TimelineEvent[]>(
    JSON.parse(localStorage.getItem("timeline-events") ?? "null") ?? []
  );
  const [[filterFrom, filterTo], setFilter] = useState<[number, number]>([
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
  ]);

  const deleteItem = (i: number) =>
    setItems((oldItems) => oldItems.filter((_, j) => i != j));
  const addItem = (newItem: TimelineEvent) =>
    setItems((oldItems) =>
      [newItem, ...oldItems].sort((a, b) => a.year - b.year)
    );
  const updateFilterFrom = (value: string | null) => {
    if (value == null || !Number.isFinite(Number(value))) return;
    setFilter(([_, b]) => [
      value == "" ? Number.NEGATIVE_INFINITY : Number(value),
      b,
    ]);
  };
  const updateFilterTo = (value: string | null) => {
    if (value == null || !Number.isFinite(Number(value))) return;
    setFilter(([a, _]) => [
      a,
      value == "" ? Number.POSITIVE_INFINITY : Number(value),
    ]);
  };

  useEffect(() => {
    localStorage.setItem("timeline-events", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div
        style={{
          paddingBottom: "2em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ display: "inline" }}>Timeline</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: "0.5em",
            columnGap: "0.5em",
            width: "12em",
          }}
        >
          <label>From</label>
          <input
            value={filterFrom == Number.NEGATIVE_INFINITY ? "" : filterFrom}
            onChange={(e) => updateFilterFrom(e.currentTarget.value)}
          />
          <label>To </label>
          <input
            value={filterTo == Number.POSITIVE_INFINITY ? "" : filterTo}
            onChange={(e) => updateFilterTo(e.currentTarget.value)}
          />
        </div>
      </div>
      <Timeline
        items={items.filter(
          (item) =>
            Number(item.year) > filterFrom && Number(item.year) < filterTo
        )}
      />

      <div style={{ maxWidth: "720px", margin: "0 auto", paddingTop: "2em" }}>
        <Table items={items} deleteItem={deleteItem} addItem={addItem} />
      </div>
    </>
  );
}

export default App;
