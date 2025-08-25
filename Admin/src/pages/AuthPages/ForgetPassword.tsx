import PageMeta from "../../components/common/PageMeta.tsx";
import AuthLayout from "./AuthPageLayout.tsx";
// import SignInForm from "../../components/auth/SignInForm";
import ResetPasswordForm from "../../components/auth/ForgotPasswordForm.tsx";

export default function ForgetPassword() {
  return (
    <>
      <PageMeta
        title="AK Fashion | SignIn"
        description="SignIn page"
      />
      <AuthLayout>
        <ResetPasswordForm />
      </AuthLayout>
    </>
  );
}
