import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: ""
};

export default function Register() {
    const [data, setData] = useState(INITIAL_STATE);
    const [errorPrompt, setErrorPrompt] = useState("");
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        await Axios.post("http://localhost:3005/api/auth/register", {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            address: data.address
        })
            .then((res) => {
                if (res.data.registered) {
                    navigate("/login");
                } else {
                    setErrorPrompt(res.data.detail);
                }
            })
    };

    const dataHandler = e => {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    return (
        <div>
            <div class="mx-12 mt-12 flex flex-col lg:flex-row items-center rounded-lg bg-gray-100 justify-center">
                <div class="w-full">
                    <img class="h-[40rem] w-full rounded-lg md:rounded-" src="/p2.jpg" alt="" />
                </div>
                <div class="flex flex-col items-center gap-y-6 mx-12">
                    <div class="flex gap-x-12 font-bold">
                        <img src="/logo.png" alt="HowEZ Logo" class="h-24" />
                        <h1 class="pt-8 text-3xl">HowEZ</h1>
                    </div>
                    <h3 class="text-red-600 font-bold">{errorPrompt}</h3>
                    <form onSubmit={(e) => submitHandler(e)} class="flex flex-col gap-y-6 text-xl">
                        <div class="flex gap-x-12">
                            <div class="flex flex-col">
                                <div>
                                    <label class="font-bold text-red-600">*</label>
                                    <label class="font-bold">First name</label>
                                </div>
                                <input required onChange={(e) => dataHandler(e)} id="firstName" value={data.firstName} class="rounded-lg border-2 border-purple-600" />
                            </div>
                            <div class="flex flex-col">
                                <div>
                                    <label class="font-bold text-red-600">*</label>
                                    <label class="font-bold">Last name</label>
                                </div>
                                <input required onChange={(e) => dataHandler(e)} id="lastName" value={data.lastName} class="rounded-lg border-2 border-purple-600" />
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <label class="font-bold">Shipping address</label>
                            <input onChange={(e) => dataHandler(e)} id="address" value={data.address} class="rounded-lg border-2 border-purple-600" />
                        </div>
                        <div class="flex flex-col">
                            <div>
                                <label class="font-bold text-red-600">*</label>
                                <label class="font-bold">Email address</label>
                            </div>
                            <input required onChange={(e) => dataHandler(e)} id="email" value={data.email} type="email" placeholder="@example.com" class="rounded-lg border-2 border-purple-600" />
                        </div>
                        <div class="flex flex-col">
                            <div>
                                <label class="font-bold text-red-600">*</label>
                                <label class="font-bold">Password</label>
                            </div>
                            <input required onChange={(e) => dataHandler(e)} id="password" type="password" value={data.password} class="rounded-lg border-2 border-purple-600" />
                        </div>
                        <div class="flex flex-col">
                            <div>
                                <label class="font-bold text-red-600">*</label>
                                <label class="font-bold">Confirm Password</label>
                            </div>
                            <input required onChange={(e) => dataHandler(e)} id="confirmPassword" type="password" value={data.confirmPassword} class="rounded-lg border-2 border-purple-600" />
                        </div>
                        <button type="submit" class="font-bold tracking-widest bg-purple-500 text-white text-2xl rounded-xl py-4 hover:bg-purple-300">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}