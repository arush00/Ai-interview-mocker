"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="flex p-4 justify-between items-center bg-secondary shadow-md">
      <Image src="/logo.svg" width={50} height={50} alt="logo" />
      <ul className="hidden md:flex gap-6">
        <Link href="/dashboard">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard" && "text-primary font-bold"
              }`}
          >
            Dashboard
          </li>
        </Link>
        <Link href="/ai-resume-builder">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/ai-resume-builder" && "text-primary font-bold"
              }`}
          >
            AI Resume
          </li>
        </Link>
        <Link href="/ai-cover-letter"> {/* ✅ Added AI Cover Letter Link */}
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/ai-cover-letter" && "text-primary font-bold"
              }`}
          >
            AI Cover Letter
          </li>
        </Link>
        <Link href="/ai-resume-analyzer">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/ai-resume-analyzer" && "text-primary font-bold"
              }`}
          >
            AI Resume Analyzer
          </li>
        </Link>
        <Link href="/dashboard/Upgrade">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/Upgrade" && "text-primary font-bold"
              }`}
          >
            Upgrade
          </li>
        </Link>
        <Link href="/dashboard/How-it-works">
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === "/dashboard/How-it-works" && "text-primary font-bold"
              }`}
          >
            How it Works
          </li>
        </Link>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
