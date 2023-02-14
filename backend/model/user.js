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
        type: [{
            products: {
                type: [String]
            },
            price: {
                type: Number
            },
            orderDate: {
                type: Date
            }
        }]
    }
})

export default mongoose.model("User", userSchema);