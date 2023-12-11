import mongoose from "mongoose";

const cartsEsquema = new mongoose.Schema({

    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            quantity: Number
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    }


})

export const cartsModelo = mongoose.model("carts", cartsEsquema)