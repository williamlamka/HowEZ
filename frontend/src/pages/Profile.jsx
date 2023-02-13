import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { LoginContext } from "../context/LoginConext";


const UPDATE_INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    address: ""
};

export default function Profile() {
    const [data, setData] = useState(UPDATE_INITIAL_STATE);
    const { userId, setUserId } = useContext(LoginContext);
    const [prompt, setPrompt] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:3005/api/user/${userId}`, { withCredentials: true })
                        .then((res) => {
                            if (res.status === 200) {
                                setData({
                                    firstName: res.data.firstName,
                                    lastName: res.data.lastName,
                                    email: res.data.email,
                                    address: res.data.address
                                });
                            }
                        })
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();
        await Axios.get("http://localhost:3005/api/auth/verifyLogin", { withCredentials: true })
            .then((res) => {
                if (res.data.auth) {
                    setUserId(res.data.id);
                }
            })
        await Axios.post(`http://localhost:3005/api/user/${userId}`, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
            address: data.address
        }, { withCredentials: true })
            .then(res => {
                setPrompt(res.data.detail);
            });
    };

    const dataHandler = e => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    return (
        <div class="flex flex-col items-center gap-y-6 m-12">
            <div class="flex gap-x-12 font-bold">
                <img src="/logo.png" alt="HowEZ Logo" class="h-24" />
                <h1 class="pt-8 text-3xl">HowEZ</h1>
            </div>
            <h3 class="text-red-600 font-bold">{prompt}</h3>
            <form onSubmit={(e) => submitHandler(e)} class="flex flex-col gap-y-6 text-xl">
                <div class="flex gap-x-12">
                    <div class="flex flex-col">
                        <label class="font-bold">First name</label>
                        <input onChange={(e) => dataHandler(e)} id="firstName" value={data.firstName} class="rounded-lg border-2 border-purple-600" />
                    </div>
                    <div class="flex flex-col">
                        <label class="font-bold">Last name</label>
                        <input onChange={(e) => dataHandler(e)} id="lastName" value={data.lastName} class="rounded-lg border-2 border-purple-600" />
                    </div>
                </div>
                <div class="flex flex-col">
                    <label class="font-bold">Shipping address</label>
                    <input onChange={(e) => dataHandler(e)} id="address" value={data.address} class="rounded-lg border-2 border-purple-600" />
                </div>
                <div class="flex flex-col">
                    <div class="flex gap-x-2">
                        <label class="font-bold">Email address</label>
                        <label class="py-2 text-red-600 font-bold text-xs">*can't change</label>
                    </div>
                    <input disabled id="email" type="email" placeholder={data.email} class="bg-gray-200 rounded-lg border-2 border-purple-600" />
                </div>
                <button type="submit" class="font-bold tracking-widest bg-purple-500 text-white text-2xl rounded-xl py-4 hover:bg-purple-400">
                    Update Information
                </button>
            </form>
        </div>
    );
}