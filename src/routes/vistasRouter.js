import { Router } from 'express';
export const router=Router()
import productosJSON from '../json/productos.json' assert { type: "json" }


router.get('/',(req,res)=>{ 

    res.status(200).render('Home')
})


router.get('/realtimeproducts',(req,res)=>{ 
   
    res.status(200).render('productos', {productos:productosJSON})
})

router.get('/chat',(req,res)=>{ 

    res.status(200).render('chat')
})
