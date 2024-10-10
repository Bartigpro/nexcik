"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

export default function Info({ params }) {
    const [kraj, setKraj] = useState();
    const [neighbours, setNeighbours] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${params.kod}`);
                const jsonres = await response.json();
                setKraj(jsonres[0]);

                // Fetch neighboring countries
                if (jsonres[0].borders) {
                    const bordersResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${jsonres[0].borders.join(',')}`);
                    const bordersJson = await bordersResponse.json();
                    setNeighbours(bordersJson);
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
                    <h2>Neighboring Countries:</h2>
                    <div className="flex flex-wrap justify-center">
                        {neighbours.map(neighbour => (
                    <Link key={neighbour.cca2} href={`/strona1/${neighbour.cca2}`} className="m-2 p-2 border border-gray-300 rounded">
                    <div>
                    <Image
                    src={neighbour.flags.png}
                    width="50"
                     height="30"
               
                        />
                      <p>{neighbour.name.common}</p>
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