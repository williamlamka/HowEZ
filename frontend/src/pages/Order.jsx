

export default function Order(){
    return (
        <div>
            <div class="flex flex-col mx-12 gap-y-6">
                <h1 class="text-purple-600 font-bold text-3xl">My Order</h1>
                <table class="border border-purple-700">
                    <thead class="text-center bg-purple-300 text-gray-900">
                        <tr class="h-12 text-xl">
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td>Malcolm Lockyer</td>
                            <td>1961</td>
                        </tr>
                        <tr>
                            <td>Witchy Woman</td>
                            <td>The Eagles</td>
                            <td>1972</td>
                        </tr>
                        <tr>
                            <td>Shining Star</td>
                            <td>Earth, Wind, and Fire</td>
                            <td>1975</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}