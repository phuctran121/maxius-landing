"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <motion.h1
        initial={{ x: -130 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 }}
        className="text-center text-black text-2xl sm:text-4xl font-bold py-6 mt-16"
      >
        Contact us
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, x: -80, filter: "blur(2px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-auto grid grid-cols-1 md:grid-cols-2 w-full h-[80vh]"
      >
        <div className="w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.611348031592!2d126.95013237630662!3d37.39943923378266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b60d8e2a2b39d%3A0xa3df4e3ac82b1c6!2z66mU7Yq47Iuc7Iqk!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="bg-[#0a1444] text-white flex flex-col justify-between p-10">
          <div>
            <p>
              5F 12-30, Simin-daero 327beon-gil, Dongan-gu,
              <br />
              Anyang-si, Gyeonggi-do, Republic of Korea
            </p>
            <p className="mt-3">Tel: 02. 851. 2662</p>
            <p>Fax: 02. 851. 2655</p>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold">Company</p>
              <p>support@maxius.io</p>
            </div>
            <div>
              <p className="font-semibold">Technical support</p>
              <p>support@maxius.io</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
