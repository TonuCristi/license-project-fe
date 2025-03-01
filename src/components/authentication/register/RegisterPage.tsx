import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-primary w-20p rounded-lg border-2 p-4">
        <h1 className="mb-4 text-center text-2xl font-semibold">Register</h1>
        <RegisterForm />
      </div>
    </div>
  );
}
