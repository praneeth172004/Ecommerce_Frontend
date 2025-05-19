import React, { createContext, useContext, useState } from 'react'


const Datapass=createContext();
export default function Datapassing({children}) {
    const [data,setdata]=useState('');
   

    return (
        <Datapass.Provider value={{setdata,data}}>
            {children}
        </Datapass.Provider>

    
  )
}


export const useData=()=>useContext(Datapass);