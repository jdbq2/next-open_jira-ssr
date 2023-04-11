import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | IEntry
  | {
      mesagge: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ mesagge: "Bad Request, ID no valido" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(req, res);

    default:
      return res
        .status(400)
        .json({ mesagge: "Bad Request,el metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryToUpdate = await Entry.findById(id);
  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({
      mesagge: "Bad Request,no existe la entrada con el ID especificado",
    });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;
  const updatedEntry = await Entry.findByIdAndUpdate(
    id,
    { description, status },
    { runValidators: true, new: true }
  );
  await db.disconnect();
  res.status(200).json(updatedEntry!);
};

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();
  const entryInDB = await Entry.findById(id);
  if (!entryInDB) {
    await db.disconnect();
    return res.status(400).json({
      mesagge: "Bad Request,no existe la entrada con el ID especificado",
    });
  }

  await db.disconnect();
  res.status(200).json(entryInDB!);
};
