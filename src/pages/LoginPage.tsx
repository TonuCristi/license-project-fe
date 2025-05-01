import AuthFormContainer from "../components/authentication/components/AuthFormContainer";
import AuthFormTitle from "../components/authentication/components/AuthFormTitle";
import AuthPageContainer from "../components/authentication/components/AuthPageContainer";
import LoginForm from "../components/authentication/components/login/LoginForm";

export default function LoginPage() {
  return (
    <AuthPageContainer>
      <AuthFormContainer>
        <AuthFormTitle>Login</AuthFormTitle>
        <LoginForm />
      </AuthFormContainer>
    </AuthPageContainer>
  );
}
