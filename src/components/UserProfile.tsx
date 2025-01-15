import React from "react";
import { useUser } from "@civic/auth-web3/react";
import { CivicUser } from "../types";

const UserProfile: React.FC = () => {
  const { user, signOut } = useUser<CivicUser>();

  if (!user) return null;

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name || "Profile"}
            className="w-12 h-12 rounded-full"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;
