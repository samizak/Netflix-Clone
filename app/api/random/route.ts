import bcrypt from "bcrypt";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovies[0], { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(400).end();
    return NextResponse.json({ message: "An Error occurred" }, { status: 400 });
  }
}
