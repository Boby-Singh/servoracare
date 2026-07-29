import profilePhoto from "../assets/profile.jpg";
function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-5xl font-extrabold text-blue-900 text-center">
          About ServoraCare
        </h1>

        <p className="text-xl text-gray-600 text-center mt-4 max-w-3xl mx-auto">
          Transforming home services through trusted professionals,
          technology, and customer-first experiences across India.
        </p>

        <div className="mt-14 grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Who We Are
            </h2>

            <p className="text-gray-700 leading-8 text-lg">
              ServoraCare is a technology-driven home service platform
              connecting homeowners with skilled and verified
              professionals for electrical, plumbing, AC repair,
              CCTV installation, appliance servicing, painting,
              cleaning and many other household services.
            </p>

            <p className="mt-6 text-gray-700 leading-8 text-lg">
              We combine skilled technicians, transparent pricing,
              secure digital booking and customer support to
              deliver a seamless service experience.
            </p>

          </div>

        <div>

        <img
          src="/home-service.jpg"
          className="rounded-3xl shadow-xl"
          alt=""
        />

      </div>

    </div>

        <div className="space-y-5 text-gray-700 text-lg leading-relaxed">

          <p>
            Hello, I'm Boby Singh, the founder of ServoraCare.
            My vision is to simplify home services by connecting
            customers with trusted and verified professionals.
          </p>

          <p>
            Through ServoraCare, we aim to provide reliable
            services such as electrical work, plumbing,
            AC repair, CCTV installation, appliance maintenance,
            and many more—all through a simple and transparent
            booking platform.
          </p>

          <p>
            As an engineering professional with experience in
            operations, maintenance, technology, and process
            improvement, I believe technology can solve everyday
            service challenges and improve customer experiences.
          </p>

          <p>
            Our mission is to create a trusted ecosystem where
            customers receive quality service and skilled
            technicians gain better opportunities to grow.
          </p>

        </div>
        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">

          <div className="bg-blue-900 text-white rounded-3xl p-10 shadow-xl">

          <h2 className="text-3xl font-bold mb-5">
          🚀 Our Mission
          </h2>

          <p className="leading-8 text-lg">

          To simplify home maintenance by delivering
          trusted, affordable and high-quality services
          through technology while empowering skilled
          professionals across India.

          </p>

          </div>

          <div className="bg-orange-500 text-white rounded-3xl p-10 shadow-xl">

          <h2 className="text-3xl font-bold mb-5">
          🌍 Our Vision
          </h2>

          <p className="leading-8 text-lg">

          To become India's most trusted digital
          home service platform by setting new standards
          in customer experience, innovation,
          and professional excellence.

          </p>

          </div>

        </div>
         

      </div>

      <div className="grid md:grid-cols-3 gap-10 items-center mt-20">

    <div className="text-center">

        <img
            src={profilePhoto}
            alt="Founder"
            className="w-60 h-60 rounded-full mx-auto object-cover shadow-xl border-8 border-blue-100"
        />

        <h2 className="text-3xl font-bold mt-6">
            Boby Singh
        </h2>

        <p className="text-orange-500 font-semibold">
            Founder & CEO
        </p>

    </div>

    <div className="md:col-span-2">

        <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Message From Our Founder
        </h2>

        <p className="text-gray-700 text-lg leading-8">

            At ServoraCare, our vision is to redefine how
            households access trusted professional services.
            We believe every family deserves safe, affordable,
            and reliable home solutions delivered with complete
            transparency.

        </p>

        <p className="mt-6 text-gray-700 text-lg leading-8">

            Our goal is to empower skilled technicians with
            digital opportunities while ensuring customers
            receive exceptional service quality every time.

        </p>

    </div>

</div>

            <div className="mt-20">

            <h2 className="text-4xl font-bold text-center text-blue-900">

            Our Core Values

            </h2>

            <div className="grid md:grid-cols-4 gap-8 mt-10">

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h3 className="text-2xl font-bold">

            Trust

            </h3>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h3 className="text-2xl font-bold">

            Quality

            </h3>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h3 className="text-2xl font-bold">

            Innovation

            </h3>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <h3 className="text-2xl font-bold">

            Integrity

            </h3>

            </div>

            </div>

            </div>

            <div className="bg-blue-900 text-white rounded-3xl p-16 mt-20 text-center">

<h2 className="text-5xl font-bold">

Ready to Experience
Professional Home Services?

</h2>

<p className="mt-5 text-xl">

Book trusted professionals with ServoraCare today.

</p>

<button className="mt-10 bg-orange-500 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-orange-600">

Book a Service

</button>

            </div>

    </div>

  )
}

export default About
