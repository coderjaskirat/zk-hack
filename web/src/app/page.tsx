import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-brand">
      <div className="p-2 bg-white rounded-full shadow-lg mb-12">
        <Image
          src="/logo.png"
          alt="Pictionary Proof Logo"
          className="mb-10"
          width={300}
          height={300}
        />
      </div>

      <div className="w-full max-w-4xl p-8 text-center shadow-lg rounded-xl bg-white">
        <h1 className="text-4xl font-bold text-brand-darker">
          Pictionary Proof
        </h1>

        <p className="my-4 text-lg text-gray-600">
          Pick, draw, guess, and have fun in groups of any size!
        </p>

        <div className="flex flex-col items-center justify-center gap-4 mt-8">
          <button className="w-48 rounded-lg bg-brand-400 py-3 px-6 text-xl font-semibold text-white hover:bg-brand-darker">
            Create Game
          </button>
          <button className="w-48 rounded-lg bg-brand-300 py-3 px-6 text-xl font-semibold text-white hover:bg-brand-500">
            Join Game
          </button>
        </div>
      </div>

      <footer className="w-full max-w-5xl mt-16 text-center text-md text-black">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created with ❤️ at{" "}
          <Image
            src="/zk-hack.svg"
            alt="ZK Hack Logo"
            className="inline"
            width={48}
            height={48}
          />
        </a>
      </footer>
    </main>
  );
}
