import ChangePasswordForm from "../components/profile/components/ChangePasswordForm";
import ChangeUsernameForm from "../components/profile/components/ChangeUsernameForm";
import RoomSection from "../components/profile/components/RoomSection";
import UserInfoSection from "../components/profile/components/UserInfoSection";

export default function ProfilePage() {
  return (
    <div className="border-primary scrollbar m-auto flex h-full w-full flex-col gap-6 overflow-hidden overflow-y-auto border-x-2 p-4 lg:w-5xl">
      <h1 className="text-xl font-medium">Profile</h1>
      <UserInfoSection />
      <section className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Change username</h2>
        <ChangeUsernameForm />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Change password</h2>
        <ChangePasswordForm />
      </section>
      <RoomSection />
    </div>
  );
}
