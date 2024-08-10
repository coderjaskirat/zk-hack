import { ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    if (!process.env.BE_PRIVATE_KEY) throw new Error("BE_PRIVATE_KEY not set");

    const data = await req.json();
    console.log("data", data);
    const { maxPlayers, joinTime } = data;

    const provider = new JsonRpcProvider(
      "https://nova-0.gemini-3h.subspace.network/ws"
    );
    const signer = new Wallet(process.env.BE_PRIVATE_KEY, provider);
    const game = new Contract(CONTRACT_ADDRESS, ABI, signer);

    const tx = await game.createGame(
      maxPlayers && maxPlayers !== "" ? maxPlayers : 0,
      joinTime
    );

    return NextResponse.json({
      message: "Game created successfully",
      hash: tx.hash,
    });
  } catch (error) {
    console.error("Error processing game creation:", error);
    return NextResponse.json(
      { error: "Failed to create game" },
      { status: 500 }
    );
  }
};
