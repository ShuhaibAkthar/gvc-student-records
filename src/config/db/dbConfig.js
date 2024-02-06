import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect('mongodb+srv://studentdatabase:studentdatabase@cluster0.b0g9oaa.mongodb.net/college?retryWrites=true&w=majority').then(() => {
        console.log("DB connected");
    })
}