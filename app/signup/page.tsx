"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { getServerSideProps } from "@/Controllers/UserController"
import { createUser } from "@/Models/UserModel"

const Signup = () => {
  const router = useRouter();

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = async ()=>
  {
   var create = await createUser(username,password)
   if(create != 200)
   {
    toast("Username Already taken probably")
   }else{
        const res=await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json()
    if(data.error)
    {
      toast("Username or Password Invalid")
      return
    }else{
      router.push("/FrontPage");
    }
   }
  }
    return(
    <div className="flex justify-center items-center h-screen">
        <Toaster position='top-center'/>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your Username below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
              className="text-black"
                id="username"
                type="username"
                placeholder="Butterlet"
                required
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password? Contact an admin
                </a>
              </div>
              <Input className="text-black" value={password} onChange={(e)=> setPassword(e.target.value)} id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={(e)=>handleSubmit(e)}>
          Signup
        </Button>
      </CardFooter>
    </Card>
    </div>
    )
    
}

export default Signup
