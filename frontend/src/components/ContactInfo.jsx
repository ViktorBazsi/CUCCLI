export default function ContactInfo() {
    return (
      <section className="text-center space-y-4">
        <p className="text-lg text-gray-700">📍 1071 Budapest, Csányi utca 3.</p>
        <p className="text-lg text-gray-700">📞 +36 30 123 4567</p>
        <p className="text-lg text-gray-700">✉️ info@cucli.hu</p>
        <div className="flex justify-center gap-6 text-xl mt-4">
          <a href="https://facebook.com/aperturabazis" target="_blank" rel="noreferrer">
            📘 Facebook
          </a>
          <a href="https://instagram.com/aperturabazis" target="_blank" rel="noreferrer">
            📸 Instagram
          </a>
        </div>
      </section>
    );
  }
  