import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <main className="pt-24 min-h-screen bg-gradient-to-b from-white to-gray-900 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          Bejelentkezés
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}
