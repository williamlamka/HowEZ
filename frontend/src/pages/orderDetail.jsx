import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/LoginConext";

export default function OrderDetail() {
    const { userId } = useContext(LoginContext);
    const [userInfo, setUserInfo] = useState({});
    const [order, setOrder] = useState([]);
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const Params = useParams("id");

    useEffect(() => {
        Axios.get(`https://how-ez.vercel.app/api/user/${userId}`, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    setUserInfo(res.data);
                }
            });

        Axios.get(`https://how-ez.vercel.app/api/user/order/${Params.id}`, { withCredentials: true })
            .then((res) => {
                if (res.data.success) {
                    setOrder(res.data.order);
                    setProduct(res.data.product);
                }
            });
    }, []);

    function onClickHandler(e) {
        e.preventDefault();
        navigate("/order")
    }

    return (
        <div class="flex flex-col bg-gray-100 mx-12 rounded-lg">
            <div class="flex flex-col mx-6 my-2">
                <h3 class="text-center text-purple-500 font-bold text-xl">User Information</h3>
                <hr class="my-2" />
                <h3>Order ID: {Params.id}</h3>
                <h3>User Name: {userInfo.firstName + " " + userInfo.lastName}</h3>
                <h3>Emaill address: {userInfo.email}</h3>
                <h3>Address: {userInfo.address}</h3>
            </div>
            <hr class="mx-6 my-2" />
            <div class="flex flex-col mx-6 my-2">
                <h3 class="text-center text-purple-500 font-bold text-xl">Product Information</h3>
                <hr class="my-2" />
                <table>
                    <thead>
                        <tr class="text-left h-12 text-xl">
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>
                                        <img src={item.imageSrc} alt="" class="h-28 w-28" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>${item.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <hr class="mx-6 my-2" />
            <div class="flex justify-end mb-2 mr-2">
                <button
                    onClick={(e) => { onClickHandler(e) }}
                    className="flex items-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Back to order
                </button>
            </div>
        </div>
    );
}