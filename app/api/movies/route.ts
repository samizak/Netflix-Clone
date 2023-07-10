import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const movies = await prismadb.movie.findMany();
    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
