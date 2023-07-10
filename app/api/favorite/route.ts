import prismadb from "@/libs/prismadb";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { without } from "lodash";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." });

    const { movieId } = await request.json();
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) throw new Error("Invalid ID");

    const user = await prismadb.user.update({
      where: {
        email: session?.user?.email || "",
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(400).end();
    return NextResponse.json({ message: "An Error occurred" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." });

    const { movieId } = await request.json();
    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) throw new Error("Invalid ID");

    const _user = await prismadb.user.findUnique({
      where: {
        email: session?.user?.email as any,
      },
    });
    if (!_user) throw new Error("Invalid ID");

    const updatedFavoriteIds = without(_user.favoriteIds, movieId);
    const user = await prismadb.user.update({
      where: {
        email: session?.user?.email || "",
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(400).end();
    return NextResponse.json({ message: "An Error occurred" }, { status: 400 });
  }
}
