import ChangePasswordForm from "../components/profile/components/ChangePasswordForm";
import ChangeUsernameForm from "../components/profile/components/ChangeUsernameForm";
import UserInfoSection from "../components/profile/components/UserInfoSection";

export default function ProfilePage() {
  return (
    <div className="border-primary m-auto flex h-full w-5xl flex-col gap-4 overflow-hidden border-x-2 p-4">
      <h1 className="text-xl font-medium">Profile</h1>
      <UserInfoSection />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Change username</h2>
        <ChangeUsernameForm />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">Change password</h2>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
