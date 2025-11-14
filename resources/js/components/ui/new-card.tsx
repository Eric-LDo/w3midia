import { useState } from "react";

import { ChevronDown, ChevronUp } from 'lucide-react';
import Props from '@/interfaces/newsInterfaces';



export function NewCard({id, title, summary, description, image, status, category }:Props) {
    const [isOpen, setIsOpen] = useState(false);
    function toggleOpen() {
        setIsOpen(!isOpen);
    }
    return (

            <main key={id} className={`flex  w-full max-w-[335px]  lg:max-w-4xl  flex-col shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)]  overflow-hidden rounded bg-white dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d] ${status? '' : 'hidden'}`}>
                <div className="w-full flex flex-col-reverse lg:flex-row justify-center items-center">
                    <div className="flex-1 p-6 pb-12text-[13px] leading-[20px] lg:p-20">
                        <div className='w-full flex justify-end'><small className=' text-end text-gray-400'>{category.name}</small></div>
                        <h1 className="mb-1 font-medium text-2xl">
                            {title}
                        </h1>
                        <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                            {summary}
                        </p>


                    </div>
                    <div
                        className="relative aspect-[335/376] w-full lg:aspect-auto lg:w-[438px] lg:min-h-[376px] flex items-center justify-center bg-cover bg-center"
                        style={{ backgroundImage: `url(${image})` }}
                    />
                </div>

                {isOpen && (
                        <p className="p-6 lg:p-8 text-[#706f6c] dark:text-[#A1A09A]">
                            <hr/>
                            {description}
                            <hr/>
                        </p>
                    )}
                <button onClick={toggleOpen} className={`w-full mt-4 flex items-center justify-center gap-2 rounded-md  px-4 py-2 text-sm font-large ${isOpen? '' :'mt-[-39px]'} `}>
                        {isOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
            </main>
    );
}
