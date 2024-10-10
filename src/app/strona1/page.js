
"use client"
import Skibidi from "../components/contry"
import { useState, useEffect } from "react"
import Link from "next/link"
    

export default function Page2() {
    const [data, setdata] = useState()
    useEffect(() => {
        const getData = async () => {

            try{
                const data = await fetch("https://restcountries.com/v3.1/all")
                const jsondata = await data.json()
                console.log(jsondata)
                setdata(jsondata)


            }
            catch(error){
                console.log(error)

                
            }
            finally{


            }
        }
        getData()
    }, [])



    return (

        
        
        <div className="flex flex-wrap gap-2">
          
          {data &&
          data.map((kraj, idx) =>
            <Link key={idx} href={`/strona1/${kraj.cca2}`}> 
            <Skibidi kraj={kraj}/>
            </Link>
          
)
        }
        </div>

        
        
    
    )
}