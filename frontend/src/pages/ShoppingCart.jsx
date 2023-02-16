import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../context/LoginConext";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
    _id: "",
    name: "",
    description: "",
    price: "",
    imageSrc: ""
}

export default function ShoppingCart() {
    const { loginStatus } = useContext(LoginContext);
    const [cart, setCart] = useState([INITIAL_STATE]);
    const [prompt, setPropmt] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (loginStatus) {
            Axios.get("https://how-ez.vercel.app/api/user/cart", { withCredentials: true })
                .then((res) => {
                    if (res.data.detail) {
                        setCart(res.data.detail);
                    }
                });
        }
    }, [prompt]);

    function checkOutHandler(e) {
        e.preventDefault();
        navigate("/payment");
    }

    function onClickHandler(key) {
        Axios.post("https://how-ez.vercel.app/api/user/cart/delete", {
            id: key
        }, { withCredentials: true })
            .then(res => {
                if (res.data.delete) {
                    setPropmt("Delete Successful");
                } else {
                    setPropmt("Delete Unsuccessful");
                }
            });
    }

    return (
        <div>
            <div class="flex flex-col mx-12 gap-y-6">
                <div class="flex gap-x-6">
                    <h1 class="text-purple-600 font-bold text-3xl">My Cart</h1>
                    <h3 class="text-red-600 font-bold pt-2">{prompt}</h3>
                </div>
                <table class="border border-purple-700">
                    <thead class="text-left bg-purple-300 text-gray-900">
                        <tr class="h-12 text-xl">
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart[0]._id ? (cart.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>
                                        <img src={item.imageSrc} alt="" class="h-28 w-28" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button onClick={() => onClickHandler(item._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })) : <div />}
                    </tbody>
                </table>
                {cart[0]._id? (<div class="flex justify-end">
                    <button
                        onClick={(e) => { checkOutHandler(e) }}
                        className="flex items-center rounded-md border border-transparent bg-pink-600 py-3 px-8 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    >
                        Check out
                    </button>
                </div>):<div/>}
            </div>
        </div>
    )
}