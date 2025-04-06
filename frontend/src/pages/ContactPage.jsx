import ContactMap from "../components/ContactMap";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-900 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-900">
          Kapcsolat
        </h1>

        <ContactForm />
        <ContactMap />
        <ContactInfo />
      </div>
    </main>
  );
}
