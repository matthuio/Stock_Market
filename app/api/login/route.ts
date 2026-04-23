// app/api/login/route.ts
"use server"
import { loginUser } from "@/Models/UserModel"
import { serialize } from "cookie"
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"


export async function POST(req: NextRequest) {
  const { username, password } = await req.json()

  console.log("RUN")
  const user = await loginUser(username, password)
  console.log(user)

  if (Number(user) == 404) {
    return NextResponse.json({ error: "Invalid login" }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set("session", JSON.stringify({
    userId: user[0].uuid,
    username: user[0].username,
  }), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  })

  return response
}


export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("session")
  
  if (!session) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 })
  }

  const sessionData = JSON.parse(session.value)
  return NextResponse.json({ user: sessionData })
}
export async function PATCH(req: NextRequest) {
  const { value } = await req.json()
  const cookieStore = await cookies()
  cookieStore.set("market-open", String(value), {
    maxAge: 2147483647
  })
  return NextResponse.json({ success: true })
}