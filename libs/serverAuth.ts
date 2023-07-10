// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";

// import prismadb from "@/libs/prismadb";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// const serverAuth = async () => {
//   const session = await getServerSession(authOptions);

//   console.log(session);

//   if (!session?.user?.email) {
//     throw new Error("Not signed in");
//   }

//   const currentUser = await prismadb.user.findUnique({
//     where: {
//       email: session.user.email,
//     },
//   });

//   if (!currentUser) {
//     throw new Error("Not signed in");
//   }

//   return { currentUser };
// };

// export default serverAuth;
