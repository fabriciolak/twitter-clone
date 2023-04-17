import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { z } from 'zod'
import { prisma } from './prisma-client'

export const app = fastify();
app.register(fastifyCors, { origin: "*" });

app.post('/users', async (request, reply) => {
  console.log(request.body)
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string()
  })

  const { email, name } = userBodySchema.parse(request.body)

  const emailAlreadyExists = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (emailAlreadyExists) {
    reply.status(405).send({
      message: 'Email Already Exists'
    })
  }

  const user = await prisma.user.create({
    data: {
      email,
      name
    }
  })

  reply.status(201).send({
    data: user
  })
})