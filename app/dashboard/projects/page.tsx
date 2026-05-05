"use client";
import { Pencil } from "lucide-react";
import { RedirectType, redirect, useRouter } from "next/navigation";
import { ProjectCard } from "~/components/dashboard/projects/project-card";
import { ProjectCardSkeleton } from "~/components/dashboard/projects/project-card-skeleton";
import { Button } from "~/components/ui/button";
import { useProfile } from "~/hooks/useProfile";

export default function Projects() {
  const { profile, isLoading } = useProfile();
  const router = useRouter();

  if (profile?.projects && profile.projects.length < 1)
    redirect("/dashboard/projects/edit", RedirectType.replace);

  return (
    <div>
      <div className="mb-8 flex justify-between items-center gap-5">
        <h1 className="text-4xl font-semibold">Projects</h1>
        {!isLoading && (
          <Button
            variant={"secondary"}
            size={"sm"}
            onClick={() => router.push("/dashboard/projects/edit")}
          >
            <Pencil /> Edit
          </Button>
        )}
      </div>

      {isLoading ? (
        <ProjectCardSkeleton />
      ) : (
        profile?.projects &&
        profile.projects.length > 0 && (
          <div className="flex flex-col gap-8">
            {profile.projects.map((project, idx) => {
              const key = `${project.title}-${idx}`;
              return <ProjectCard key={key} {...project} />;
            })}
          </div>
        )
      )}
    </div>
  );
}
