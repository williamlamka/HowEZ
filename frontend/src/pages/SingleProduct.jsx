import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../component/Footer';
import Axios from "axios";
import { LoginContext } from "../context/LoginConext";

export default function SingleProduct() {
  const [product, setProduct] = useState({});
  const [errorPrompt, setErrorPrompt] = useState("");
  const Params = useParams("id");
  const navigate = useNavigate();

  const { loginStatus } = useContext(LoginContext);

  const addCartHandler = ((e) => {
    e.preventDefault();
    if (loginStatus) {
      Axios.post("https://how-ez.vercel.app/api/user/cart", {
        product_id: Params.id
      }, { withCredentials: true })
        .then((res) => {
          if (res.data.add) {
            setErrorPrompt("Add Successful");
          } else {
            setErrorPrompt("Add Unsuccessful");
          }
        });
    } else {
      navigate("/login");
    }
  });

  const checkOutHandler = ((e) => {
    e.preventDefault();
    if (loginStatus) {
      Axios.post("https://how-ez.vercel.app/api/user/cart", {
        product_id: Params.id
      }, { withCredentials: true })
        .then((res) => {
          if (res.data.add) {
            setErrorPrompt("Add Successful");
            navigate("/payment");
          } else {
            setErrorPrompt("Add Unsuccessful");
          }
        });
    } else {
      navigate("/login");
    }
  });

  useEffect(() => {
    Axios.get(`https://how-ez.vercel.app/api/product/${Params.id}`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data);
        } else {
          console.log("error");
        }
      })
  }, [])

  return (
    <div className="bg-white">
      <div>
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-w-10 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.imageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-10 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.subimageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <div class="flex gap-x-12">
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
              <h3 class="pt-2 text-red-600 font-bold">{errorPrompt}</h3>
            </div>

            <form className="flex flex-col gap-y-6 mt-6 ">
              <button
                onClick={(e) => { addCartHandler(e) }}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
              <button
                onClick={(e) => { checkOutHandler(e) }}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-600 py-3 px-8 text-base font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Check out
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
