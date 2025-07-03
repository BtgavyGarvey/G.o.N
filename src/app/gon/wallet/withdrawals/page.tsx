// import { getServerSession } from "next-auth";
// import authOptions from "./api/auth/[...nextauth]/options";
import { ClientWalletWithdrawals } from "../../../../../components/index";

export const metadata = {
  title: "Game of Numbers - Play Now",
  description: "Welcome to the Game of Numbers"
};

export default async function Wallet() {
  // const session = await getServerSession(authOptions);

  return (
      <ClientWalletWithdrawals session={null} />
  );
}
