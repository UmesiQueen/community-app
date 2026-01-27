import { fetchQuery } from "convex/nextjs";
import { Briefcase, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import ReturnButton from "~/components/profile-card/return-button";
import { api } from "~/convex/_generated/api";
import { safeObj } from "~/lib/data.helpers";
import type { Profile } from "~/types/models";

// Create a cached version of the profile query
const getProfileByUsername = cache(async (username: string) => {
  return await fetchQuery(api.profiles.getProfileByUsername, { username });
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const currentProfile = await getProfileByUsername(username);
  const profile: Profile = safeObj(currentProfile);

  if (Object.keys(profile).length < 1) {
    return {
      title: "Profile Not Found",
      description: "User profile details",
    };
  }

  return {
    title: `${profile.firstName} ${profile.lastName} | Profile`,
    description: `View the profile of ${profile.firstName} ${profile.lastName}`,
  };
}

export default async function ProfileCard({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const currentProfile = await getProfileByUsername(username);
  const profile: Profile = safeObj(currentProfile);

  if (Object.keys(profile).length < 1) notFound();

  return (
    <div className="container mx-auto px-5 py-8 md:px-8">
      <div className="mb-5 flex justify-between items-center gap-5">
        <h1 className="text-white-700 w-fit text-[clamp(14px,7vw,36px)] font-bold">
          User Profile
        </h1>
        <ReturnButton />
      </div>
      <div className="min-h-100 space-y-6 rounded-2xl bg-slate-50/10 p-5 text-white shadow-2xl backdrop-blur-md md:space-y-10 md:p-10">
        <div className="flex flex-col items-start gap-x-10 gap-y-5 md:flex-row md:items-center">
          <div className="aspect-square h-35 overflow-hidden rounded-full border border-white/20 shadow-xl md:h-50">
            <Image
              src={profile.profileImage || "/file.svg"}
              alt={profile.firstName}
              width={200}
              height={200}
              className="object-fit object-center"
            />
          </div>
          <div className="space-y-2">
            <p className="w-fit text-center text-xl leading-none font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="w-fit text-center text-base font-medium text-blue-300">
              @{profile.username}
            </p>
            <div className="flex w-fit items-start gap-1.5 rounded-full border border-blue-300 bg-blue-200/70 px-3.5 pt-2 pb-1 text-center text-base font-medium text-blue-900">
              <Briefcase size={20} /> {profile.title.name}
            </div>
          </div>
        </div>

        {/* Department */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md md:p-8">
          <h2 className="mb-3 text-sm font-semibold tracking-wider text-white/60 uppercase">
            Department
          </h2>
          <p className="text-xl leading-relaxed text-white">
            {profile.title.description}
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="mb-5 text-sm font-semibold tracking-wider text-white/60 uppercase">
            Contact Information
          </h2>
          <div className="flex flex-col gap-5 *:w-full lg:flex-row">
            {/* Email */}
            <div className="group rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/15 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="rounded-xl bg-white/15 p-2 transition-colors group-hover:bg-white/25 md:p-3">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 text-xs tracking-wide text-white/60 uppercase">
                      Email Address
                    </div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-lg font-medium break-all text-white transition-colors hover:text-white/80"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/15 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-1 items-start gap-4">
                  <div className="rounded-xl bg-white/15 p-2 transition-colors group-hover:bg-white/25 md:p-3">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 text-xs tracking-wide text-white/60 uppercase">
                      Phone Number
                    </div>
                    <div className="space-y-1">
                      {profile.phoneNumbers.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="block text-lg font-medium text-white transition-colors hover:text-white/80"
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
