import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useState, useContext } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../context/LoginConext';


export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const { setUserId, setLoginStatus, setUserName } = useContext(LoginContext);
  const [errorPrompt, setErrorPrompt] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await Axios.post("http://localhost:3005/api/auth/login", {
      email: data.email,
      password: data.password
    }, { withCredentials: true })
      .then(res => {
        if (res.data.auth) {
          setUserName(res.data.name);
          setLoginStatus(true);
          setUserId(res.data.id);
          navigate("/");
        } else {
          setErrorPrompt(res.data.detail);
        }
      })
  }

  function onChangeHandler(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function onClickHandler(e) {
    window.open("http://localhost:3005/api/auth/google", "_self");
  }

  return (
    <>
      <div className="mt-12 mb-48 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png"
              alt="HowEZ Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in your account
            </h2>
          </div>
          <h3 class="text-red-600 font-bold text-center">{errorPrompt}</h3>
          <div class="">
            <form onSubmit={(e) => { onSubmitHandler(e) }} className="mt-8 space-y-6">
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    value={data.email}
                    onChange={(e) => {
                      onChangeHandler(e)
                    }}
                    type="email"
                    autoComplete="email"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    value={data.password}
                    onChange={((e) => {
                      onChangeHandler(e)
                    })}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Sign in
                </button>
              </div>
            </form>
          </div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-b border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-4 text-sm text-gray-500">Or</span>
            </div>
          </div>
          <div>
            <button
              onClick={(e) => { onClickHandler(e) }}
              className=" group relative flex w-full justify-center rounded-md border-transparent bg-gray-100 py-2 px-4 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img src="/google.png" alt="Google icon" className="h-5 w-5" />
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

