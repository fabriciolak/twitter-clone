import { app } from "./app";
app.listen({
  host: '0.0.0.0',
  port: 3333
}).then(() => {
  console.log('👻')
})
// })
// (async () => {
//   try {
//     await 
//   } catch (error) {
//     app.log.error(error)
//     process.exit(1)
//   }
// })
