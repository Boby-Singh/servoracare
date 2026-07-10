import { useState } from "react"
import { RiCustomerService2Fill } from "react-icons/ri"

function ChatBot() {

  const [isOpen, setIsOpen] = useState(false)

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello 👋 Welcome to ServoCare. How can I help you today?"
    }
  ])

  const [input, setInput] = useState("")

  const sendMessage = () => {

    if (!input.trim()) return

    const userMessage = {
      sender: "user",
      text: input
    }

    let botReply = "Sorry, I didn't understand."

    const msg = input.toLowerCase()

    if (msg.includes("service")) {

      botReply =
        "We provide Electrician, Plumber, AC Repair and CCTV Installation services."

    } else if (msg.includes("book")) {

      botReply =
        "You can click on Book Service and submit your request."

    } else if (msg.includes("price")) {

      botReply =
        "Prices depend on the service type and work required."

    } else if (msg.includes("contact")) {

      botReply =
        "You can contact us at +91 XXXXX XXXXX."

    }

    setMessages([
      ...messages,
      userMessage,
      {
        sender: "bot",
        text: botReply
      }
    ])

    setInput("")

  }

  return (

    <div>

      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-900 text-white w-16 h-16 rounded-full shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
        <RiCustomerService2Fill size={30} />
      </button>

      {isOpen && (

        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-xl overflow-hidden">

          <div className="bg-blue-900 text-white p-4 font-bold">
            ServoCare Assistant
          </div>

          <div className="h-80 overflow-y-auto p-4">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-3 ${
                  msg.sender === "user"
                    ? "text-right"
                    : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>

            ))}

          </div>

          <div className="p-3 border-t flex">

            <input
              type="text"
              placeholder="Type message..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              className="flex-1 border rounded-lg px-3 py-2"
            />

            <button
              onClick={sendMessage}
              className="bg-blue-900 text-white px-4 ml-2 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>

      )}

    </div>

  )

}

export default ChatBot