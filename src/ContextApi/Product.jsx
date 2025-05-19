import React, { createContext, useContext, useState } from 'react'
const product=createContext();
export default function Product({children}) {
    const [productdata,setproductdata]=useState({});
  return (
   <product.Provider value={{productdata,setproductdata}}>
    {children}
   </product.Provider>
  )
}

export const useProduct=()=>useContext(product)
