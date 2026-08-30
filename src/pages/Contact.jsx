import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaPaperPlane,
} from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = "917828908522";

    const message = `📩 New Contact Query

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
📌 Subject: ${formData.subject}

💬 Message:
${formData.message}`;

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      {/* ================================
          SEO
      ================================= */}

      <Helmet>
        <title>
          Contact ServoraCare | Home Service Support
        </title>

        <meta
          name="description"
          content="Contact ServoraCare for trusted home services including electrician, plumbing, AC repair, CCTV installation, painting and cleaning support."
        />

        <meta
          name="keywords"
          content="ServoraCare contact, home service support, electrician contact, plumber contact, AC repair support, Gwalior home services"
        />

        <link
          rel="canonical"
          href="https://www.servoracare.in/contact"
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="Contact ServoraCare"
        />

        <meta
          property="og:description"
          content="Get in touch with ServoraCare for reliable home service solutions."
        />

        <meta
          property="og:url"
          content="https://www.servoracare.in/contact"
        />

        <meta
          property="og:type"
          content="website"
        />

        {/* Local Business Schema */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "ServoraCare",
            url: "https://www.servoracare.in",
            telephone: "+91-7828908522",
            email: "support@servoracare.in",

            address: {
              "@type": "PostalAddress",
              addressLocality: "Gwalior",
              addressRegion: "Madhya Pradesh",
              addressCountry: "India",
            },

            openingHours: "Mo-Sa 09:30-18:30",

            sameAs: [
              "https://www.facebook.com/Boby.Singh.saini.908/",
              "https://www.instagram.com/servoracare.in",
              "https://www.linkedin.com/company/servoracare/",
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* =================================
            HERO
        ================================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-300 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-24">

            <div className="max-w-3xl">

              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">

                <FaWhatsapp className="text-green-400" />

                We're here to help

              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">

                Let's Talk About
                <span className="text-orange-400">
                  {" "}Your Service Needs
                </span>

              </h1>

              <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">

                Have a question, need a service, or want to work with
                ServoraCare? Our team is ready to help you.

              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <a
                  href="tel:+917828908522"
                  className="inline-flex items-center gap-3 bg-white text-blue-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-50 transition shadow-lg"
                >
                  <FaPhoneAlt />
                  Call Us
                </a>

                <a
                  href="https://wa.me/917828908522"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 bg-green-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-green-600 transition shadow-lg"
                >
                  <FaWhatsapp />
                  WhatsApp Us
                </a>

              </div>

            </div>

          </div>

        </section>

        {/* =================================
            MAIN CONTENT
        ================================= */}

        <main className="max-w-7xl mx-auto px-6 py-14 lg:py-20">

          <div className="grid lg:grid-cols-5 gap-8">

            {/* =================================
                CONTACT INFORMATION
            ================================= */}

            <section className="lg:col-span-2">

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-9">

                <div className="mb-8">

                  <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                    Contact Information
                  </span>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    Get in Touch
                  </h2>

                  <p className="text-slate-500 mt-3 leading-relaxed">
                    Reach out to us through phone, email or WhatsApp.
                    We will be happy to assist you.
                  </p>

                </div>

                <div className="space-y-6">

                  {/* PHONE */}

                  <a
                    href="tel:+917828908522"
                    className="group flex items-start gap-4"
                  >

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-900 transition">

                      <FaPhoneAlt className="text-blue-700 group-hover:text-white transition" />

                    </div>

                    <div>

                      <p className="text-sm text-slate-400 font-medium">
                        Phone
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        +91 78289 08522
                      </p>

                    </div>

                  </a>

                  {/* EMAIL */}

                  <a
                    href="mailto:bobysinghsaini236@gmail.com"
                    className="group flex items-start gap-4"
                  >

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center group-hover:bg-orange-500 transition">

                      <FaEnvelope className="text-orange-500 group-hover:text-white transition" />

                    </div>

                    <div>

                      <p className="text-sm text-slate-400 font-medium">
                        Email
                      </p>

                      <p className="font-semibold text-slate-900 mt-1 break-all">
                        support@servoracare.in
                      </p>

                    </div>

                  </a>

                  {/* LOCATION */}

                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-green-50 flex items-center justify-center">

                      <FaMapMarkerAlt className="text-green-600" />

                    </div>

                    <div>

                      <p className="text-sm text-slate-400 font-medium">
                        Office Location
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        Gwalior, Madhya Pradesh
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        India
                      </p>

                    </div>

                  </div>

                  {/* WORKING HOURS */}

                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 shrink-0 rounded-xl bg-purple-50 flex items-center justify-center">

                      <FaClock className="text-purple-600" />

                    </div>

                    <div>

                      <p className="text-sm text-slate-400 font-medium">
                        Working Hours
                      </p>

                      <p className="font-semibold text-slate-900 mt-1">
                        Monday - Saturday
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        9:30 AM - 6:30 PM
                      </p>

                    </div>

                  </div>

                </div>

                {/* SOCIAL */}

                <div className="border-t border-slate-200 mt-9 pt-8">

                  <p className="text-sm font-semibold text-slate-700 mb-4">
                    Follow ServoraCare
                  </p>

                  <div className="flex gap-3">

                    <a
                      href="https://www.facebook.com/Boby.Singh.saini.908/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-900 hover:text-white transition"
                    >
                      <FaFacebook />
                    </a>

                    <a
                      href="https://www.instagram.com/servoracare.in"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition"
                    >
                      <FaInstagram />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/servoracare/"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition"
                    >
                      <FaLinkedin />
                    </a>

                    <a
                      href="https://wa.me/917828908522"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="WhatsApp"
                      className="w-11 h-11 rounded-xl bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition"
                    >
                      <FaWhatsapp />
                    </a>

                  </div>

                </div>

              </div>

            </section>

            {/* =================================
                CONTACT FORM
            ================================= */}

            <section className="lg:col-span-3">

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7 sm:p-9">

                <div className="mb-8">

                  <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                    Send Us a Message
                  </span>

                  <h2 className="text-3xl font-bold text-slate-900 mt-2">
                    How Can We Help?
                  </h2>

                  <p className="text-slate-500 mt-3">
                    Fill in the details below and we will connect with
                    you through WhatsApp.
                  </p>

                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

                  {/* NAME + EMAIL */}

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />

                    </div>

                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />

                    </div>

                  </div>

                  {/* PHONE + SUBJECT */}

                  <div className="grid sm:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Phone Number
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        pattern="[0-9+\-\s]{10,15}"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />

                    </div>

                    <div>

                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Subject
                      </label>

                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                        required
                      />

                    </div>

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Message
                    </label>

                    <textarea
                      rows="6"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      className="w-full border border-slate-200 bg-slate-50 rounded-xl px-4 py-3.5 outline-none resize-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                      required
                    />

                  </div>

                  {/* BUTTON */}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl text-base font-semibold transition shadow-lg shadow-blue-900/20"
                  >

                    <FaPaperPlane />

                    Send Message on WhatsApp

                  </button>

                  <p className="text-xs text-center text-slate-400">
                    Your message will open directly in WhatsApp.
                  </p>

                </form>

              </div>

            </section>

          </div>

          {/* =================================
              MAP
          ================================= */}

          <section className="mt-10">

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-7 py-6 border-b border-slate-200">

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center">

                    <FaMapMarkerAlt className="text-green-600" />

                  </div>

                  <div>

                    <h2 className="text-xl font-bold text-slate-900">
                      Our Location
                    </h2>

                    <p className="text-sm text-slate-500">
                      Gwalior, Madhya Pradesh, India
                    </p>

                  </div>

                </div>

              </div>

              <iframe
                title="ServoraCare Gwalior Location"
                src="https://www.google.com/maps?q=Gwalior,Madhya%20Pradesh&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

            </div>

          </section>

        </main>

        {/* =================================
            BOTTOM CTA
        ================================= */}

        <section className="bg-blue-950 text-white">

          <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Need immediate assistance?
                </h2>

                <p className="text-blue-200 mt-2">
                  Call us or connect with us on WhatsApp.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <a
                  href="tel:+917828908522"
                  className="inline-flex items-center gap-2 bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
                >
                  <FaPhoneAlt />
                  Call Now
                </a>

                <a
                  href="https://wa.me/917828908522"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>

              </div>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default Contact;