
'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
// import { lm_tech_logo } from "../../utils";

export default function HomeFooter() {

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 ">
      
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 text-sm">
          
          {/* Brand Overview */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Legion Maria Stream</h4>
            <p className="mb-3">
              Spreading the Word of God through inspiring sermons, divine hymns, and holy imagery. 
              Accessible anywhere, anytime.
            </p>
            <p className="italic text-blue-600 dark:text-yellow-500 ">
              &quot;Go into all the world and preach the gospel to all creation.&quot; – Mark 16:15
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Explore</h5>
            <ul className="space-y-2">
              <li><Link href="/lmacm/videos" className="hover:text-blue-500">Watch Videos</Link></li>
              <li><Link href="/lmacm/audios" className="hover:text-blue-500">Listen to Audios</Link></li>
              <li><Link href="/lmacm/images" className="hover:text-blue-500">View Images</Link></li>
              <li><Link href="/lmacm/support-us" className="hover:text-blue-500">Support the Mission</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Contact</h5>
            <ul className="space-y-2">
              <li>Email: <Link href="mailto:legionmariatech@gmail.com" className="hover:text-blue-500">legionmariatech@gmail.com</Link></li>
              <li>Phone: +254 731 549 103</li>
              <li>Location: Nairobi, Kenya</li>
            </ul>
          </div>

          {/* Related Sites */}
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Related Sites</h5>
            <ul className="space-y-2">
              <li className="hover:text-blue-500"><Link href="https://web.lmacm.com/" target="_blank">Legion Maria <span className="text-red-600 ">Website</span></Link></li>
              
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Follow Us</h5>
            <div className="flex space-x-4">
              <Link target="_blank" href="https://whatsapp.com/channel/0029Va1PsRB2ZjCjEHNes00Y" aria-label="WhatsApp" className="hover:text-blue-600"><FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-green-500 hover:text-green-600" /></Link>
            </div>
          </div>

          {/* https://ytlo9i9u9l.ufs.sh/f/AlWSk3op4etGw1OEtMu0A6OJTEfwYMjeKPzGivNcUg8Sh9xo */}

          <div className="flex-col justify-center">
            <h5 className="font-semibold text-gray-800 dark:text-white mb-3">Legion Maria Technologies</h5>
            <div >
              <Link href="#"  className="hover:scale-105 transition-transform">
                {/* <Image
                width={150}
                height={150}
                  src={lm_tech_logo}
                  alt="Legion Maria Technologies"
                  className="rounded-full border border-gray-300 dark:border-gray-600 hover:scale-105 transition-transform"
                /> */}
              </Link>

            </div>
          </div>

        </div>

        <div className="mt-10 text-center border-t border-gray-300 dark:border-gray-700 pt-6 text-xs text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Legion Maria Stream. All rights reserved | <Link href="/lmacm/privacy-policy" className="hover:text-blue-500">Privacy Policy</Link> | <Link href="/lmacm/terms-of-service" className="hover:text-blue-500">Terms of Service</Link>
        </div>
      </footer>

    </div>
  );
}
