"use client";
import React from 'react'
import { useEffect, useState,useRef } from "react";

const HeroSection = () => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false);
  const [username,setUsername] = useState("")
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
  return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex items-center justify-center h-screen">
      <h1
        className={`text-3xl font-bold transition-all duration-700 ease-out font-sans
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
      >
        Welcome Back, {username}
      </h1>
    </div>
  );
}

export default HeroSection