import AuthFormContainer from "../components/authentication/components/AuthFormContainer";
import AuthFormTitle from "../components/authentication/components/AuthFormTitle";
import AuthPageContainer from "../components/authentication/components/AuthPageContainer";
import RegisterForm from "../components/authentication/components/register/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthPageContainer>
      <AuthFormContainer>
        <AuthFormTitle>Register</AuthFormTitle>
        <RegisterForm />
      </AuthFormContainer>
    </AuthPageContainer>
  );
}
