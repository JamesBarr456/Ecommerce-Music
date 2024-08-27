import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 3000;
// export const MONGO_URI =
//   process.env.MONGO_URI || "mongodb://localhost:27017/ecommerce";
export const MONGO_URI = "mongodb://localhost:27017/ecommerce";
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
