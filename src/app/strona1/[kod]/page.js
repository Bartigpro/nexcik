"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

export default function Info({ params }) {
    const [kraj, setKraj] = useState();
    const [neighbours, setNeighbours] = useState([]);
    const [maxp, setMaxp] = useState(null)
    const [minp, setMinp] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.kod}`);
                const jsonres = await response.json();
                setKraj(jsonres[0]);

                // Fetch neighboring countries
                if (jsonres[0].borders) {
                    const bordersResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${jsonres[0].borders}`);
                    const bordersJson = await bordersResponse.json();
                    console.log(bordersJson)
                    setNeighbours(bordersJson);

                    const pops = bordersJson.map(kraj => kraj.population)
                    const maxpopulation = Math.max(...pops) 
                    const minpopulation = Math.min(...pops) 
                    console.log("max: " && maxpopulation)
                    console.log("max: " && minpopulation)
                    setMaxp(maxpopulation)
                    setMinp(minpopulation)


                }
            } catch (error) {
                console.log(error);
            }
            
        }
        getData();
    }, [params.kod]);

    return (
        <div className="justify-center text-center w-full h-screen relative flex flex-col items-center border-dashed bg-gray-600">
            {kraj && (
                <>
                    <div className="relative">
                        <Image
                            src={kraj.flags.png}
                            width="450"
                            height="300"
                        />
                    </div>
                    <h1>nazwa: {kraj.name.common}</h1>
                    <p>kod: {kraj.cca2}</p>
                    <p>alternatywa: {kraj.altSpellings[0]}</p>

                    {neighbours.length > 0 && (
                    <div>
                    <h2>sąsiednie sigmy:</h2>
                    <div className="flex flex-wrap justify-center">
                        {neighbours.map(neighbour => (
                    <Link key={neighbour.cca2} href={`/strona1/${neighbour.cca2}`}  className={`m-2 p-2 border border-gray-300 rounded ${neighbour.population == maxp ? 'bg-green-500' : neighbour.population == minp ? 'bg-red-500' : ''}`}>
                    <div>
                    <Image
                    src={neighbour.flags.png}
                    width="200"
                     height="120"
                            
                        />
                       
                      <p>{neighbour.name.common}</p>
                      <p>{neighbour.cca2}</p>
                      <p>{neighbour.population}</p>
                         </div>
                    </Link>
                 ))}
            </div>
                        </div>
        )}
                </>
            )}
        </div>
    );
}