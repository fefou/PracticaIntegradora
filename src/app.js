
import express from 'express'
import productosRouter from './routes/productosRouter.js'
import carritoRouter from './routes/carritoRouter.js'
import { engine } from 'express-handlebars'
import { router as vistasRouter} from './routes/vistasRouter.js'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import path from 'path'
import pm from './manager/productManager.js'
import mongoose from 'mongoose'

const productos=pm.getProducts()
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, './public')))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')


app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).render('home');
})


app.use('/api/productos', productosRouter)
app.use('/api/carts', carritoRouter)
app.use('/', vistasRouter)

const serverHTTP=app.listen(port, () => {
    console.log(`Server escuchando en puerto ${port}`);
})

 let usuarios=[]
 let mensajes=[]

export const serverSockets=new Server(serverHTTP)

serverSockets.on("connection",socket=>{
    console.log(`se conecto un cliente con id ${socket.id}`)


    socket.on('id', nombre=>{

        usuarios.push({nombre, id:socket.id})
        socket.broadcast.emit('nuevoUsuario', nombre)
        socket.emit("Hola", mensajes)
    })

    socket.on('mensaje',datos=>{
        mensajes.push(datos)
        serverSockets.emit('nuevoMensaje', datos)
    })

    socket.on("disconnect",()=>{
        let usuario=usuarios.find(u=>u.id===socket.id)
        if(usuario){
            serverSockets.emit('usuarioDesconectado', usuario.nombre)
        }
    })
})


try {
    await mongoose.connect('mongodb+srv://ffedecairo:CoderCoder@cluster0.uazzwoe.mongodb.net/?retryWrites=true&w=majority',{dbName: 'ecommerce'})

    console.log('DB Online')
} catch (error) {
    console.log(error.message)
}