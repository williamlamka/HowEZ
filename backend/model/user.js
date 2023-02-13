import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    address: {
        type: String
    },
    cart: {
        type: [String]
    },
    order: {
        type: [String]
    }
})

export default mongoose.model("User", userSchema);