"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { getCurrentUser, updateProfile } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const data = await getCurrentUser(accessToken);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [accessToken]);

  const handleSave = async () => {
    if (!accessToken || !profile) return;
    setSaving(true);
    try {
      const updated = await updateProfile(profile, accessToken);
      setProfile(updated);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!profile) return <div className="p-8">No profile</div>;

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm">First Name</label>
            <input
              value={profile.firstName || ''}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input
              value={profile.lastName || ''}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Display Name</label>
            <input
              value={profile.displayName || ''}
              onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm">Bio</label>
            <textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-purple-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </main>
  );
}