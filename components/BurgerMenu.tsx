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
                <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300" onClick={()=>{
                    document.getElementById("summary")?.scrollIntoView({
                        behavior:"smooth",
                    });
                }}>
                    Summary
                </li>
                <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300" onClick={()=>{
                    document.getElementById("python")?.scrollIntoView({
                        behavior:"smooth",
                    });
                }}>
                    Python Projects
                </li>
                <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300" onClick={()=>{
                    document.getElementById("csharp")?.scrollIntoView({
                        behavior:"smooth",
                    });
                }}>
                    C# Projects
                </li>
                <li className="px-4 py-4 cursor-pointer font-sans hover:bg-blue-900 transition-colors ease-in-out duration-300" onClick={()=>{
                    document.getElementById("summary")?.scrollIntoView({
                        behavior:"smooth",
                    });
                }}>
                    WebApp Projects
                </li>
            </ol>
        </aside>
    );
}