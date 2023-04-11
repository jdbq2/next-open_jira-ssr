import mongoose from "mongoose";

/**
 * 0 = disconected
 * 1 = connected
 * 2 = conecting
 * 3 = disconnecting
 */

const mongoConection = {
  isConected: 0,
};

export const connect = async () => {
  if (mongoConection.isConected) {
    console.log("ya estabamos conectados");
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConection.isConected = mongoose.connections[0].readyState;
    if (mongoConection.isConected === 1) {
      console.log("usando conexion anterior");
    }
    await mongoose.disconnect();
  }

  await mongoose.connect(process.env.MONGO_URL || "");
  mongoConection.isConected = 1;
  console.log("conectado a MongoDB", process.env.MONGO_URL);
};

export const disconnect = async () => {
  if (process.env.NODE_ENV === "development") return;
  if (mongoConection.isConected === 0) return;
  mongoConection.isConected = 0;
  await mongoose.disconnect();
  console.log("Desconectado de MongoDB");
};
