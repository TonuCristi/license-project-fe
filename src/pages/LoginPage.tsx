import LoginForm from "../components/authentication/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-primary xxs:w-4/5 xs:w-80 w-11/12 rounded-lg border-2 p-4">
        <h1 className="mb-4 text-center text-2xl font-semibold">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
