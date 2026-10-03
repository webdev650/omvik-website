"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle2, Loader2, Calendar, Building2 } from "lucide-react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const smooth = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

function ContactFormInner({ isMobile }: { isMobile: boolean }) {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") || searchParams.get("service") || "";
  const typeParam = searchParams.get("type") || "";
  const isSiteVisit = typeParam === "site-visit" || searchParams.get("action") === "site-visit";

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    subject: "",
    budgetRange: "",
    purchaseTimeline: "",
    interestedIn: "",
  });

  useEffect(() => {
    if (projectParam) {
      const decodedProject = decodeURIComponent(projectParam);
      const initialSubject = isSiteVisit
        ? `Book Site Visit - ${decodedProject}`
        : `Inquiry - ${decodedProject}`;
      const initialMessage = isSiteVisit
        ? `Hi OMVIK team, I would like to book a site visit for ${decodedProject}. Please contact me to confirm available dates.`
        : `Hi OMVIK team, I am interested in ${decodedProject}. Please provide more details.`;

      setFormData((prev) => ({
        ...prev,
        subject: prev.subject || initialSubject,
        interestedIn: prev.interestedIn || decodedProject,
        message: prev.message || initialMessage,
      }));
    } else if (isSiteVisit) {
      setFormData((prev) => ({
        ...prev,
        subject: prev.subject || "Book Site Visit",
        message: prev.message || "Hi OMVIK team, I would like to book a site visit. Please contact me to schedule.",
      }));
    }
  }, [projectParam, isSiteVisit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await api.post("/contact", {
        ...formData,
        subject: formData.subject || (isSiteVisit ? "Book Site Visit" : "General Inquiry"),
      });
      setStatus("success");
      toast.success(isSiteVisit ? "Site Visit Request Sent!" : "Inquiry sent successfully");

      setTimeout(() => {
        setStatus("idle");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          subject: "",
          budgetRange: "",
          purchaseTimeline: "",
          interestedIn: "",
        });
      }, 5000);
    } catch (error: unknown) {
      setStatus("error");
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Failed to send inquiry");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 40 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={smooth}
      className="relative p-6 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl"
    >
      {(projectParam || isSiteVisit) && (
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#fc4d00]/10 via-[#C5A059]/10 to-[#052870]/10 border border-[#fc4d00]/30 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-[#fc4d00] to-[#052870] text-white shadow-md">
            {isSiteVisit ? <Calendar size={20} /> : <Building2 size={20} />}
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-widest font-clagio font-bold text-[#fc4d00] block">
              {isSiteVisit ? "Book Site Visit Request" : "Project Inquiry"}
            </span>
            <p className="text-sm font-medium text-black">
              {projectParam ? (
                <>Target Project: <span className="font-semibold text-[#052870]">{decodeURIComponent(projectParam)}</span></>
              ) : (
                "Scheduling Site Visit Consultation"
              )}
            </p>
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#fc4d00] to-[#052870] text-white rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-3xl font-medium mb-3">
              {isSiteVisit ? "Site Visit Requested" : "Inquiry Sent"}
            </h3>
            <p className="text-black/60">We’ll contact you shortly to confirm details.</p>
          </motion.div>
        ) : (
          <motion.form onSubmit={handleSubmit} className="space-y-6">
            {(["name", "phone", "email"] as const).map((field) => (
              <div key={field} className="relative">
                <input
                  required
                  type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                  placeholder=" "
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                  className="peer w-full px-5 pt-6 pb-3 rounded-xl bg-white/70 border border-black/10 focus:border-[#052870] outline-none transition-all"
                />
                <label className="absolute left-5 top-3 text-sm text-black/40 font-clagio uppercase tracking-wider text-[11px]">
                  {field === "name" ? "FULL NAME *" : field === "phone" ? "PHONE NUMBER *" : "EMAIL ADDRESS *"}
                </label>
              </div>
            ))}

            <div className="relative">
              <textarea
                rows={4}
                required
                placeholder="Message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-5 py-4 rounded-xl bg-white/70 border border-black/10 focus:border-[#052870] outline-none transition-all"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#fc4d00] to-[#052870] text-white font-clagio font-medium uppercase tracking-[0.2em] text-xs shadow-lg hover:shadow-xl transition-all"
            >
              {status === "submitting" ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : isSiteVisit ? (
                "Confirm Site Visit Request"
              ) : (
                "Send Inquiry"
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#FDFCFB] to-[#f5f3ef] relative overflow-hidden">
      {!isMobile && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#fc4d00]/10 blur-[120px] rounded-full" />
      )}

      <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-40 sm:pb-32 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">

        {/* HERO */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-clagio text-black text-center mb-16 leading-[1.05]"
        >
          <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium">
            Build Your Future.
          </span>

          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-black/70"
          >
            Honor Your Past.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-center text-black/70 mb-10 sm:mb-16 text-base sm:text-lg max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Reach out to us to begin your journey toward a secure and beautifully crafted investment.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* FORM WRAPPED IN SUSPENSE */}
          <Suspense fallback={
            <div className="p-10 rounded-[2rem] bg-white/60 border border-white/40 flex justify-center items-center min-h-[350px]">
              <Loader2 className="animate-spin text-[#052870]" size={36} />
            </div>
          }>
            <ContactFormInner isMobile={isMobile} />
          </Suspense>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 40 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={smooth}
          >
            <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl border shadow-lg">

              <h3 className="text-2xl mb-8 font-medium font-clagio">Inquiry Sanctuary</h3>

              {/* ADDRESS */}
              <div className="flex items-start mb-8">
                <MapPin className="mr-4 text-[#fc4d00] shrink-0 mt-1" />
                <div>
                  <p className="font-medium font-clagio">Old Town Office</p>
                  <p className="text-sm text-black/70 font-light">
                    Plot no-1967, Sriram Nagar,<br />
                    Old Town, Bhubaneswar,<br />
                    Odisha 751002
                  </p>
                  <a
                    href="https://maps.google.com/?q=Plot no-1967, Sriram Nagar, Bhubaneswar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium mt-1 inline-block hover:underline"
                  >
                    View on Map →
                  </a>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start mb-8">
                <MapPin className="mr-4 text-[#fc4d00] shrink-0 mt-1" />
                <div>
                  <p className="font-medium font-clagio">Jagamara Office</p>
                  <p className="text-sm text-black/70 font-light">
                    Plot no-B/32, Sidhivihar,<br />
                    New Jagamara Road,<br />
                    Bhubaneswar, Odisha 751030
                  </p>
                  <a
                    href="https://maps.app.goo.gl/emUEDwbkmVQ3mshz7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm font-medium mt-1 inline-block hover:underline"
                  >
                    View on Map →
                  </a>
                </div>
              </div>

              {/* PHONE */}
              <div className="flex items-center mb-6">
                <Phone className="mr-4 text-[#052870] shrink-0" />
                <a href="tel:7205922303" className="hover:underline font-medium text-black/80">+91 7205922303</a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center">
                <Mail className="mr-4 text-gray-500 shrink-0" />
                <span className="text-black/80">omvikrealcon@gmail.com</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}