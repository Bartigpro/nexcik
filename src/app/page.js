
"use client"
import Skibidi from "./components/contry"
import { useState, useEffect } from "react"

    

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
          data.map((src, idx) => 
            <Skibidi key={idx} kraj={src}/>
          )}


        </div>
        

    )
}