// import { getServerSession } from "next-auth";
// import authOptions from "./api/auth/[...nextauth]/options";
import { ClientPlayGame } from "../../../../components/index";

export const metadata = {
  title: "Game of Numbers - Play Now",
  description: "Welcome to the Game of Numbers"
};

export default async function PlayGame() {
  // const session = await getServerSession(authOptions);

  return (
      <ClientPlayGame session={null} />
  );
}
