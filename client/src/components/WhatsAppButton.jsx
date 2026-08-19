/**
 * Wanderpost — WhatsAppButton (assignment bonus)
 * Floating WhatsApp contact button with pulsing ring, bottom-right.
 */
const WHATSAPP_NUMBER = "6561234567"; // demo placeholder number

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        "Hi Wanderpost! I'd like to know more about your travel packages."
      )}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={openWhatsApp}
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#25D366] opacity-40"
        aria-hidden
        style={{ animation: "wa-pulse 2s cubic-bezier(0.23,1,0.32,1) infinite" }}
      />
      <svg viewBox="0 0 32 32" className="relative h-7 w-7" fill="currentColor" aria-hidden>
        <path d="M16.004 4.5c-6.3 0-11.4 5.1-11.4 11.4 0 2 .5 4 1.5 5.7L4.5 27.5l6.2-1.6c1.6.9 3.4 1.3 5.3 1.3 6.3 0 11.4-5.1 11.4-11.4s-5.1-11.3-11.4-11.3zm0 20.7c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3.7.9 1-3.5-.2-.3c-1-1.5-1.5-3.3-1.5-5.1 0-5.2 4.2-9.4 9.4-9.4 5.2 0 9.4 4.2 9.4 9.4.1 5.2-4.1 9.5-9.3 9.5zm5.2-7.1c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4z" />
      </svg>
    </button>
  );
}
