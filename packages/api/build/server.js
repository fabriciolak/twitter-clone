"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_zod = require("zod");

// src/prisma-client.ts
var import_database = require("@monorepo/database");
var prisma = new import_database.PrismaClient();

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, { origin: "*" });
app.post("/users", async (request, reply) => {
  console.log(request.body);
  const userBodySchema = import_zod.z.object({
    name: import_zod.z.string(),
    email: import_zod.z.string()
  });
  const { email, name } = userBodySchema.parse(request.body);
  const emailAlreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (emailAlreadyExists) {
    reply.status(405).send({
      message: "Email Already Exists"
    });
  }
  const user = await prisma.user.create({
    data: {
      email,
      name
    }
  });
  reply.status(201).send({
    data: user
  });
});

// src/server.ts
app.listen({
  host: "0.0.0.0",
  port: 3333
}).then(() => {
  console.log("\u{1F47B}");
});
