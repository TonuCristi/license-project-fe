import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-primary w-20p rounded-lg border-2 p-4">
        <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
