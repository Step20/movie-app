import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import resolvers from "./resolvers";
import router from "./routes";
async function main() {
  const app = express();
  app.use(
    cors({
      origin: "*", // adjust this in a production environment
      methods: "POST",
    })
  );
  app.use(express.json());
  dotenv.config();

  const MONGO_DB_URI =
    process.env.MONGO_DB_URI ||
    "mongodb+srv://armandr:Xmdcxg9JuW4Mg1J6@cluster0.havbdvl.mongodb.net/?retryWrites=true&w=majority";

  mongoose
    .connect(MONGO_DB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });

  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use("/api", router);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers,
      validate: { forbidUnknownValues: false },
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app as any });

  app.listen(4000, () => {
    console.log("Server started at http://localhost:4000/graphql");
  });
}

main();
