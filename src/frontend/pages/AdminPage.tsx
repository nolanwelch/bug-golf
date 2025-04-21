import { SignIn, useUser } from "@clerk/react-router";
import { Navigate } from "react-router-dom";
import NewKataForm from "../components/NewKataForm";

export default function AdminPage() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  } else if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignIn
          forceRedirectUrl={window.location.pathname}
          fallbackRedirectUrl={window.location.pathname}
        />
      </div>
    );
  }

  if (!user.publicMetadata.roles?.includes("admin")) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <NewKataForm />
      </div>
    </div>
  );
}
