import Axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("http://localhost:3005/api/user/order", { withCredentials: true })
            .then((res) => {
                if(res.data.success){
                    setOrder(res.data.detail);
                }
            });
    }, [])

    function onClickHandler(e, order_id){
        e.preventDefault();
        navigate(`/order/${order_id}`);
    }

    return (
        <div>
            <div class="flex flex-col mx-12 gap-y-6">
                <h1 class="text-purple-600 font-bold text-3xl">My Order</h1>
                <table class="border border-purple-700">
                    <thead class="text-left bg-purple-300 text-gray-900">
                        <tr class="h-12 text-xl">
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Price</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(order.lenght !== 0)? (order.map(item => {
                            return (
                                <tr>
                                    <td>{item._id}</td>
                                    <td>{item.orderDate.slice(0,10)}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button onClick={(e) => {onClickHandler(e, item._id)}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })) : <div/>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}