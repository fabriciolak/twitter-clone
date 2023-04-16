import fastify from "fastify";
import fastifyCors from "@fastify/cors";

export const app = fastify();
app.register(fastifyCors, { origin: "*" });

app.get('/', (request, reply) => {
  reply.status(200).send({
    message: 'ok'
  })
})