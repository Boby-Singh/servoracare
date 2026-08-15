import { useEffect, useRef, useState } from "react"
import {
  RiCustomerService2Fill,
  RiCloseLine,
  RiSendPlaneFill,
  RiRobot2Line,
  RiUser3Line
} from "react-icons/ri"

function ChatBot() {

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef(null)

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello 👋 Welcome to ServoraCare!",
      time: new Date()
    },
    {
      id: 2,
      sender: "bot",
      text: "I'm your virtual assistant. How can I help you today?",
      time: new Date()
    }
  ])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages, isTyping])

  // Bot response
  const getBotReply = (message) => {

    const msg = message.toLowerCase()

    if (
      msg.includes("service") ||
      msg.includes("services")
    ) {
      return "We currently provide Electrician, Plumbing, AC Repair, CCTV Installation, Appliance Service, Painting and Home Cleaning services."
    }

    if (
      msg.includes("book") ||
      msg.includes("booking")
    ) {
      return "You can easily book a service by clicking the 'Book Service' button on our website. Select your service, choose a suitable time and submit your request."
    }

    if (
      msg.includes("price") ||
      msg.includes("cost") ||
      msg.includes("rate")
    ) {
      return "Our service charges depend on the type of service and the work required. You can select a service to view the applicable pricing."
    }

    if (
      msg.includes("technician") ||
      msg.includes("worker")
    ) {
      return "Once your booking is confirmed, ServoraCare will assign a suitable technician to your service request."
    }

    if (
      msg.includes("cancel") 
    ) {
      return "If you want to cancel a booking, please contact our support team with your booking details."
    }

    if (
      msg.includes("contact") ||
      msg.includes("support") ||
      msg.includes("help")
    ) {
      return "Our support team is here to help. You can contact ServoraCare through the contact section on our website."
    }

    if (
      msg.includes("hello") ||
      msg.includes("hi") ||
      msg.includes("hey")
    ) {
      return "Hello 👋 How can I help you with your ServoraCare service today?"
    }

    if (
      msg.includes("thank") ||
      msg.includes("thanks")
    ) {
      return "You're welcome! 😊 We're always happy to help."
    }

    return "I'm sorry, I couldn't quite understand that. You can ask me about our services, booking, pricing, technicians or support."
  }

  const sendMessage = (messageText = input) => {

    if (!messageText.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: messageText.trim(),
      time: new Date()
    }

    setMessages(prev => [
      ...prev,
      userMessage
    ])

    setInput("")
    setIsTyping(true)

    // Simulate bot typing
    setTimeout(() => {

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: getBotReply(messageText),
        time: new Date()
      }

      setMessages(prev => [
        ...prev,
        botMessage
      ])

      setIsTyping(false)

    }, 700)
  }

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date) => {

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (

    <>
      {/* Floating Chat Button */}

      {!isOpen && (

        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open ServoraCare Assistant"
          className="
            fixed bottom-6 right-6 z-50
            w-16 h-16
            rounded-full
            bg-blue-900
            text-white
            shadow-2xl
            flex items-center justify-center
            hover:bg-blue-800
            hover:scale-110
            transition-all duration-300
            group
          "
        >

          <RiCustomerService2Fill
            size={30}
          />

          {/* Online indicator */}

          <span
            className="
              absolute top-1 right-1
              w-4 h-4
              bg-green-500
              border-2
              border-white
              rounded-full
            "
          />

          {/* Tooltip */}

          <span
            className="
              absolute right-20
              whitespace-nowrap
              bg-gray-900
              text-white
              text-xs
              px-3 py-2
              rounded-lg
              opacity-0
              group-hover:opacity-100
              transition
              pointer-events-none
            "
          >
            Chat with ServoraCare
          </span>

        </button>

      )}

      {/* Chat Window */}

      {isOpen && (

        <div
          className="
            fixed
            bottom-5 right-5
            sm:bottom-6 sm:right-6
            z-50
            w-[calc(100%-2rem)]
            sm:w-[380px]
            h-[600px]
            max-h-[calc(100vh-2rem)]
            bg-white
            rounded-2xl
            shadow-2xl
            overflow-hidden
            flex flex-col
            border border-gray-200
            animate-[chatOpen_0.25s_ease-out]
          "
        >

          {/* Header */}

          <div
            className="
              bg-gradient-to-r
              from-blue-950
              to-blue-800
              text-white
              px-5 py-4
              flex items-center
              justify-between
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-11 h-11
                  bg-white/15
                  rounded-full
                  flex items-center justify-center
                "
              >
                <RiRobot2Line size={25} />
              </div>

              <div>

                <h3 className="font-semibold text-base">
                  ServoraCare Assistant
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-blue-100">

                  <span
                    className="
                      w-2 h-2
                      bg-green-400
                      rounded-full
                    "
                  />

                  Online • Usually replies instantly

                </div>

              </div>

            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="
                w-9 h-9
                rounded-full
                hover:bg-white/10
                flex items-center justify-center
                transition
              "
            >
              <RiCloseLine size={25} />
            </button>

          </div>

          {/* Messages */}

          <div
            className="
              flex-1
              overflow-y-auto
              p-4
              bg-gray-50
              space-y-4
            "
          >

            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`
                  flex gap-2
                  ${msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                  }
                `}
              >

                {/* Bot Avatar */}

                {msg.sender === "bot" && (

                  <div
                    className="
                      flex-shrink-0
                      w-8 h-8
                      bg-blue-100
                      text-blue-900
                      rounded-full
                      flex items-center justify-center
                    "
                  >
                    <RiRobot2Line size={17} />
                  </div>

                )}

                <div
                  className={`
                    max-w-[78%]
                    ${
                      msg.sender === "user"
                        ? "items-end"
                        : "items-start"
                    }
                    flex flex-col
                  `}
                >

                  <div
                    className={`
                      px-4 py-2.5
                      text-sm
                      leading-relaxed
                      shadow-sm
                      ${
                        msg.sender === "user"
                          ? `
                            bg-blue-900
                            text-white
                            rounded-2xl
                            rounded-br-md
                          `
                          : `
                            bg-white
                            text-gray-700
                            border border-gray-100
                            rounded-2xl
                            rounded-bl-md
                          `
                      }
                    `}
                  >
                    {msg.text}
                  </div>

                  <span
                    className="
                      text-[10px]
                      text-gray-400
                      mt-1
                      px-1
                    "
                  >
                    {formatTime(msg.time)}
                  </span>

                </div>

                {/* User Avatar */}

                {msg.sender === "user" && (

                  <div
                    className="
                      flex-shrink-0
                      w-8 h-8
                      bg-blue-900
                      text-white
                      rounded-full
                      flex items-center justify-center
                    "
                  >
                    <RiUser3Line size={17} />
                  </div>

                )}

              </div>

            ))}

            {/* Typing indicator */}

            {isTyping && (

              <div className="flex items-center gap-2">

                <div
                  className="
                    w-8 h-8
                    bg-blue-100
                    text-blue-900
                    rounded-full
                    flex items-center justify-center
                  "
                >
                  <RiRobot2Line size={17} />
                </div>

                <div
                  className="
                    bg-white
                    border border-gray-100
                    rounded-2xl
                    rounded-bl-md
                    px-4 py-3
                    flex gap-1
                  "
                >

                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />

                </div>

              </div>

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* Quick Replies */}

          <div
            className="
              px-3 pt-3
              bg-white
              border-t
              border-gray-100
            "
          >

            <div className="flex gap-2 overflow-x-auto pb-2">

              {[
                "Our services",
                "Book a service",
                "Pricing",
                "Contact support"
              ].map((option) => (

                <button
                  key={option}
                  onClick={() => sendMessage(option)}
                  className="
                    whitespace-nowrap
                    text-xs
                    px-3 py-2
                    rounded-full
                    border
                    border-blue-200
                    text-blue-800
                    bg-blue-50
                    hover:bg-blue-100
                    transition
                  "
                >
                  {option}
                </button>

              ))}

            </div>

          </div>

          {/* Input */}

          <div
            className="
              p-3
              bg-white
              flex items-center gap-2
            "
          >

            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="
                flex-1
                h-11
                px-4
                text-sm
                bg-gray-100
                border
                border-transparent
                rounded-xl
                outline-none
                focus:bg-white
                focus:border-blue-400
                transition
              "
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim()}
              aria-label="Send message"
              className="
                w-11 h-11
                rounded-xl
                bg-blue-900
                text-white
                flex items-center justify-center
                hover:bg-blue-800
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                transition
              "
            >
              <RiSendPlaneFill size={19} />
            </button>

          </div>

          {/* Footer */}

          <div
            className="
              text-center
              text-[10px]
              text-gray-400
              pb-2
              bg-white
            "
          >
            ServoraCare • Your trusted home service partner
          </div>

        </div>

      )}

      {/* Animation */}

      <style>
        {`
          @keyframes chatOpen {
            from {
              opacity: 0;
              transform: translateY(15px) scale(0.96);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>

    </>

  )
}

export default ChatBot