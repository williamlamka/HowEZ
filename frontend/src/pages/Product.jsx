import Footer from "../component/Footer"
import ProductList from "../component/ProductList"

export default function Product(){
    return(
        <div>
            <div>
                <div className="mx-auto max-w-2xl px-4 sm:pb-0 sm:px-12 lg:max-w-7xl lg:px-12">
                    <h2 className="text-3xl font-bold tracking-tight text-purple-600 underline">All Products</h2>
                </div>
                <ProductList />
            </div>
            <Footer />
        </div>
    )
}