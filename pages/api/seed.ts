import { SeedData, db } from "@/database";
import { Entry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (process.env.NODE_ENV === "production") {
    return res.status(400).json({ message: "No tiene Acceso a este servicio" });
  }

  await db.connect();
  await Entry.deleteMany();
  await Entry.insertMany(SeedData.entries);
  await db.disconnect();
  res.status(200).json({ message: "Proceso realizado correctamente" });
}
