"use client" 
import Link from "next/link"
import { Button } from "./ui/button";
import { logout } from "@/app/api/login/route";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

type burgerMenuProps= {
    visible: Boolean;
};
export default function BurgerMenu({visible} : burgerMenuProps) {
    const router = useRouter()
    const [username,setUsername] = useState("")
    const handleLogout =async (e) =>
    { 
        
        logout()
        router.push("/login")
    }
    useEffect( ()=>
    {
        const run = async() =>
        {
            const res = await fetch("/api/login", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
            })
            const data = await res.json()
            console.log(data)
            setUsername(data.user.username)
        
        }
        run()

    },[])
    return(
    <aside
            className={`
                fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white
                transform transition-transform duration-300 ease-in-out
                z-30
                ${visible ? "translate-x-0" : "-translate-x-full"}
            `}
            >
            <ol className="absolute top-20 w-full h-full">
                <Link href="/">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Home
                    </li>
                </Link>
                <Link href={`/profile/${username}`}>
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Your Profile
                    </li>
                </Link>
                <Link href="/bets">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Bets
                    </li>
                </Link>
                <Link href="/charts">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Charts
                    </li>
                </Link>
                <div onClick={(e)=>handleLogout(e)}>
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Logout
                    </li>
                </div>

            </ol>
        </aside>
    );
}