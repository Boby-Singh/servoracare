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

// import { Link } from "react-router-dom";
// import {
//   ShieldCheck,
//   Clock3,
//   BadgeDollarSign,
//   Star,
//   Users,
//   BriefcaseBusiness,
// } from "lucide-react";

// function Hero() {
//   return (
//     <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white">

//       <div className="max-w-7xl mx-auto px-6 py-20">

//         <div className="grid lg:grid-cols-2 gap-16 items-center">

//           {/* LEFT */}

//           <div>

//             <div className="inline-flex items-center gap-2 bg-blue-800 px-5 py-2 rounded-full mb-6">

//               <ShieldCheck size={18} className="text-green-400" />

//               <span className="text-sm font-semibold">
//                 PROFESSIONAL • RELIABLE • TRUSTED
//               </span>

//             </div>

//             <h1 className="text-6xl font-extrabold leading-tight">

//               Trusted Home
//               <br />

//               Services

//               <span className="text-orange-400">
//                 {" "}At Your
//               </span>

//               <br />

//               <span className="text-orange-400">
//                 Doorstep
//               </span>

//             </h1>

//             <p className="text-xl text-gray-300 mt-8 leading-8 max-w-xl">

//               Book verified electricians, plumbers,
//               AC technicians, CCTV installers and
//               many more professionals with fast,
//               affordable and reliable service.

//             </p>

//             {/* Features */}

//             <div className="grid grid-cols-3 gap-6 mt-10">

//               <div className="flex items-center gap-3">

//                 <ShieldCheck className="text-green-400" size={32} />

//                 <div>

//                   <p className="font-semibold">
//                     Verified
//                   </p>

//                   <p className="text-sm text-gray-300">
//                     Experts
//                   </p>

//                 </div>

//               </div>

//               <div className="flex items-center gap-3">

//                 <Clock3 className="text-yellow-400" size={32} />

//                 <div>

//                   <p className="font-semibold">
//                     Fast
//                   </p>

//                   <p className="text-sm text-gray-300">
//                     On-Time
//                   </p>

//                 </div>

//               </div>

//               <div className="flex items-center gap-3">

//                 <BadgeDollarSign
//                   className="text-orange-400"
//                   size={32}
//                 />

//                 <div>

//                   <p className="font-semibold">
//                     Transparent
//                   </p>

//                   <p className="text-sm text-gray-300">
//                     Pricing
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* Buttons */}

//             <div className="flex gap-5 mt-10">

//               <Link to="/book-service">

//                 <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-xl text-lg font-semibold shadow-lg">

//                   Book a Service →

//                 </button>

//               </Link>

//               <Link to="/services">

//                 <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-900 transition text-lg">

//                   Explore Services

//                 </button>

//               </Link>

//             </div>

//           </div>

//           {/* RIGHT */}

//           <div className="relative">

//             <img
//               src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80"
//               alt="Technicians"
//               className="rounded-3xl shadow-2xl"
//             />

//             {/* Floating Rating */}

//             <div className="absolute bottom-8 left-8 bg-white rounded-2xl p-5 shadow-xl w-72">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <h2 className="text-3xl font-bold text-blue-900">
//                     4.9/5
//                   </h2>

//                   <p className="text-gray-600">
//                     Customer Rating
//                   </p>

//                 </div>

//                 <Star
//                   className="text-yellow-400 fill-yellow-400"
//                   size={40}
//                 />

//               </div>

//               <p className="mt-3 text-gray-500">
//                 Trusted by 10,000+ happy customers
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* SERVICES */}

//       <div className="max-w-7xl mx-auto px-6">

//         <div className="bg-white rounded-3xl shadow-2xl grid md:grid-cols-5 text-center py-10 -mb-20 relative z-10">

//           {[
//             "Electrician",
//             "Plumber",
//             "AC Repair",
//             "CCTV",
//             "More",
//           ].map((item) => (

//             <div key={item} className="py-4">

//               <div className="bg-blue-100 w-16 h-16 rounded-full mx-auto flex items-center justify-center">

//                 <BriefcaseBusiness
//                   className="text-blue-700"
//                 />

//               </div>

//               <h3 className="mt-4 font-bold text-blue-900">
//                 {item}
//               </h3>

//             </div>

//           ))}

//         </div>

//       </div>

//       {/* STATS */}

//       <div className="bg-blue-950 pt-32 pb-14">

//         <div className="max-w-7xl mx-auto grid md:grid-cols-4 text-center gap-8">

//           <div>

//             <Users
//               size={42}
//               className="mx-auto text-orange-400"
//             />

//             <h2 className="text-4xl font-bold mt-3">
//               10,000+
//             </h2>

//             <p className="text-gray-300">
//               Happy Customers
//             </p>

//           </div>

//           <div>

//             <ShieldCheck
//               size={42}
//               className="mx-auto text-green-400"
//             />

//             <h2 className="text-4xl font-bold mt-3">
//               500+
//             </h2>

//             <p className="text-gray-300">
//               Verified Technicians
//             </p>

//           </div>

//           <div>

//             <Clock3
//               size={42}
//               className="mx-auto text-yellow-400"
//             />

//             <h2 className="text-4xl font-bold mt-3">
//               30 Min
//             </h2>

//             <p className="text-gray-300">
//               Average Response
//             </p>

//           </div>

//           <div>

//             <Star
//               size={42}
//               className="mx-auto text-orange-400"
//             />

//             <h2 className="text-4xl font-bold mt-3">
//               100%
//             </h2>

//             <p className="text-gray-300">
//               Satisfaction
//             </p>

//           </div>

//         </div>

//       </div>

//     </section>
//   );
// }

// export default Hero;