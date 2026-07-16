import React, { useState } from "react";
import { Mail, MapPin, Send, Share2, Globe, MessageSquare, Check, PhoneCall, AlertCircle, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [consultationDate, setConsultationDate] = useState("");
  const [consultationTime, setConsultationTime] = useState("");
  const [consultationConfirmed, setConsultationConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email Address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Map form fields to standard and customized template params
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        subject: formData.subject,
        message: formData.message,
        // Fallbacks for various template formats
        name: formData.name,
        email: formData.email,
        user_name: formData.name,
        user_email: formData.email,
      };

      await emailjs.send(
        "service_krl919n",
        "template_1d4q861",
        templateParams,
        "_PuYwH7DRPyvwgsgV"
      );

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Failed to send email via EmailJS:", error);
      setIsSubmitting(false);
      setSubmitError(
        error?.text || "Failed to send message. Please try again or contact us directly."
      );
    }
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSuccess(false);
    setSubmitError(null);
  };

  const handleScheduleConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultationDate || !consultationTime) return;
    setConsultationConfirmed(true);
    setTimeout(() => {
      setShowConsultationModal(false);
      setConsultationConfirmed(false);
      setConsultationDate("");
      setConsultationTime("");
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-grow flex flex-col pt-10 md:pt-16"
    >
      {/* Contact Hero Block */}
      <section className="w-full py-12 md:py-16 px-6 max-w-7xl mx-auto text-left">
        <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-on-background tracking-tight mb-4">
          Get in Touch
        </h1>
        <p className="font-sans text-base sm:text-lg md:text-xl text-secondary max-w-2xl leading-relaxed">
          We're here to help you navigate the digital landscape. Send us a message and we'll respond promptly.
        </p>
      </section>

      {/* Main Form & details section */}
      <section className="w-full pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Contact Form Card */}
          <div className="lg:col-span-7 bg-surface-container-lowest border-2 border-primary/25 rounded-2xl p-8 shadow-sm">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col text-left"
                >
                  <h2 className="font-sans font-bold text-2xl text-on-surface mb-2">
                    Send a Message
                  </h2>
                  <p className="font-sans text-sm text-secondary mb-6">
                    This form securely routes your inquiry to{" "}
                    <span className="font-semibold text-primary">
                      prakashinfotech356@gmail.com
                    </span>
                    .
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Full Name */}
                    <div className="flex flex-col">
                      <label htmlFor="name" className="font-sans font-semibold text-xs text-secondary uppercase mb-2 tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`font-sans py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                          errors.name
                            ? "border-error focus:border-error"
                            : "border-outline-variant focus:border-primary focus:ring-primary/25"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-error text-xs font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col">
                      <label htmlFor="email" className="font-sans font-semibold text-xs text-secondary uppercase mb-2 tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`font-sans py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                          errors.email
                            ? "border-error focus:border-error"
                            : "border-outline-variant focus:border-primary focus:ring-primary/25"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-error text-xs font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col mb-6">
                    <label htmlFor="subject" className="font-sans font-semibold text-xs text-secondary uppercase mb-2 tracking-wide">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`font-sans py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.subject
                          ? "border-error focus:border-error"
                          : "border-outline-variant focus:border-primary focus:ring-primary/25"
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-error text-xs font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col mb-8">
                    <label htmlFor="message" className="font-sans font-semibold text-xs text-secondary uppercase mb-2 tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`font-sans py-3 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                        errors.message
                          ? "border-error focus:border-error"
                          : "border-outline-variant focus:border-primary"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-error text-xs font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.message}
                      </p>
                    )}
                  </div>

                  {submitError && (
                    <div className="bg-red-50 text-red-700 text-sm p-4 rounded-lg mb-6 border border-red-200 flex items-start gap-3">
                      <AlertCircle className="shrink-0 mt-0.5" size={18} />
                      <div>
                        <p className="font-semibold">Submission Failed</p>
                        <p className="text-xs text-red-600 mt-1">{submitError}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto self-start bg-primary hover:bg-primary-container disabled:bg-secondary/40 text-on-primary font-sans font-semibold text-sm tracking-wide py-4 px-8 rounded-lg transition-all shadow-[0_10px_30px_rgba(0,40,142,0.12)] flex items-center justify-center gap-2 active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                        Routing Message...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-md animate-bounce">
                    <Check size={32} />
                  </div>
                  <h3 className="font-sans font-bold text-2xl text-on-surface mb-3">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-sans text-base text-secondary max-w-md leading-relaxed mb-8">
                    Thank you, <span className="font-bold text-on-surface">{formData.name}</span>! Your message has been routed to{" "}
                    <span className="font-semibold text-primary">prakashinfotech356@gmail.com</span>. We will contact you at{" "}
                    <span className="font-semibold text-on-surface">{formData.email}</span> within 24 business hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="border border-primary text-primary hover:bg-surface-container-low font-sans font-semibold text-sm tracking-wide py-3 px-6 rounded-lg transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Direct Contacts & Connect Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Contact Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm flex flex-col text-left">
              <h2 className="font-sans font-bold text-2xl text-on-surface mb-6">
                Direct Contact
              </h2>

              <div className="flex flex-col gap-6">
                {/* Email item */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs text-secondary uppercase tracking-wider mb-1">
                      Email Support
                    </h4>
                    <a
                      href="mailto:prakashinfotech356@gmail.com"
                      className="font-sans text-sm sm:text-base text-primary font-medium hover:underline break-all"
                    >
                      prakashinfotech356@gmail.com
                    </a>
                  </div>
                </div>

                {/* Website */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs text-secondary uppercase tracking-wider mb-1">
                      Official Website
                    </h4>
                    <a
                      href="https://prakashinfotech.online"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-sm sm:text-base text-primary font-medium hover:underline break-all"
                    >
                      prakashinfotech.online
                    </a>
                  </div>
                </div>

                {/* Headquarters */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-xs text-secondary uppercase tracking-wider mb-1">
                      Headquarters
                    </h4>
                    <p className="font-sans text-sm sm:text-base text-on-surface font-medium">
                      Global Operations, Remote First
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Connect / Socials Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 shadow-sm flex flex-col text-left">
              <h2 className="font-sans font-bold text-2xl text-on-surface mb-4">
                Connect
              </h2>
              <p className="font-sans text-sm text-secondary leading-relaxed mb-6">
                Follow us for updates on high-end digital solutions and enterprise IT trends.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {/* Simulated Social Action Buttons */}
                  <motion.a
                    href="https://www.instagram.com/prakash_infotech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary rounded-lg flex items-center justify-center transition-all border border-outline-variant hover:border-primary shadow-sm cursor-pointer"
                    title="Follow us on Instagram"
                  >
                    <Instagram size={20} />
                  </motion.a>
                  
                  <motion.button
                    onClick={() => setShowConsultationModal(true)}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary rounded-lg flex items-center justify-center transition-all border border-outline-variant hover:border-primary shadow-sm cursor-pointer"
                    title="Schedule a consultation call"
                  >
                    <PhoneCall size={20} />
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText("https://www.instagram.com/prakash_infotech/");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2500);
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-surface-container-high hover:bg-primary hover:text-on-primary text-primary rounded-lg flex items-center justify-center transition-all border border-outline-variant hover:border-primary shadow-sm cursor-pointer"
                    title="Copy portfolio link"
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>

                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded border border-green-200 flex items-center gap-2"
                    >
                      <Check size={14} /> Link copied to clipboard successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Consultation Scheduling Dialog */}
      <AnimatePresence>
        {showConsultationModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConsultationModal(false)}
              className="fixed inset-0 bg-on-surface"
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative bg-surface-container-lowest rounded-xl max-w-md w-full p-8 shadow-2xl z-10 border border-outline-variant text-left"
            >
              <h3 className="font-sans font-bold text-xl text-on-surface mb-2">
                Consultation Scheduler
              </h3>
              <p className="font-sans text-sm text-secondary mb-6 leading-relaxed">
                Choose a date and time for a secure 1-on-1 strategy session with our senior architects.
              </p>

              {consultationConfirmed ? (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                    <Check size={24} />
                  </div>
                  <h4 className="font-sans font-bold text-lg text-on-surface mb-1">
                    Booking Confirmed!
                  </h4>
                  <p className="font-sans text-sm text-secondary">
                    Calendar invite routed. We look forward to connecting with you.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleScheduleConsultation} className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <label className="font-sans font-semibold text-xs text-secondary uppercase mb-2">
                      Select Date
                    </label>
                    <input
                      type="date"
                      required
                      value={consultationDate}
                      onChange={(e) => setConsultationDate(e.target.value)}
                      className="font-sans py-2.5 px-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="font-sans font-semibold text-xs text-secondary uppercase mb-2">
                      Preferred Time Slot
                    </label>
                    <select
                      required
                      value={consultationTime}
                      onChange={(e) => setConsultationTime(e.target.value)}
                      className="font-sans py-2.5 px-3 border border-outline-variant rounded-lg focus:outline-none focus:border-primary"
                    >
                      <option value="">Choose slot...</option>
                      <option value="09:00 AM">09:00 AM EST (Remote)</option>
                      <option value="11:30 AM">11:30 AM EST (Remote)</option>
                      <option value="02:00 PM">02:00 PM EST (Remote)</option>
                      <option value="04:30 PM">04:30 PM EST (Remote)</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowConsultationModal(false)}
                      className="font-sans font-semibold text-sm py-2 px-4 border border-outline rounded-lg text-secondary hover:text-on-surface transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="font-sans font-semibold text-sm py-2 px-6 bg-primary hover:bg-primary-container text-on-primary rounded-lg transition-all"
                    >
                      Confirm Session
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
