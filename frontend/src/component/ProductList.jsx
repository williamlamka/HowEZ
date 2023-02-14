import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function ProductList(props) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3005/api/product")
            .then((res) => {
                if (res.status === 200) {
                    setProducts(res.data);
                }
            })
    }, [])

    return (
        <div>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-12 lg:max-w-7xl lg:px-12">
                    <h2 class="text-4xl font-bold tracking-tight text-red-500 underline mb-6 ml-6">{props.category}</h2>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <div>
                                <Link key={product._id} to={`/product/${product._id}`} className="group">
                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                        <img
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                </Link>
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-gray-900">${product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

