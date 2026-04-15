"use client";
import { useEffect, useState,useRef } from "react";
import Link from "next/link"


type ListObject = {
  lists: Array<object>
}

export default function List({lists }: ListObject) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(([entry])=> {
        if (entry.isIntersecting){
          setVisible(true);
        }
      },
    {
      threshold: 0.4
    });
    if (ref.current)
    {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
    }, []);
    return(
        <div className="ml-6" ref={ref}>
            <ul className="list-disc ml-4">
            {lists?.map((list, index) => (
                <li
                key={index}
                className={`transition-all duration-700 ease-out ${
                    visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                }`}
                style={{
                    transitionDelay: `${index * 120}ms`,
                }}
                >
                <Link href={`/chart/${list.name}`}>
                    {list.name}
                </Link>
                </li>
            ))}
            </ul>
        </div>
    )
}