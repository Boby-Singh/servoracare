const testimonials = [

  {
    name: "Rahul Sharma",
    review: "Excellent electrician service and fast response."
  },

  {
    name: "Priya Verma",
    review: "Professional AC repair service at affordable price."
  },

  {
    name: "Amit Singh",
    review: "Trusted technicians and smooth booking process."
  }

]

function Testimonials() {

  return (
    <section className="bg-gray-100 py-24 px-6">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold text-blue-900 mb-4">
            Customer Reviews
          </h2>

          <p className="text-gray-600 text-lg">
            What our customers say about ServoraCare.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-3xl shadow-md"
            >

              <p className="text-gray-700 mb-6">
                "{item.review}"
              </p>

              <h3 className="text-xl font-bold text-blue-900">
                {item.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Testimonials