import { fetchQuery } from "convex/nextjs";
import { MailIcon, PhoneIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { RoleFilter } from "~/components/catalog/role-filter";
import { SearchInput } from "~/components/catalog/search-input";
import { api } from "~/convex/_generated/api";
import { useTitle } from "~/hooks/useTitle";
import { safeArray } from "~/lib/data.helpers";
import { searchParamsCache } from "./search-params";

export const metadata: Metadata = {
  title: "Profile Catalog",
  description: "Browse the profile catalog",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Catalog({ searchParams }: PageProps) {
  const { q, role } = searchParamsCache.parse(await searchParams);
  const { titles, getTitleId } = await useTitle();

  const titleId = getTitleId(role);

  const profiles = await fetchQuery(api.profiles.listProfile, {
    searchTerm: q || undefined,
    titleId: titleId || undefined,
  });
  const safeProfiles = safeArray(profiles);

  return (
    <div className="min-h-dvh px-5 py-8 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col *:w-full lg:flex-row lg:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Profile Catalog
            </h1>
            <p className="text-white/70">Browse our talented professionals</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <SearchInput />
            <RoleFilter titles={titles} />
          </div>
        </div>

        {/* Profile List or Empty State */}
        {safeProfiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/70">
            <p className="text-2xl font-semibold mb-4">No profiles found.</p>
            <p className="text-lg">
              {q
                ? `No results found for "${q}"`
                : "It looks like there are no professionals in our catalog yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {safeProfiles.map((profile, idx) => {
              const title = profile.title;
              const key = `profile-card-${idx}`;

              return (
                <div
                  key={key}
                  className="h-100 rounded-[40px] bg-blue-500/20 backdrop-blur-2xl shadow-lg group"
                >
                  <div className="h-full overflow-hidden rounded-[40px] shadow-lg text-[#413f3fc5] bg-blue-200 flex flex-col group-hover:-translate-1 transition-transform duration-100 delay-20 ease-in-out">
                    <div className="h-5/12 flex items-center justify-center">
                      <Image
                        src={profile.profileImage || "/file.svg"} // Fallback image if null
                        alt={profile.firstName}
                        width={150}
                        height={150}
                        className="rounded-full bg-zinc-500 h-35 aspect-square object-cover object-center shadow-lg"
                      />
                    </div>
                    <div className="h-7/12 rounded-t-[50px] bg-slate-50 inset-shadow-sm inset-shadow-blue-300/70 text-[#413f3f] flex flex-col gap-1 items-center p-4">
                      <p className="text-center font-semibold text-xl leading-none">
                        {profile.firstName} {profile.lastName}
                      </p>
                      <p className="text-center text-sm text-blue-300 font-medium">
                        @{profile.username}
                      </p>
                      <div className="text-center bg-blue-200/70 border border-blue-300 py-1 px-3 w-fit rounded-full text-sm font-medium text-blue-900">
                        {title?.name}
                      </div>
                      <div className="mt-5 w-full pt-4 border-t border-gray-300">
                        <div className="w-fit mx-auto space-y-3">
                          {profile.email && (
                            <div className="flex items-start gap-2">
                              <MailIcon size={18} />
                              <a
                                href={`mailto:${profile.email}`}
                                className="text-sm font-medium"
                              >
                                {profile.email}
                              </a>
                            </div>
                          )}
                          <div className="flex items-start gap-2">
                            <PhoneIcon size={18} />
                            <ul className="flex-1">
                              {profile.phoneNumbers.map(
                                (phone: string, idx: number) => {
                                  const key = `phone-${idx}`;
                                  return (
                                    <li
                                      key={key}
                                      className="text-sm mb-1 last:mb-0"
                                    >
                                      <a href={`tel:${phone}`}>{phone}</a>
                                    </li>
                                  );
                                },
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
