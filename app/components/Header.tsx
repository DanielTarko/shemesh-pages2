import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Link href="/" >
            <Image src="/orangelogo.png" alt="Unmind Logo" width={90} height={32} />
        </Link>
      </div>
      
      <div className="flex gap-2 items-center">
        <Link href="/sign-in" className="text-sm text-[#ff7a01] px-5 font-medium hover:underline">Sign in</Link>
        <Link href="/request-demo" className="bg-[#ff7a01] text-white font-semibold px-4 py-2 rounded-md text-sm shadow hover:bg-[#ff9333] transition">Request a demo</Link>
      </div>
    </header>
  );
}