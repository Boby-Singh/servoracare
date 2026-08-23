import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Briefcase,
  Users,
  GraduationCap,
  Trophy,
  IndianRupee,
  Clock,
  Zap,
  Wrench,
  AirVent,
  ShieldCheck,
  PaintBucket,
  BrushCleaning,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from "lucide-react";

function Careers() {
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Electrician",
      icon: <Zap size={32} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "Plumber",
      icon: <Wrench size={32} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "AC Technician",
      icon: <AirVent size={32} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "CCTV Technician",
      icon: <ShieldCheck size={32} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "Painter",
      icon: <PaintBucket size={32} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "Cleaning Executive",
      icon: <BrushCleaning size={32} />,
      experience: "Fresher / Experienced",
      location: "Multiple Cities",
    },
  ];

  const benefits = [
    {
      icon: <Briefcase size={28} />,
      title: "Growing Startup",
      description:
        "Join a growing home services company and be part of an exciting journey.",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-700",
    },
    {
      icon: <IndianRupee size={28} />,
      title: "Attractive Earnings",
      description:
        "Earn competitive payouts with performance-based incentives.",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: <GraduationCap size={28} />,
      title: "Training & Support",
      description:
        "Improve your technical and professional skills through training.",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      icon: <Users size={28} />,
      title: "Professional Team",
      description:
        "Work alongside skilled professionals in a supportive environment.",
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      icon: <Trophy size={28} />,
      title: "Career Growth",
      description:
        "Build your career with opportunities for advancement and leadership.",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      icon: <Clock size={28} />,
      title: "Flexible Opportunities",
      description:
        "Choose suitable opportunities and grow with your performance.",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  const scrollToJobs = () => {
    document.getElementById("jobs")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ==========================================
          SEO
      ========================================== */}

      <Helmet>
        <title>
          Careers at ServoraCare | Join Our Professional Team
        </title>

        <meta
          name="description"
          content="Join ServoraCare as an electrician, plumber, AC technician, CCTV technician, painter or cleaning executive. Build your career with a growing home service platform."
        />

        <meta
          name="keywords"
          content="ServoraCare careers, electrician jobs, plumber jobs, AC technician jobs, CCTV technician jobs, painter jobs, cleaning jobs, technician jobs India"
        />

        <link
          rel="canonical"
          href="https://www.servoracare.in/careers"
        />

        {/* Open Graph */}

        <meta
          property="og:title"
          content="Careers at ServoraCare"
        />

        <meta
          property="og:description"
          content="Become part of ServoraCare's professional home service network."
        />

        <meta
          property="og:url"
          content="https://www.servoracare.in/careers"
        />

        <meta
          property="og:type"
          content="website"
        />

        {/* Organization Schema */}

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "ServoraCare",
            url: "https://www.servoracare.in",
            description:
              "Technology-driven home service platform connecting customers with skilled professionals.",
            sameAs: [
              "https://www.facebook.com/Boby.Singh.saini.908/",
              "https://www.instagram.com/themanager.bs/",
              "https://www.linkedin.com/in/bobysingh1/",
            ],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50">

        {/* ==========================================
            HERO
        ========================================== */}

        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

          {/* Background decoration */}

          <div className="absolute inset-0 pointer-events-none">

            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl" />

            <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl" />

          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">

            <div className="max-w-4xl mx-auto text-center">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium mb-7">

                <Briefcase size={16} />

                Career Opportunities at ServoraCare

              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">

                Build Your Career With

                <span className="text-orange-400">
                  {" "}ServoraCare
                </span>

              </h1>

              <p className="mt-6 text-lg sm:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">

                Join our growing professional network and help us deliver
                reliable home services to customers across India.

              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">

                <button
                  onClick={scrollToJobs}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-3.5 rounded-xl font-semibold transition shadow-lg shadow-orange-900/20"
                >
                  Explore Open Positions
                  <ArrowRight size={19} />
                </button>

                <button
                  onClick={() => navigate("/apply-job")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold transition backdrop-blur-sm"
                >
                  Apply Now
                </button>

              </div>

            </div>

          </div>

        </section>

        {/* ==========================================
            STATS
        ========================================== */}

        <section className="max-w-6xl mx-auto px-6 -mt-8 relative z-10">

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 overflow-hidden">

            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">

              <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                6+
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Career Roles
              </p>

            </div>

            <div className="p-6 text-center border-b md:border-b-0 md:border-r border-slate-200">

              <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                1+
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Years Experience
              </p>

            </div>

            <div className="p-6 text-center border-r border-slate-200">

              <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                Multiple
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Cities
              </p>

            </div>

            <div className="p-6 text-center">

              <p className="text-2xl sm:text-3xl font-bold text-green-600">
                Growing
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Team
              </p>

            </div>

          </div>

        </section>

        {/* ==========================================
            WHY JOIN
        ========================================== */}

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Why ServoraCare
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Grow With Us
            </h2>

            <p className="text-slate-500 mt-4 leading-relaxed">
              We believe skilled professionals are the foundation of
              great home services. That's why we focus on growth,
              training and meaningful opportunities.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {benefits.map((benefit, index) => (

              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-2xl p-7 hover:-translate-y-1 hover:shadow-xl transition duration-300"
              >

                <div
                  className={`w-14 h-14 rounded-2xl ${benefit.iconBg} ${benefit.iconColor} flex items-center justify-center mb-5 group-hover:scale-105 transition`}
                >
                  {benefit.icon}
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {benefit.title}
                </h3>

                <p className="text-slate-500 mt-3 leading-relaxed">
                  {benefit.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* ==========================================
            OPEN POSITIONS
        ========================================== */}

        <section
          id="jobs"
          className="bg-white border-y border-slate-200"
        >

          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">

            <div className="text-center max-w-3xl mx-auto mb-14">

              <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
                Join Our Team
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
                Current Open Positions
              </h2>

              <p className="text-slate-500 mt-4">
                Find an opportunity that matches your skills and
                experience.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {jobs.map((job, index) => (

                <div
                  key={index}
                  className="group border border-slate-200 rounded-2xl p-6 hover:border-blue-200 hover:shadow-xl transition duration-300 bg-slate-50/50"
                >

                  {/* Icon */}

                  <div className="flex items-start justify-between">

                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition">

                      {job.icon}

                    </div>

                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                      Open
                    </span>

                  </div>

                  {/* Title */}

                  <h3 className="text-xl font-bold text-slate-900 mt-6">
                    {job.title}
                  </h3>

                  {/* Details */}

                  <div className="space-y-3 mt-4">

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <CheckCircle2
                        size={17}
                        className="text-green-500"
                      />

                      <span>
                        {job.experience} experience
                      </span>

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <MapPin
                        size={17}
                        className="text-blue-600"
                      />

                      <span>
                        {job.location}
                      </span>

                    </div>

                  </div>

                  {/* Apply */}

                  <button
                    onClick={() => navigate("/apply-job")}
                    className="w-full mt-7 flex items-center justify-center gap-2 bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition"
                  >

                    Apply for this Position

                    <ArrowRight size={17} />

                  </button>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* ==========================================
            APPLICATION PROCESS
        ========================================== */}

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">

          <div className="text-center max-w-3xl mx-auto mb-14">

            <span className="text-sm font-semibold text-orange-500 uppercase tracking-wider">
              Simple Process
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              How to Join ServoraCare
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="relative text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold">
                1
              </div>

              <h3 className="font-bold text-xl mt-5">
                Choose a Position
              </h3>

              <p className="text-slate-500 mt-2">
                Find a job role that matches your skills and experience.
              </p>

            </div>

            <div className="relative text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold">
                2
              </div>

              <h3 className="font-bold text-xl mt-5">
                Submit Application
              </h3>

              <p className="text-slate-500 mt-2">
                Fill in your details and upload the required documents.
              </p>

            </div>

            <div className="relative text-center">

              <div className="w-14 h-14 mx-auto rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold">
                3
              </div>

              <h3 className="font-bold text-xl mt-5">
                Get Connected
              </h3>

              <p className="text-slate-500 mt-2">
                Our team will review your application and contact you.
              </p>

            </div>

          </div>

        </section>

        {/* ==========================================
            FINAL CTA
        ========================================== */}

        <section className="bg-blue-950 text-white">

          <div className="max-w-7xl mx-auto px-6 py-14">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

              <div>

                <h2 className="text-2xl sm:text-3xl font-bold">
                  Ready to start your journey?
                </h2>

                <p className="text-blue-200 mt-2">
                  Apply today and become part of ServoraCare.
                </p>

              </div>

              <button
                onClick={() => navigate("/apply-job")}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 px-7 py-3.5 rounded-xl font-semibold transition shrink-0"
              >
                Apply Now
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default Careers;