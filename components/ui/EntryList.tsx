import { List, Paper } from "@mui/material";
import React, { useMemo, FC, useContext, DragEvent } from "react";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "@/interfaces";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, setIsDragging } = useContext(UIContext);
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  );

  const allowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");
    let entry = entries.find((e) => e._id === id)!;
    entry.status = status;
    updateEntry(entry);
    setIsDragging(false);
  };

  return (
    <div
      style={{
        height: "100%",
      }}
      onDrop={onDrop}
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: "calc(100vh - 200px)",
          overflowY: "scroll",
          overflowX: "hidden",
          backgroundColor: "transparent",
          padding: 1,
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
          },
        }}
      >
        <List
          sx={{
            opacity: isDragging ? 0.3 : 1,
            transition: "all 300ms ease",
          }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
