"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageSquare, Mail, Calendar } from "lucide-react";

interface ProjectContactProps {
  name: string;
  contactNumber: string;
}

export default function ProjectContact({ name, contactNumber }: ProjectContactProps) {
  // Generate WhatsApp link with custom message
  const cleanNumber = contactNumber.replace(/\D/g, ""); // extract digits (e.g. 917205522303)
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=Hi%20OMVIK%20Team%2C%20I%20am%20interested%20in%20booking%20a%20site%20visit%20for%20the%20${encodeURIComponent(
    name
  )}%20project.%20Please%20provide%20more%20details.`;

  return (
    <section className="py-20 bg-[#0a1628] text-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.03)_0%,_transparent_75%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[#C5A059] block font-medium">
            Acquire Your Space
          </span>
          <h2 className="font-clagio font-medium text-white leading-[1.1] tracking-[0.03em] text-3xl sm:text-4xl md:text-5xl">
            Interested in {name}?
          </h2>
          <p className="text-white/60 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Partner with OMVIK to secure your legacy home. Connect with our dedicated advisory team for a detailed brochure, pricing catalog, or private site viewing.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            {/* Book Site Visit CTA */}
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href={`/contact?project=${encodeURIComponent(name)}&type=site-visit`}
                prefetch={true}
                className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#fc4d00] to-[#C5A059] text-white font-clagio font-medium uppercase tracking-[0.25em] text-[10px] hover:brightness-110 transition-all duration-500 shadow-xl flex items-center justify-center space-x-2 border border-white/10"
              >
                <Calendar size={14} />
                <span>Book Site Visit</span>
              </Link>
            </motion.div>

            {/* Phone Call */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={`tel:${contactNumber}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-clagio font-medium uppercase tracking-[0.25em] text-[10px] hover:bg-[#C5A059] hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center space-x-2"
            >
              <Phone size={14} />
              <span>Call Now</span>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-600 text-white font-clagio font-medium uppercase tracking-[0.25em] text-[10px] hover:bg-emerald-700 transition-all duration-500 shadow-xl flex items-center justify-center space-x-2"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Chat</span>
            </motion.a>

            {/* Enquiry Form Link */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                href={`/contact?project=${encodeURIComponent(name)}`}
                prefetch={true}
                className="w-full px-8 py-4 rounded-full border border-white/20 text-white font-clagio font-medium uppercase tracking-[0.25em] text-[10px] hover:bg-white/10 hover:border-white/40 transition-all duration-500 flex items-center justify-center space-x-2"
              >
                <Mail size={14} />
                <span>Send Enquiry</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
