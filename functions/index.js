//definicion de importaciones
const functions = require('firebase-functions');
const admin = require('firebase-admin');
//definicion de importaciones express y coosr para api
const express=require('express')
const cors=require('cors')
//inicializacion de  firebase para administracion de recursos
admin.initializeApp()
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
//declaracion de entorno de servidor extress coors
const servidor = express()
servidor.use(cors({ origin: true }))
//definicio de funciones de api
//captura de data  por metodo post
servidor.post("/V1", (request, response,next) => {
    //retorno de consulta a base de datos
    return admin.database().ref("/user").push(request.query) .then(() => {
        //retorno de respueta ejecucion exitosa
        return response.status(200).json({
          resultado: true
        })
      })
      .catch(error => {
          //llamado a intermediario  de Express para control de errores
        return next(new Error(error.toString()))
      })
})
//conytrol de errore en llamado de funciom
servidor.use((error, req, res, next) => {
    if (error) {
      console.error(`${error}`)
      return res.status(500).json({
        responseError: error.message
      })
    }
  
    return console.error(`${error}`)
  })
//exporte de funcion 
const addWork = functions.https.onRequest(servidor)
module.exports = {
  addWork
}



