import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." }, { status: 401 });

    const movieId = new URL(request.url).pathname.split("/").at(-1);
    if (typeof movieId !== "string") return NextResponse.json({ message: "'Invalid ID" }, { status: 404 });
    if (!movieId) return NextResponse.json({ message: "'Missing ID" }, { status: 404 });

    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    return NextResponse.json(movies, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An Error occurred" }, { status: 500 });
  }
}
