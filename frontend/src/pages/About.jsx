
const info = [
    {"attribute": "GitHub", "value": "https://github.com/williamlamka", "image": "github.png"},
    {"attribute": "Linkedin", "value": "https://www.linkedin.com/in/william-lam-69644b239/", "image": "linkedin.png"}
]

export default function About(){
    return (
        <div>
            <div class="flex flex-col py-12 gap-y-20">
                <div class="flex flex-col gap-y-6 items-center">
                    <h1 class="text-purple-600 text-5xl font-bold capitalize underline">Our goal</h1>
                    <div class="text-xl text-center tracking-wider font-bold leading-10 w-1/2">
                        <h3>Our online shop website makes shopping convenient and easy. 
                            With a wide range of products, secure payment options, 
                            and fast shipping, 
                            customers can find what they need and have it delivered to their door. 
                            Our user-friendly interface and 24/7 customer support ensure a seamless shopping experience. 
                            Shop with us today!
                        </h3>
                    </div>
                </div>
                <div class="flex flex-col items-center">
                    <h1 class="text-purple-600 text-5xl font-bold capitalize underline pb-6">Contact Us</h1>
                    <div class="flex flex-col gap-y-6">
                        <div class="flex text-xl gap-x-2">
                            <img src="/gmail.png" alt="gmail" class="h-6" />
                            <h3 class="font-bold">Email:</h3>
                            <h3>williamwantwork@gmail.com</h3>
                        </div>
                        {info.map((item) => (
                            <div class="flex text-xl gap-x-2">
                                <img src={item.image} alt={item.attribute} class="h-6" />
                                <h3 class="font-bold">{item.attribute}:</h3>
                                <a href={item.value}>{item.value}</a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}