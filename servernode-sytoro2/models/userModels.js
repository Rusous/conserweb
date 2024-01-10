import mongoose from "mongoose";

const {Schema} = mongoose


const userSchema = new Schema(
    {
        name: { type: String, required: [true, 'Name is a required field'] },
        rut: { type: String, unique:true, required: [true, "Rut is a required field"] },
        password: { type: String, required: [true, "Password is a required field"] },
        email:{type:String, required:[true, 'Email is a required field']},
        role: { type: String, default: 'conserje' },
    },
    { timestamps: true }
)

const User = mongoose.model('User',userSchema)
export default User