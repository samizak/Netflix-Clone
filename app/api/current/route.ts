import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prismadb from "@/libs/prismadb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "You are not logged in." });

    const currentUser = await prismadb.user.findUnique({
      where: {
        email: session.user?.email || "",
      },
    });
    if (!currentUser) return NextResponse.json({ message: "You are not logged in." });

    return NextResponse.json(currentUser, { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(400).end();
    return NextResponse.json({ message: "An Error occurred" }, { status: 400 });
  }
}
