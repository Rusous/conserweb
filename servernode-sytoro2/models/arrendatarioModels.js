import mongoose from "mongoose";

const {Schema} = mongoose


const arrendatarioSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is a required field'] },
        rut: { type: String, unique:true, required: [true, "Rut is a required field"] },
        email:{type:String, required:[true, 'Email is a required field']},
        apartamento:{type:Number, required:[true, 'Apartamento is a required field']},
        estacionamiento:{type:Number, required:[true, 'Estacionamiento is a required field']},
        dueno:{type:String, required:[true, 'Dueno is a required field']},
        menciones:[
            {
                type:Date
            }
        ]
    }
)

const Arrendatario = mongoose.model('Arrendatario',arrendatarioSchema)
export default Arrendatario