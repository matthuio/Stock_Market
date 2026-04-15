"use client" 
import Link from "next/link"
type burgerMenuProps= {
    visible: Boolean;
};
export default function BurgerMenu({visible} : burgerMenuProps) {

    return(
    <aside
            className={`
                fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white
                transform transition-transform duration-300 ease-in-out
                ${visible ? "translate-x-0" : "-translate-x-full"}
            `}
            >
            <ol className="absolute top-20 w-full h-full">
                <Link href="/FrontPage">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Home
                    </li>
                </Link>
                <Link href="/profile/Matthew">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Your Profile
                    </li>
                </Link>
                <Link href="/FrontPage">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Bets
                    </li>
                </Link>
                <Link href="/FrontPage">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Charts
                    </li>
                </Link>
                <Link href="/Login">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Login
                    </li>
                </Link>
                <Link href="/Logout">
                    <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300">
                        Logout
                    </li>
                </Link>

            </ol>
        </aside>
    );
}