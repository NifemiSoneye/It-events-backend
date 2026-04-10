import allowedOrigins from "./allowedOrigins";
import { CorsOptions } from "cors";

console.log("allowedOrigins:", allowedOrigins, Array.isArray(allowedOrigins));

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
