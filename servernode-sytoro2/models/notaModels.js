import mongoose from "mongoose";

const {Schema} = mongoose

// const visitaSchema = new Schema({
//     id: { type: Schema.Types.ObjectId },
//     nombre: { type: String}
//   });
  


const notaSchema = new Schema(
    {
        title: { type: String, default:'my title' },
        nota: { type: String, },
        createdBy: {type:Schema.Types.ObjectId, ref:'User', required:true},
        start:{
            type:Date
        },
    
        end:{
            type:Date
        },
        visitas: [
           {}
          ]
    },
    { timestamps: true }
)

const Nota = mongoose.model('Nota',notaSchema)
export default Nota