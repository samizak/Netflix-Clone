import bcrypt from "bcrypt";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, username, password } = await request.json();

    const existingUser = await prismadb.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      // return res.status(422).json({ error: "Email taken" });
      return NextResponse.json({ message: "Email taken" }, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        name: username,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    // return res.status(200).json(user);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    // return res.status(400).end();
    return NextResponse.json({ message: "An Error occurred" }, { status: 400 });
  }
}
