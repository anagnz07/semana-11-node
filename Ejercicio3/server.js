/* const express = require("express")
const app = express() */

const app = require("express")()

// Middleware que imprimera info de la peticion
app.use((req, res, next) => {
  console.log("Url: ", req.url)
  console.log("Ip: ", req.ip)
  console.log("User agent: ", req.header("User-Agent"))

  next()
})


//Ruta que muestra la hora
app.get("/hora", (req, res, next) => {
  try{
    res.send(`Hora de la petición: ${new Date().toLocaleTimeString()}`)
  } catch(e){
    next(e)
  }
})


//RUta que muestra la ruta
app.get("/ruta", (req, res, next) =>{

  try{
    res.send(`El servidor está en: ${process.mainModule.filename}`)
  } catch(e){
    next(e)
  }
})


//Middleware de error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500)
  res.send("Ha ocurrido un problema")

})


//Middleware de 404
app.use((req, res) => {
  res.status(404);
  res.send("Página no encontrada")
})





app.listen(3000, () => {console.log("Servidor corriendo en el puerto 3000")})