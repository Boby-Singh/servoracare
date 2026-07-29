import profilePhoto from "../assets/profile.jpg";
function About() {
  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-5xl font-bold text-blue-900 mb-8 text-center">
          About the Founder
        </h1>

        <div className="text-center mb-8">

          <img
            src={profilePhoto}
            alt="Founder"
            className="w-40 h-40 rounded-full mx-auto object-cover shadow-lg"
          />

          <h2 className="text-3xl font-bold mt-5 text-gray-800">
            Boby Singh
          </h2>

          <p className="text-gray-600 text-lg">
            Founder & CEO, ServoraCare
          </p>

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

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Our Mission
            </h2>

            <p className="text-gray-700 text-lg">
              To provide trusted, affordable and quick home
              services while creating opportunities for
              skilled technicians across India.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Our Vision
            </h2>

            <p className="text-gray-700 text-lg">
              To become India's most trusted home service
              platform by combining technology with quality
              service delivery.
            </p>
          </div>

        </div>
         {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-4xl font-bold text-blue-900">
              100+
            </h2>
            <p className="text-gray-600 mt-2">
              Customers
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-4xl font-bold text-blue-900">
              150+
            </h2>
            <p className="text-gray-600 mt-2">
              Services Completed
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-4xl font-bold text-blue-900">
              25+
            </h2>
            <p className="text-gray-600 mt-2">
              Technicians
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-4xl font-bold text-blue-900">
              5+
            </h2>
            <p className="text-gray-600 mt-2">
              Cities Covered
            </p>
          </div>

        </div>

      </div>

    </div>

  )
}

export default About
