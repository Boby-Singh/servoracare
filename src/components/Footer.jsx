function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-10 text-center">

      <h2 className="text-3xl font-bold mb-4">
        ServoraCare
      </h2>

      <p className="mb-4">
        Trusted Home Service Platform
      </p>

      <p>
        © 2026 ServoraCare. All Rights Reserved.
      </p>
      <Link
        to="/privacy-policy"
        className="text-sm text-gray-500 hover:text-orange-500"
      >
        Privacy Policy
      </Link>

    </footer>
  )
}

export default Footer