import Footer from "../component/Footer";
import ProductList from "../component/ProductList";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginConext";


export default function Home(){
  const {loginStatus} = useContext(LoginContext);

  return(
    <div class="bg-white">
      <div class="mx-12 mt-12 mb-16 flex flex-col lg:flex-row items-center rounded-lg bg-gray-100 justify-center">
        <div class="w-full">
          <img class="h-[40rem] w-full rounded-lg md:rounded-" src="/p1.jpg" alt="" />
        </div>
        <div class="text-center">
          {loginStatus?
            <p class="p-20 pt-10 pb-16 text-purple-600 font-bold text-8xl tracking-wide">Welcome to HowEZ!</p>:
            <p class="p-20 pt-10 pb-16 text-purple-600 font-bold text-8xl tracking-wide">Start Your First Easy Shopping!</p>
          }
          <div class="py-12 lg:py-0 flex space-x-20 place-content-center">
            {loginStatus?
            <Link class="inline-block bg-purple-500 text-white font-bold text-2xl rounded-full w-52 px-6 py-4 hover:bg-purple-600" to="/products">See Product</Link>:
            <Link class="inline-block bg-purple-500 text-white font-bold text-2xl rounded-full w-52 px-6 py-4 hover:bg-purple-600" to="/register">Get Start</Link>
            }
            <Link class="inline-block bg-gray-500 text-white font-bold text-2xl rounded-full w-52 px-6 py-3 hover:bg-gray-400" to="/features">Learn More</Link>
          </div>
        </div>
      </div>
      <ProductList category="HOT" />
      <hr class="my-6 w-5/6 border-gray-200 sm:mx-auto gray-700 lg:my-8" />
      <ProductList category="NEW" />
      <Footer />
    </div>
  )
}
