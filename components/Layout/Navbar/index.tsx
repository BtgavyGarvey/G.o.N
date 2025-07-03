/* eslint-disable */

'use client'
import React, { useEffect, useMemo, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
  Navbar,
  Button,
} from "@material-tailwind/react";
import {
  ChartBarIcon,
  Cog8ToothIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  MusicalNoteIcon,
  PhotoIcon,
  PresentationChartBarIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { HandHeart, Home, Image as ImageIcon, Loader2, Music, UploadCloud, UserCog2, Video } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { admin_logo, avatar_img, lms_logo, lms_main_logo, redirectTo, super_admin_logo } from "../utils";
import Image from "next/image";

interface SessionUser {
  name?: string;
  image?: string;
  role?: string;
  [key: string]: any;
}

interface Session {
  user?: SessionUser;
  [key: string]: any;
}

interface NavbarProps {
  session?: Session | null;
}

export default function LegionMariaNavbarWithSidebar({ session }: NavbarProps) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [accordionOpen, setAccordionOpen] = useState<number>(0);
  const [searchInputOpen, setSearchInputOpen] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [loading1, setLoading1] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);
  const [loading3, setLoading3] = useState<boolean>(false);
  const [userImageUrl, setUserImageUrl] = useState<string>(
    `/api/media/url/${session?.user?.image || avatar_img}`
  );
  const [search, setSearch] = useState<string>('');

  const pathname = usePathname();

  const matchedMedia = useMemo(() => {
    const segments = pathname.split('/');
    const target = ['images', 'videos', 'audios'];
    return segments.find((seg) => target.includes(seg)) || null;
  }, [pathname]);

  const matchedMediaLetter = useMemo(() => {
    const segments = pathname.split('/');
    const target = ['i', 'v', 'a'];
    return segments.find((seg) => target.includes(seg)) || null;
  }, [pathname]);

  const isAuthenticated = !!session?.user;

  const handleAccordionToggle = (value: number) => {
    setAccordionOpen(accordionOpen === value ? 0 : value);
  };

  const handleUploadClick = () => {
    if (isAuthenticated) redirectTo('/lmacm/stream/upload')
    else redirectTo('/lmacm/auth/login?callbackUrl=/lmacm/stream/upload')
  };

  useEffect(()=>{
    const a= matchedMedia || matchedMediaLetter;
    if (a) {
      setSearchInputOpen(true);
    }
  },[matchedMedia, matchedMediaLetter])

  const handleSearchClick = () => {

    let url='/lmacm/videos'

    
    if (matchedMedia==='videos' || matchedMediaLetter==='v') {
      url=url
    } else if (matchedMedia==='audios' || matchedMediaLetter==='a') {
      url='/lmacm/audios'
    } else if (matchedMedia==='images' || matchedMediaLetter==='i') {
      url='/lmacm/images'
    }
    else{
      setSearchInputOpen(false);
    }
    let s=search.trim()

    window.location.href = s ? `${url}?search=${s}` : url;

    // router.push(`${url}?search=${!s ? '' : s}`);

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let s=search.trim()
    if (e.key === 'Enter' && s) {
      handleSearchClick();
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar className="bg-gradient-to-r from-blue-gray-900 to-blue-gray-800 px-4 py-3 shadow-md text-black dark:text-white dark:bg-zinc-900" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
        <div className="flex items-center justify-between w-full">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <>
              <Bars3Icon
                onClick={() => setDrawerOpen(true)}
                className="h-8 w-8 cursor-pointer text-black dark:text-white"
              />
              <div className="flex-col items-center gap-2 md:flex">
                <div className="h-8 w-12 rounded overflow-hidden relative">
                  <Image
                    src={lms_main_logo}
                    alt="Legion Maria Stream"
                    width={48}
                    height={32}
                    className="object-cover h-8 w-12"
                    unoptimized // Remove this if you configure next.config.js for this domain
                  />
                </div>
                <Typography
                  variant="h6"
                  className="font-bold text-black dark:text-white"
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  L.M.<span className="text-red-600">S</span>
                </Typography>
              </div>
            </>
          </div>

          {/* Center: Search */}
          {searchInputOpen && (
          <div className="flex justify-center w-full px-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search media"
                className="w-full pl-1 pr-12 py-2 rounded-md border border-blue-gray-600 bg-white text-blue-gray-900 placeholder-blue-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-blue-gray-500 focus:border-transparent
                  dark:bg-zinc-600 dark:text-white dark:placeholder-blue-gray-300"
              />
              <MagnifyingGlassIcon className="absolute right-3 top-2.5 h-6 w-6 text-blue-gray-400 dark:text-blue-gray-200 cursor-pointer " onClick={handleSearchClick}/>
            </div>
          </div>
          )}

          {/* Right section */}

          {/* Right: Upload */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUploadClick}
              className="flex items-center cursor-pointer gap-2 px-2 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition whitespace-nowrap"
            >
              <UploadCloud className="h-6 w-6" />
            </button>
          </div>
        </div>
      </Navbar>

      {/* Sidebar Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="p-0 z-40 dark:bg-zinc-900"
        overlayProps={{
          className: "bg-transparent"
        }}
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Card
          className="h-screen w-full p-4 shadow-lg bg-gray-100 dark:bg-zinc-900 dark:text-white"
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <Image
              src={lms_logo}
              alt="Legion Maria Stream"
              width={64}
              height={48}
              className="h-12 w-16 rounded object-cover transition-transform duration-300"
              unoptimized // Remove if you configure next.config.js for this domain
              />
              <Typography
              variant="h5"
              color="blue-gray"
              className="text-center font-bold"
              placeholder={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              >
              Legion Maria <span className="text-red-600">Stream</span>
              </Typography>
            </div>
            <XMarkIcon className="h-8 w-8 cursor-pointer" onClick={() => setDrawerOpen(false)} />
          </div>

          <div className="overflow-y-auto">
            {/* Super Admin */}
            {session?.user?.role === 'super' && (
              <List
                placeholder={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <Accordion
                  open={accordionOpen === 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 1 ? "rotate-180" : ""}`}
                    />
                  }
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem
                    className="p-0"
                    selected={accordionOpen === 1}
                    placeholder={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <AccordionHeader
                      onClick={() => handleAccordionToggle(1)}
                      className="border-b-0 p-3 gap-2 text-center"
                      placeholder={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <ListItemPrefix
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        <img
                          src={super_admin_logo}
                          alt="User Avatar"
                          className="w-9 h-9 rounded-full object-cover transition-transform duration-300"
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal font-semibold"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Super Administrator
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List
                      className="p-0"
                      placeholder={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <Link href="/lmacm/stream/admin/super/dashboard">
                        <ListItem
                          className="flex-1 gap-2 dark:text-white"
                          placeholder={undefined}
                          onResize={undefined}
                          onResizeCapture={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <PresentationChartBarIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Dashboard
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/admin/super/videos">
                        <ListItem
                          className="flex-1 gap-2 dark:text-white"
                          placeholder={undefined}
                          onResize={undefined}
                          onResizeCapture={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <UserCog2 strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Administrators
                        </ListItem>
                      </Link>
                      
                    </List>
                  </AccordionBody>
                </Accordion>
              </List>
            )}

            {/* Admin */}
            {(session?.user?.role === 'super' || session?.user?.role === 'admin') && (
              <List placeholder={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}>
                <Accordion
                  open={accordionOpen === 2}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 2 ? "rotate-180" : ""}`}
                    />
                  }
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem
                    className="p-0"
                    selected={accordionOpen === 2}
                    placeholder={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <AccordionHeader
                      onClick={() => handleAccordionToggle(2)}
                      className="border-b-0 p-3 gap-2 text-center"
                      placeholder={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <img
                          src={admin_logo}
                          alt="User Avatar"
                          className="w-9 h-9 rounded-full object-cover transition-transform duration-300"
                        />
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal font-semibold"
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        Administrator
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0" placeholder={undefined}
                      onResize={undefined}
                      onResizeCapture={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}>
                      <Link href="/lmacm/stream/admin/dashboard">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <PresentationChartBarIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Dashboard
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/admin/analytics">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <ChartBarIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Analytics
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/admin/reports/media">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <VideoCameraIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Media Report
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/admin/users">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <MusicalNoteIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Users Report
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/images">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix
                            placeholder={undefined}
                            onResize={undefined}
                            onResizeCapture={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <PhotoIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Images
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/admin/settings">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <Cog8ToothIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Settings
                        </ListItem>
                      </Link>
                    </List>
                  </AccordionBody>
                </Accordion>
              </List>
            )}

            {/* User */}
            <List placeholder={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}>
              {session?.user && (
                <Accordion
                  open={accordionOpen === 3}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 3 ? "rotate-180" : ""}`}
                    />
                  }
                  placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <ListItem className="p-0" selected={accordionOpen === 3} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <AccordionHeader
                      onClick={() => handleAccordionToggle(3)}
                      className="border-b-0 p-3 gap-2 text-center" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                      <ListItemPrefix
                        placeholder={undefined}
                        onResize={undefined}
                        onResizeCapture={undefined}
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      >
                        {/* Use next/image for optimized loading */}
                        <div className="w-9 h-9 rounded-full overflow-hidden">
                          <Image
                            src={userImageUrl}
                            alt="User Avatar"
                            width={36}
                            height={36}
                            className="object-cover w-full h-full transition-transform duration-300"
                            unoptimized // Remove this if your loader supports external domains or configure domains in next.config.js
                          />
                        </div>
                      </ListItemPrefix>
                      <Typography color="blue-gray" className="mr-auto font-normal font-semibold" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        {session?.user?.name}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List 
                    className="p-0"
                    placeholder={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    >
                      <Link href="/lmacm/stream/dashboard">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <PresentationChartBarIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          My Dashboard
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/videos">
                        <ListItem
                          className="flex-1 gap-2 dark:text-white"
                          placeholder={undefined}
                          onResize={undefined}
                          onResizeCapture={undefined}
                          onPointerEnterCapture={undefined}
                          onPointerLeaveCapture={undefined}
                        >
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <VideoCameraIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          My Videos
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/audios">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <MusicalNoteIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          My Audios
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/images">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix
                            placeholder={undefined}
                            onResize={undefined}
                            onResizeCapture={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            <PhotoIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          My Images
                        </ListItem>
                      </Link>
                      <Link href="/lmacm/stream/settings">
                        <ListItem className="flex-1 gap-2 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <Cog8ToothIcon strokeWidth={3} className="h-3 w-5" />
                          </ListItemPrefix>
                          Settings
                        </ListItem>
                      </Link>
                    </List>
                  </AccordionBody>
                </Accordion>
              )}

              <hr className="my-2 border-blue-gray-50" />

              <Link href="/" className="flex items-center gap-3 hover:text-blue-600">
                <ListItem className="gap-3" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Home className="h-5 w-5" />
                  </ListItemPrefix>
                  Home
                  {/* <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix> */}
                </ListItem>
              </Link>

              <Link href="/lmacm/support-us" className="flex items-center gap-3 hover:text-blue-600">
                <ListItem className="gap-3" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <HandHeart className="h-5 w-5" />
                  </ListItemPrefix>
                  Support Us
                  {/* <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix> */}
                </ListItem>
              </Link>

              <Link href="/lmacm/videos?search=''" className="flex items-center gap-3 hover:text-blue-600">
                <ListItem className="gap-3" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Video className="h-5 w-5" />
                  </ListItemPrefix>
                  Videos
                  {/* <ListItemSuffix>
                    <Chip
                      value="14"
                      size="sm"
                      variant="ghost"
                      color="blue-gray"
                      className="rounded-full"
                    />
                  </ListItemSuffix> */}
                </ListItem>
              </Link>

              <Link href="/lmacm/audios?search=''" className="flex items-center gap-3 hover:text-blue-600">
                <ListItem className="gap-3" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Music className="h-5 w-5" />
                  </ListItemPrefix>
                  Audios
                </ListItem>
              </Link>

              <Link href="/lmacm/images?search=''" className="flex items-center gap-3 hover:text-blue-600">
                <ListItem className="gap-3" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <ImageIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  Images
                </ListItem>
              </Link>

              {session?.user ? (
                <Button variant="filled" onClick={() => {
                  signOut();
                  setLoading1(true);
                } } className="flex justify-center bg-red-600" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  {loading1 ? <Loader2 className="text-center animate-spin w-5 h-5" /> : 'Sign Out'}
                </Button>
              ) : (
                <>
                  <Button variant="filled" color="blue" className="flex bg-blue-600 justify-center" onClick={() => {
                      setLoading2(true);
                      router.push('/lmacm/auth/register');
                    } } placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {loading2 ? <Loader2 className="text-center animate-spin w-5 h-5" /> : 'Sign Up'}
                  </Button>
                  <Button variant="outlined" className="bg-green-600 flex justify-center" onClick={() => {
                      setLoading3(true);
                      router.push('/lmacm/auth/login');
                    } } placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    {loading3 ? <Loader2 className="text-center animate-spin w-5 h-5" /> : 'Sign In'}
                  </Button>
                </>
              )}
            </List>

            {/* Related Sites */}
            <List placeholder={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}>
              <Accordion
                open={accordionOpen === 4}
                icon={<ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${accordionOpen === 4 ? "rotate-180" : ""}`} />} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <ListItem className="p-0" selected={accordionOpen === 4} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                  <AccordionHeader
                    onClick={() => handleAccordionToggle(4)}
                    className="border-b-0 p-3 gap-2 text-center" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  >
                    <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <div className="w-9 h-9 rounded-full overflow-hidden">
                      <Image
                        src={lms_main_logo}
                        alt="User Avatar"
                        width={36}
                        height={36}
                        className="object-cover w-full h-full transition-transform duration-300"
                        unoptimized // Remove if you configure next.config.js for this domain
                      />
                      </div>
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal font-semibold" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      Related Sites
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0" placeholder={undefined}
                onResize={undefined}
                onResizeCapture={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}>
                    <Link target="_blank" href="https://web.lmacm.com/" className="dark:text-white">
                      <ListItem className="flex-1 gap-2" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <GlobeAltIcon strokeWidth={3} color="blue" className="h-5 w-5 dark:text-white" />
                        </ListItemPrefix>
                        Legion Maria <span className="text-red-600">Website</span>
                      </ListItem>
                    </Link>
                  </List>
                  <List className="p-0" placeholder={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}>
                      <Link target="_blank" href="https://whatsapp.com/channel/0029Va1PsRB2ZjCjEHNes00Y" className="dark:text-white">
                        <ListItem className="flex-1 gap-2" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                          <ListItemPrefix placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <FontAwesomeIcon icon={faWhatsapp} className="text-xl text-green-500 hover:text-green-600" />
                          </ListItemPrefix>
                          WhatsApp Channel
                        </ListItem>
                      </Link>
                    </List>
                </AccordionBody>
              </Accordion>

              <hr className="my-2 border-blue-gray-50" />
            </List>

            {/* Appearance */}
            <div className="mt-8 px-2">
              <Typography variant="small" className="mb-2 font-semibold text-zinc-800 dark:text-white" placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Appearance
              </Typography>
              <div className="flex gap-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    theme === 'light'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white'
                  }`}
                >
                  <SunIcon className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    theme === 'dark'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white'
                  }`}
                >
                  <MoonIcon className="w-4 h-4" />
                  Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition ${
                    theme === 'system'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white'
                  }`}
                >
                  <ComputerDesktopIcon className="w-4 h-4" />
                  System
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Drawer>
    </>
  );
}

