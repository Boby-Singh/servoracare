import { useState } from "react"
import axios from "axios"
import AdminLayout from "../../layouts/AdminLayout"
function AddTechnician() {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  employee_code: "",
  phone: ""
})

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]: e.target.value

    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "http://localhost:5000/api/admin/add-technician",
        formData
      )

      alert(response.data.message)

      setFormData({
        name: "",
        email: "",
        password: "",
        employee_code: "",
        phone: ""
      })

    } catch (error) {

      console.log(error)

    }

  }

  return (
    <AdminLayout>

    <div className="p-10">

      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Add Technician
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Technician Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-4 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-4 rounded-lg"
          required
        />

        <input
          type="text"
          name="employee_code"
          placeholder="Employee Code (EMP1001)"
          value={formData.employee_code}
          onChange={handleChange}
          className="w-full border p-4 rounded-lg"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border p-4 rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-4 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800"
        >
          Add Technician
        </button>

      </form>


    </div>

    </AdminLayout>

  )

}

export default AddTechnician