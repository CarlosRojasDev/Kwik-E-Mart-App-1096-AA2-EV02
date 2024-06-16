import { useEffect } from "react";

export default function useBackground(bg){
    useEffect(()=>{
        document.body.classList.add(bg)

        return() =>{
            document.body.classList.remove(bg)
        }
    },[bg])
}