import mongoose from "mongoose";

const productsColeccion = "products"
const productsEsquema= new mongoose.Schema({
    
    // "id": 1,
    // "title": "prueba1",
    // "description": "archivo prueba1",
    // "price": "100",
    // "thumbnail": "sin imagen",
    // "code": 1,
    // "stock": 10

    title: {
        type: String,
        require: true,
        max: 100,
    },
    description: String,
    price: {
        type: Number,
        require: true,
        min: 0
    },
    thumbnail: String,
    code: {
        type: Number,
        require: true,
        min: 0,
        unique: true
    },
    stock: {
        type: Number,
        require: true,
        min: 0
    },

    category: {
        type: String,
        require: true,
        max: 100,
    },
    deleted:{
        type: Boolean,
        default: false
    }
})

export const productsModelo=mongoose.model(productsColeccion,productsEsquema)