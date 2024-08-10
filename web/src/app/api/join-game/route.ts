import { ABI, CONTRACT_ADDRESS } from "@/constants/contract";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    if (!process.env.BE_PRIVATE_KEY) throw new Error("BE_PRIVATE_KEY not set");

    const data = await req.json();
    const { gameId, randomNumber } = data;

    const provider = new JsonRpcProvider(
      "https://nova-0.gemini-3h.subspace.network/ws"
    );
    const signer = new Wallet(process.env.BE_PRIVATE_KEY, provider);
    const game = new Contract(CONTRACT_ADDRESS, ABI, signer);

    const hash = await game.joinGame(gameId, randomNumber);

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
