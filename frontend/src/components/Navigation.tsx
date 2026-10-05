"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [groundReportOpen, setGroundReportOpen] = useState(false);
    const [mobileGroundReportOpen, setMobileGroundReportOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Track scroll for adaptive styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setGroundReportOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 w-full z-[10010] transition-all duration-500 px-6 md:px-12 flex justify-between items-center ${scrolled
                ? "py-3 md:py-4 bg-[#FDFCFB]/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
                : "pt-0 pb-2"
                }`}>
                <Link href="/" prefetch={true} aria-label="Home" className="flex items-center relative z-50 group">
                    <div className="flex flex-col">
                        <Image
                            src="https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782713858/OMVIK-01_gyx4ci.png"
                            alt="OMVIK Logo"
                            width={140}
                            height={140}
                            className={`object-contain transition-all duration-700 w-20 sm:w-24 md:w-32 lg:w-36 mix-blend-multiply ${scrolled ? "scale-90" : "scale-100"} ${isOpen ? "brightness-0 invert" : ""}`}
                            priority
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: scrolled ? "80%" : "100%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[1px] bg-black/10 mt-2 self-start"
                        />
                    </div>
                </Link>

                {/* Desktop Links - True Centered */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6 lg:space-x-10 text-[10px] uppercase tracking-[0.3em] text-black font-clagio font-medium transition-all">
                    <Link href="/services" prefetch={true} className="zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap">
                        Services
                    </Link>

                    <Link href="/about" prefetch={true} className="zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap">
                        About Us
                    </Link>

                    {/* Ground Report Dropdown Trigger */}
                    <div
                        ref={dropdownRef}
                        className="relative py-3"
                        onMouseEnter={() => setGroundReportOpen(true)}
                        onMouseLeave={() => setGroundReportOpen(false)}
                    >
                        <button
                            onClick={() => setGroundReportOpen(!groundReportOpen)}
                            className="flex items-center gap-1.5 zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-[0.3em] font-clagio focus-visible:outline-none cursor-pointer"
                            aria-expanded={groundReportOpen}
                            aria-haspopup="true"
                        >
                            <span>Ground Report</span>
                            <ChevronDown
                                size={12}
                                className={`transition-transform duration-300 ${groundReportOpen ? "rotate-180 text-[#e8692b]" : "opacity-60"}`}
                            />
                        </button>

                        {/* Dropdown Menu Overlay */}
                        <AnimatePresence>
                            {groundReportOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-2xl shadow-xl p-3 z-[10020] text-left normal-case tracking-normal"
                                >
                                    <div className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400 px-3 pt-2 pb-1.5 border-b border-stone-100">
                                        Ground Report
                                    </div>

                                    <div className="pt-2 space-y-1.5">
                                        <Link
                                            href="/blog"
                                            prefetch={true}
                                            onClick={() => setGroundReportOpen(false)}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#e8692b]/10 transition-colors group"
                                        >
                                            <span className="text-lg leading-none mt-0.5">📋</span>
                                            <div>
                                                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#e8692b] transition-colors flex items-center justify-between">
                                                    <span>Blog Section</span>
                                                    <span className="text-[10px] text-[#e8692b] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                </div>
                                                <div className="text-[11px] text-stone-500 font-light leading-snug mt-0.5">
                                                    Real estate guides & locality insights
                                                </div>
                                            </div>
                                        </Link>

                                        <Link
                                            href="/ground-report/news"
                                            prefetch={true}
                                            onClick={() => setGroundReportOpen(false)}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#185FA5]/10 transition-colors group"
                                        >
                                            <span className="text-lg leading-none mt-0.5">📰</span>
                                            <div>
                                                <div className="text-xs font-semibold text-stone-900 group-hover:text-[#185FA5] transition-colors flex items-center justify-between">
                                                    <span>News Section</span>
                                                    <span className="text-[10px] text-[#185FA5] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                                </div>
                                                <div className="text-[11px] text-stone-500 font-light leading-snug mt-0.5">
                                                    Latest company updates & announcements
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/contact" prefetch={true} className="zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6 relative z-50">
                    <Link href="/login" prefetch={true} aria-label="Client Portal" className="hidden sm:block">
                        <div className={`w-10 h-10 rounded-full glass-panel flex flex-col items-center justify-center transition-all hover:bg-black hover:text-white border-black/5 ${isOpen ? "text-white border-white/20 bg-white/10" : "text-black"}`}>
                            <User size={16} />
                        </div>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? "text-white bg-white/10" : "glass-panel border-black/5 text-black md:hidden"}`}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 90% 5%)" }}
                        animate={{ clipPath: "circle(150% at 90% 5%)" }}
                        exit={{ clipPath: "circle(0% at 90% 5%)" }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 h-[100dvh] w-full z-[10005] bg-[#081F5C] flex flex-col items-center justify-center overflow-y-auto px-6 py-12"
                    >
                        <div className="flex flex-col items-center space-y-6 text-center w-full max-w-sm my-auto">
                            <Link
                                href="/"
                                prefetch={true}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl sm:text-4xl text-white font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em]"
                            >
                                Home
                            </Link>

                            <Link
                                href="/services"
                                prefetch={true}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl sm:text-4xl text-white font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em]"
                            >
                                Services
                            </Link>

                            <Link
                                href="/about"
                                prefetch={true}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl sm:text-4xl text-white font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em]"
                            >
                                About Us
                            </Link>

                            {/* Ground Report Mobile Submenu */}
                            <div className="w-full flex flex-col items-center">
                                <button
                                    onClick={() => setMobileGroundReportOpen(!mobileGroundReportOpen)}
                                    className="text-3xl sm:text-4xl text-white font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em] flex items-center justify-center gap-2"
                                >
                                    <span>Ground Report</span>
                                    <ChevronDown
                                        size={22}
                                        className={`transition-transform duration-300 ${mobileGroundReportOpen ? "rotate-180 text-[#e8692b]" : "opacity-60"}`}
                                    />
                                </button>

                                <AnimatePresence>
                                    {mobileGroundReportOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden flex flex-col items-center space-y-3 mt-4 bg-white/10 p-4 rounded-2xl w-full border border-white/10"
                                        >
                                            <Link
                                                href="/blog"
                                                prefetch={true}
                                                onClick={() => setIsOpen(false)}
                                                className="text-xl text-white/90 font-medium hover:text-[#e8692b] transition-colors tracking-wide flex items-center gap-2"
                                            >
                                                <span>📋</span>
                                                <span>Blog Section</span>
                                            </Link>

                                            <Link
                                                href="/ground-report/news"
                                                prefetch={true}
                                                onClick={() => setIsOpen(false)}
                                                className="text-xl text-white/90 font-medium hover:text-[#60a5fa] transition-colors tracking-wide flex items-center gap-2"
                                            >
                                                <span>📰</span>
                                                <span>News Section</span>
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/contact"
                                prefetch={true}
                                onClick={() => setIsOpen(false)}
                                className="text-3xl sm:text-4xl text-white font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em]"
                            >
                                Contact
                            </Link>

                            <Link
                                href="/login"
                                prefetch={true}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl text-white/80 font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em] pt-2"
                            >
                                Login
                            </Link>
                        </div>

                        {/* Footer in Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-white/60 text-xs uppercase tracking-widest text-center"
                        >
                            Custodians of Legacy
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
