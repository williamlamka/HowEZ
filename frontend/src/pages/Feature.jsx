import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faAward, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faTruckFast, faAward, faCircleCheck);

export default function Feature(){
    return(
        <div>
            <h1 class="p-12 text-center text-purple-600 font-bold text-5xl tracking-wide">Top three features</h1>
            <div class="gap-24 p-24 flex flex-col items-center lg:flex-row">
                <div class="flex flex-col items-center py-12 gap-y-12 h-96 sm:w-1/2 md:w-1/3">
                    <FontAwesomeIcon icon="fa-truck-fast" size="4x"/>
                    <h1 class="text-3xl font-bold">Fast</h1>
                    <h3 class="text-xl font-bold">Shipping within 3 days</h3>
                </div>
                <div class="flex flex-col items-center py-12 gap-y-12 h-96 sm:w-1/2 md:w-1/3">
                    <FontAwesomeIcon icon="fa-circle-check" size="4x"/>
                    <h1 class="text-3xl font-bold">High Quanlity</h1>
                    <h3 class="text-xl font-bold">100% New </h3>
                </div>
                <div class="flex flex-col items-center py-12 gap-y-12 h-96 sm:w-1/2 md:w-1/3">
                    <FontAwesomeIcon icon="fa-award" size="4x"/>
                    <h1 class="text-3xl font-bold">Genuine</h1>
                    <h3 class="text-xl font-bold">Every product provided by relied supplier </h3>
                </div>
            </div>
        </div>
    )
}