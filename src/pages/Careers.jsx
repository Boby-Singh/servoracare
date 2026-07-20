import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";

function Careers() {
  const navigate = useNavigate();

  const jobs = [
    {
      title: "Electrician",
      icon: <Zap size={42} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "Plumber",
      icon: <Wrench size={42} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "AC Technician",
      icon: <AirVent size={42} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "CCTV Technician",
      icon: <ShieldCheck size={42} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "Painter",
      icon: <PaintBucket size={42} />,
      experience: "1+ Years",
      location: "Multiple Cities",
    },
    {
      title: "Cleaning Executive",
      icon: <BrushCleaning size={42} />,
      experience: "Fresher / Experienced",
      location: "Multiple Cities",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Breadcrumb */}

      <div className="max-w-7xl mx-auto px-6 py-6">

        <Link
          to="/"
          className="text-blue-700 hover:text-orange-500 font-medium"
        >
          Home
        </Link>

        <span className="mx-2 text-gray-500">/</span>

        <span className="text-gray-600">
          Careers
        </span>

      </div>

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-bold mb-6">
            Build Your Career with
            <span className="text-orange-400">
              {" "}ServoraCare
            </span>
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">

            Join India's growing home service platform and become part of a
            professional team delivering trusted services across the country.

          </p>

          <button
            onClick={() =>
              document
                .getElementById("jobs")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="mt-10 bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            View Open Positions
          </button>

        </div>

      </section>

      {/* Why Join */}

      <section className="max-w-7xl mx-auto py-20 px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
          Why Join ServoraCare?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <Briefcase
              className="mx-auto text-orange-500 mb-5"
              size={48}
            />

            <h3 className="text-2xl font-bold mb-3">
              Growing Startup
            </h3>

            <p className="text-gray-600">
              Be part of a fast-growing company transforming the home services industry.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <IndianRupee
              className="mx-auto text-green-500 mb-5"
              size={48}
            />

            <h3 className="text-2xl font-bold mb-3">
              Attractive Earnings
            </h3>

            <p className="text-gray-600">
              Competitive payouts with incentives based on your performance.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <GraduationCap
              className="mx-auto text-blue-600 mb-5"
              size={48}
            />

            <h3 className="text-2xl font-bold mb-3">
              Training Programs
            </h3>

            <p className="text-gray-600">
              Improve your skills with professional training and support.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <Users
              className="mx-auto text-purple-600 mb-5"
              size={48}
            />

            <h3 className="text-2xl font-bold mb-3">
              Friendly Team
            </h3>

            <p className="text-gray-600">
              Work with experienced professionals in a supportive environment.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <Trophy
              className="mx-auto text-yellow-500 mb-5"
              size={48}
            />

            <h3 className="text-2xl font-bold mb-3">
              Career Growth
            </h3>

            <p className="text-gray-600">
              Opportunities to become senior technicians and team leaders.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <Clock
              className="mx-auto text-red-500 mb-5"
              size={48}
            />

            <h3 className="text-2xl font-bold mb-3">
              Flexible Work
            </h3>

            <p className="text-gray-600">
              Choose your working hours and grow at your own pace.
            </p>

          </div>

        </div>

      </section>

      {/* Open Positions */}

      <section
        id="jobs"
        className="max-w-7xl mx-auto pb-24 px-6"
      >

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
          Current Open Positions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {jobs.map((job, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition"
            >

              <div className="text-orange-500 mb-6">
                {job.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                {job.title}
              </h3>

              <p className="text-gray-600 mb-2">
                Experience: {job.experience}
              </p>

              <p className="text-gray-600 mb-8">
                Location: {job.location}
              </p>

              <button
                onClick={() => navigate("/apply-job")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
              >
                Apply Now
              </button>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Careers;