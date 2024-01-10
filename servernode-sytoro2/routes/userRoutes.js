import express from 'express'

import User from '../models/userModels.js'
import generarJWT from '../helpers/generarJWT.js'
// import { isAuth } from '../utils.js'
import { isAdmin, isAuth } from '../utils.js'

const userRouter = express.Router()


//api para loguearse con rut y contrasena
userRouter.post('/login',  async(req,res)=>{
    console.log('estoy en endpoing login')
    //obtengo los datos de la pagina login de react

    // console.log(req.body)
    
    const {rut, password} = req.body

    try {
        //verificar si el rut introducido en react existe
        const user = await User.findOne({rut})

        //si el rut not existe mando un mensaje con esta condicion
        if(!user){
            return res.status(404).json({message:'El Usuario no Existe'})
        }

        //si el password no es el mismo con esta condicion mando un mensaje
        if(user.password !== password){
            return res.status(403).json({message:'El password es incorrecto'})
        }
        
        //si todo sale bien envio los datos de abajo a react para la autenticacion
        res.json({
            name:user.name,
            role:user.role,
            token:generarJWT(user._id)
        })

    } catch (error) {
        console.log(error)
        
    }

    
    
})



//api para crear usuarios solo el admin puede
userRouter.post('/create-user', isAuth,  isAdmin, async(req,res)=>{
    console.log('en la ruta create-user')

    const {name, rut, email, password} = req.body

    try {

        const isUserDb = await User.findOne({rut})

        // console.log(isUserDb)
        if(isUserDb){
            return res.status(400).json({message:'Usuario ya Existe'})
        }

        const newUser = new User(req.body)
        await newUser.save()

        const newListedUsers = await User.find().sort({_id: -1})

        res.json(newListedUsers)

        
    } catch (error) {
        console.log(error)
		//to check mongoose validation error like empty data
		if (error.name === "ValidationError") {
			let errors = [];

			Object.keys(error.errors).forEach((key) => {
				//   errors[key] = error.errors[key].message;
				errors.push(error.errors[key].message)
			});
			return res.status(400).send({ message: errors.join(' ||| ') });
		}

		res.status(500).send({ message: "Something went wrong" });
    }

})


//api para ver todos los usuarios solo el admin puede
userRouter.get('/all-users', isAuth, isAdmin, async(req,res)=>{

    try {
        const users = await User.find().sort({_id: -1})
        res.json(users)
    } catch (error) {
        console.log(error)
    }
})



//api para eliminar usuarios conserje solo el admin puede
userRouter.delete('/delete-conserje/:id', isAuth, isAdmin,  async(req,res)=>{
    console.log('en delete route')

    const {id} = req.params

    try {
        const deletedUser = await User.deleteOne({_id:id})

        if(deletedUser.deletedCount === 0){
           return res.status(404).json({message:'Usuario no Encontrado'})
        }

        const newListUsers = await User.find().sort({_id: -1})
  

        res.json(newListUsers)
        
    } catch (error) {
        console.log(error)
    }

})

export default userRouter