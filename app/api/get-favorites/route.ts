import prismadb from "@/libs/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." });

    const _user = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email as any,
      },
    });
    if (!_user) throw new Error("Invalid ID");

    const favoritedMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: _user.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoritedMovies, { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(400).end();
    return NextResponse.json({ message: "An Error occurred" }, { status: 400 });
  }
}
