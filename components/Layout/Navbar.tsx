
'use client'

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from 'next-themes';
// import { MoonIcon, SunIcon } from "lucide-react";
// import { ComputerDesktopIcon } from "@heroicons/react/24/solid";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils'; // optional: className merge helper


const themes = [
  { label: 'Light', value: 'light', icon: SunIcon },
  { label: 'Dark', value: 'dark', icon: MoonIcon },
  { label: 'System', value: 'system', icon: ComputerDesktopIcon },
];


export default function HomeHeader() {
  const { theme, setTheme } = useTheme();
  const activeTheme = themes.find((t) => t.value === theme);
  
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 ">

    {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md relative">
        <h1 className="text-2xl font-bold">Game of Numbers</h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              {activeTheme && <activeTheme.icon className="w-5 h-5" />}
              {/* {activeTheme?.label} */}
              <ChevronDownIcon className="w-4 h-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" >
            {themes.map(({ label, value, icon: Icon }) => (
              <DropdownMenuItem
                key={value}
                onClick={() => setTheme(value)}
                className={cn(
                  'flex items-center gap-2 cursor-pointer ',
                  theme === value && 'font-semibold text-blue-600 dark:text-yellow-600'
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          className="md:hidden p-2 rounded focus:outline-none"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle navigation"
        >
          {navOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-4 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/gon/play">Play Now</Link>
          <Link href="/gon/wallet">Wallet</Link>
          <Link href="/lmacm/images">Images</Link>
          <Link href="/lmacm/about">About</Link>
          <Link href="/lmacm/support-us">Donate</Link>
          <Link href="/auth/login">Sign In</Link>
        </nav>
        {/* Mobile nav */}
        {navOpen && (
          <nav className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md flex flex-col gap-2 p-4 md:hidden z-20">
            <Link href="/" onClick={() => setNavOpen(false)}>Home</Link>
            <Link href="/gon/play" onClick={() => setNavOpen(false)}>Play Now</Link>
            <Link href="/gon/wallet" onClick={() => setNavOpen(false)}>Wallet</Link>
            <Link href="/lmacm/images" onClick={() => setNavOpen(false)}>Images</Link>
            <Link href="/lmacm/about-us" onClick={() => setNavOpen(false)}>About Us</Link>
            <Link href="/lmacm/support-us" onClick={() => setNavOpen(false)}>Donate</Link>
            <Link href="/auth/login" onClick={() => setNavOpen(false)}>Sign In</Link>
          </nav>
        )}
      </header>

    </div>
  );
}
