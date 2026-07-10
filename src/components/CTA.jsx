import { Link } from "react-router-dom"

function CTA() {

  return (
    <section className="bg-orange-500 py-20 px-6 text-center text-white">

      <h2 className="text-5xl font-bold mb-6">
        Need Urgent Home Service?
      </h2>

      <p className="text-xl mb-8">
        Book trusted professionals instantly.
      </p>

      <Link to="/book-service">

        <button className="bg-white text-orange-500 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-100">
          Book Service
        </button>

      </Link>

    </section>
  )
}

export default CTA