import { Link } from "react-router-dom"
import heroImage from "../assets/page.png"; 

function Hero() {
  return (
    <section
  className="relative min-h-screen bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${heroImage})`,
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-transparent"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">

    <div className="max-w-2xl">

      <span className="inline-block bg-blue-900/50 border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6">
        ✔ PROFESSIONAL • RELIABLE • TRUSTED
      </span>

      <h1 className="text-6xl font-extrabold leading-tight text-white">

        Trusted Home
        <br />

        Services

        <span className="text-orange-400">
          {" "}At Your
        </span>

        <br />

        <span className="text-orange-400">
          Doorstep
        </span>

      </h1>

      <p className="text-xl text-gray-200 mt-8 max-w-xl leading-8">

        Book verified electricians, plumbers,
        AC technicians, CCTV installers and
        other trusted professionals with fast,
        reliable and affordable service.

      </p>

      <div className="flex flex-wrap gap-5 mt-10">

        <Link to="/book-service">
          <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">
            Book Service
          </button>
        </Link>

        <Link to="/services">
          <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-900 transition text-lg">
            Explore Services
          </button>
        </Link>

      </div>

      {/* Trust Badges */}

      <div className="flex flex-wrap gap-8 mt-12 text-white">

        <div>
          <p className="font-bold">✔ Verified</p>
          <p className="text-gray-300">Professionals</p>
        </div>

        <div>
          <p className="font-bold">⏰ Fast</p>
          <p className="text-gray-300">On-Time Service</p>
        </div>

        <div>
          <p className="font-bold">💰 Transparent</p>
          <p className="text-gray-300">Pricing</p>
        </div>

      </div>

      {/* Rating */}

      <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-5 inline-block">

        <h2 className="text-4xl font-bold">
          ⭐ 4.8/5
        </h2>

        <p className="text-gray-300 mt-2">
          Trusted by Happy Customers
        </p>

      </div>

    </div>

  </div>

</section>
  )
}

export default Hero

