import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      }
    );

    const data = await response.json();
    await setCookie(data.token);
  } catch (error) {
    return new NextResponse("Invalid crendentials", { status: 500 });
  }
}
