import { ABI } from "@/constants/contract";
import { nova } from "@/constants/network";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    if (!process.env.BE_PRIVATE_KEY) throw new Error("BE_PRIVATE_KEY not set");
    if (!process.env.CONTRACT_ADDRESS)
      throw new Error("CONTRACT_ADDRESS not set");

    const data = await req.json();
    const { maxPlayers, joinTime } = data;

    const provider = new JsonRpcProvider(
      "https://nova-0.gemini-3h.subspace.network/ws"
    );
    const signer = new Wallet(process.env.BE_PRIVATE_KEY, provider);
    const game = new Contract(process.env.CONTRACT_ADDRESS, ABI, signer);

    const hash = await game.createGame(maxPlayers, joinTime);

    return NextResponse.json({
      message: "Game created successfully",
      hash: hash.hash.toHex(),
    });
  } catch (error) {
    console.error("Error processing game creation:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
};
