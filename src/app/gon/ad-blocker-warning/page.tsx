// import { getServerSession } from "next-auth";
// import authOptions from "./api/auth/[...nextauth]/options";
import {ClientAds} from "../../../../components/index";


export const metadata = {
  title: "Game of Numbers - Home",
  description: "Welcome to the Game of Numbers"
};

export default async function Home() {
  // const session = await getServerSession(authOptions);

  return (
      <ClientAds />
  );
}
