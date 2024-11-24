import { useState } from "react";
import { TimelineEvent } from "./App";

interface TableProps {
  items: TimelineEvent[];
  deleteItem: (i: number) => void;
  addItem: (newItem: TimelineEvent) => void;
}

export function Table({ items, deleteItem, addItem }: TableProps) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const _addItem = () => {
    addItem({ title, year: Number(year) });
    setTitle("");
    setYear("");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 5em 7em",
        rowGap: "5px",
        columnGap: "5px",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
      />
      <input
        type="text"
        value={year}
        onChange={(e) => setYear(e.currentTarget.value)}
      />
      <button onClick={_addItem}>Add</button>
      <div style={{ alignSelf: "center" }}>
        <strong>Title</strong>
      </div>
      <div style={{ alignSelf: "center" }}>
        <strong>Year</strong>
      </div>
      <div></div>
      {items.map(({ title, year }, i) => (
        <>
          <div key={title + year + "-title"} style={{ alignSelf: "center" }}>{title}</div>
          <div key={title + year + "-year"} style={{ alignSelf: "center" }}>{year}</div>
          <button style={{ alignSelf: "center" }} onClick={() => deleteItem(i)}>
            Remove
          </button>
        </>
      ))}
    </div>
  );
}
