export type EntryStatus = "pending" | "in-progress" | "finished";

interface SeedEntry {
  description: string;
  status: EntryStatus;
  createdAt: number;
}

interface SeedData {
  entries: SeedEntry[];
}

export const SeedData: SeedData = {
  entries: [
    {
      description: "texto demo 1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "texto demo 2",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "texto demo 3",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
