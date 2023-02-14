import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    imageSrc: {
        type: String,
        reuqired: true
    },
    subimageSrc: {
        type: String,
        reuqired: true
    }
})

export default mongoose.model("Proudct", productSchema);