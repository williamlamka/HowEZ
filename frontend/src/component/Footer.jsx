import { Link } from "react-router-dom"

export default function Footer(){
    return(  
        <footer class="p-4 bg-white sm:p-6 light:bg-gray-900">
            <div class="md:flex md:justify-between">
                <div class="mb-6 md:mb-0">
                    <Link to="https://flowbite.com/" class="flex items-center">
                        <img src="/logo.png" class="mr-3 h-8" alt="HowEZ Logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-black">HowEZ</span>
                    </Link>
                </div>
                <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Follow us</h2>
                        <ul class="text-gray-600 dark:text-gray-400">
                            <li class="mb-4 flex space-x-2">
                                <a href="https://github.com/williamlamka" class="hover:underline">Github</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </li>
                            <li class="mb-4 flex space-x-2">
                                <a herf="https://www.linkedin.com/in/william-lam-69644b239/" class="hover:underline">LinkedIn</a>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-black">Legal</h2>
                        <ul class="text-gray-600 dark:text-gray-400">
                            <li class="mb-4">
                                <Link to="#" class="hover:underline">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link to="#" class="hover:underline">Terms &amp; Conditions</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-center">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="" class="hover:underline">HowEZ™</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>

    )
}
