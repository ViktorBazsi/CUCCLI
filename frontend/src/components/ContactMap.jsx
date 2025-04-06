export default function ContactMap() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md">
      <iframe
        title="Csányi utca 3 térkép"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10780.640618627116!2d19.0621979!3d47.5022658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc45e04e2e6f%3A0xc9643e72d67f35a1!2sBudapest%2C%20Cs%C3%A1nyi%20utca%203%2C%201071!5e0!3m2!1shu!2shu!4v1712345678901"
        width="100%"
        height="300"
        allowFullScreen=""
        loading="lazy"
        className="w-full h-80 border-0"
      ></iframe>
    </div>
  );
}
