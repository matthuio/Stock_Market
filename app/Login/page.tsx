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

const Login = () => {
  const router = useRouter();

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const handleSubmit = async ()=>
  {
    console.log("Checking")
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
      router.push("/");
    }
  }
  useEffect(()=>
  {
    const run = async () =>
    {
    const res = await fetch("/api/login", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    const data = await res.json()
    console.log(data)
    if(data.user.userId)
    {
      router.push("/")
    }
    }
    run()
  },[])
    return(
    <div className="flex justify-center items-center h-screen">
        <Toaster position='top-center'/>
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your Username below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
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
          Login
        </Button>
      </CardFooter>
    </Card>
    </div>
    )
    
}

export default Login
