"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [groundReportOpen, setGroundReportOpen] = useState(false);
    const [mobileGroundReportOpen, setMobileGroundReportOpen] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const isGroundReportActive =
        pathname.startsWith("/blog") ||
        pathname.startsWith("/news") ||
        pathname.startsWith("/ground-report");

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

    // Close dropdown on Escape key press
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setGroundReportOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
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
                    <Link
                        href="/services"
                        prefetch={true}
                        className={`zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap ${
                            pathname.startsWith("/services") ? "text-[#e8692b] font-semibold" : ""
                        }`}
                    >
                        Services
                    </Link>

                    <Link
                        href="/about"
                        prefetch={true}
                        className={`zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap ${
                            pathname.startsWith("/about") ? "text-[#e8692b] font-semibold" : ""
                        }`}
                    >
                        About Us
                    </Link>

                    {/* Ground Report Dropdown */}
                    <div
                        ref={dropdownRef}
                        className="relative py-3"
                        onMouseEnter={() => setGroundReportOpen(true)}
                        onMouseLeave={() => setGroundReportOpen(false)}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setGroundReportOpen((prev) => !prev);
                            }}
                            className={`flex items-center gap-1.5 zenith-link-hover transition-colors whitespace-nowrap uppercase tracking-[0.3em] font-clagio focus-visible:ring-2 focus-visible:ring-[#e8692b] focus-visible:outline-none cursor-pointer ${
                                isGroundReportActive ? "text-[#e8692b] font-semibold" : "text-black"
                            }`}
                            aria-expanded={groundReportOpen}
                            aria-haspopup="true"
                        >
                            <span>Ground Report</span>
                            <ChevronDown
                                size={12}
                                className={`transition-transform duration-300 ${
                                    groundReportOpen ? "rotate-180 text-[#e8692b]" : "opacity-60"
                                }`}
                            />
                        </button>

                        {/* Dropdown Menu Card */}
                        <AnimatePresence>
                            {groundReportOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-[#ffffff] border border-[#e2e0db] rounded-[14px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-2 z-[10020] text-left uppercase tracking-[0.14em] text-[12px] font-semibold font-sans leading-none"
                                    role="menu"
                                >
                                    <Link
                                        href="/blog"
                                        prefetch={true}
                                        onClick={() => setGroundReportOpen(false)}
                                        className={`block px-5 py-3 rounded-[10px] transition-colors focus-visible:bg-[#fbfaf8] focus-visible:text-[#e8692b] focus-visible:outline-none ${
                                            pathname.startsWith("/blog")
                                                ? "bg-[#fbfaf8] text-[#e8692b]"
                                                : "text-stone-900 hover:bg-[#fbfaf8] hover:text-[#e8692b]"
                                        }`}
                                        role="menuitem"
                                    >
                                        Blog
                                    </Link>

                                    <Link
                                        href="/news"
                                        prefetch={true}
                                        onClick={() => setGroundReportOpen(false)}
                                        className={`block px-5 py-3 rounded-[10px] transition-colors focus-visible:bg-[#fbfaf8] focus-visible:text-[#e8692b] focus-visible:outline-none ${
                                            pathname.startsWith("/news")
                                                ? "bg-[#fbfaf8] text-[#e8692b]"
                                                : "text-stone-900 hover:bg-[#fbfaf8] hover:text-[#e8692b]"
                                        }`}
                                        role="menuitem"
                                    >
                                        News
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        href="/contact"
                        prefetch={true}
                        className={`zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap ${
                            pathname.startsWith("/contact") ? "text-[#e8692b] font-semibold" : ""
                        }`}
                    >
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

                            {/* Ground Report Mobile Accordion */}
                            <div className="w-full flex flex-col items-center">
                                <button
                                    onClick={() => setMobileGroundReportOpen(!mobileGroundReportOpen)}
                                    className={`text-3xl sm:text-4xl font-clagio font-medium transition-opacity tracking-[0.04em] flex items-center justify-center gap-2 ${
                                        isGroundReportActive ? "text-[#e8692b]" : "text-white hover:opacity-70"
                                    }`}
                                >
                                    <span>Ground Report</span>
                                    <ChevronDown
                                        size={22}
                                        className={`transition-transform duration-300 ${
                                            mobileGroundReportOpen ? "rotate-180 text-[#e8692b]" : "opacity-60"
                                        }`}
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
                                                className={`text-xl font-medium tracking-wide flex items-center gap-2 transition-colors ${
                                                    pathname.startsWith("/blog")
                                                        ? "text-[#e8692b] font-semibold"
                                                        : "text-white/90 hover:text-[#e8692b]"
                                                }`}
                                            >
                                                <span>Blog</span>
                                            </Link>

                                            <Link
                                                href="/news"
                                                prefetch={true}
                                                onClick={() => setIsOpen(false)}
                                                className={`text-xl font-medium tracking-wide flex items-center gap-2 transition-colors ${
                                                    pathname.startsWith("/news")
                                                        ? "text-[#e8692b] font-semibold"
                                                        : "text-white/90 hover:text-[#e8692b]"
                                                }`}
                                            >
                                                <span>News</span>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
