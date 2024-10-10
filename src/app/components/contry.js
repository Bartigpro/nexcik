import Image from "next/image";
import Link from "next/link";

export default function Skibidi({kraj}){
    return (
    <div className="w-[255px] border bg-cyan-300">
        <div className=" relative w-full h-[100px]">
        <Image
src={kraj.flags.png}
layout="fill"

alt={kraj.name.common}
/>

        </div>




<h1 className="text-center font-bold"> {kraj.name.common} </h1>

<ul>
    <li>{kraj.capital}</li>
    <li>{kraj.population}</li>
</ul>
</div>
    )
}