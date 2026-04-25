"use client";
import { format } from "date-fns";
import {
  BookText,
  Calendar,
  ExternalLink,
  FileQuestionMark,
  FileText,
  Globe,
  LinkIcon,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Behance, Figma, GitHub, LinkedIn } from "~/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Project } from "~/types/models";

const getLinkIcon = (tag: string) => {
  const iconMap = {
    linkedin: LinkedIn,
    github: GitHub,
    portfolio: Globe,
    docs: BookText,
    figma: Figma,
    behance: Behance,
  };
  return iconMap[tag.toLowerCase()] || LinkIcon;
};

export function ProjectCard(project: Project) {
  return (
    <Card className="group rounded-3xl bg-blue-500/20 text-blue-300 border border-white/10">
      <CardHeader>
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <CardTitle className="text-2xl text-white">{project.title}</CardTitle>
          {(project.timeline.start || project.timeline.end) && (
            <div className="flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-linear-to-r from-amber-500/15 to-orange-500/15 px-4 py-2 text-sm font-medium text-amber-200/90 shadow-lg">
              <Calendar size={16} className="text-amber-300" />
              <span>
                {project.timeline.start && project.timeline.end
                  ? `${format(new Date(project.timeline.start), "MMM yyyy")} - ${format(new Date(project.timeline.end), "MMM yyyy")}`
                  : project.timeline.start
                    ? format(new Date(project.timeline.start), "MMM yyyy")
                    : project.timeline.end
                      ? format(new Date(project.timeline.end), "MMM yyyy")
                      : null}
              </span>
            </div>
          )}
        </div>

        <CardDescription className="text-lg text-white/90">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Project Media with Preview */}
        {project.media.length > 0 && (
          <div className="mb-7">
            <h4 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
              <div className="h-0.5 w-6 rounded-full bg-white/40" />
              Media Gallery
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.media.map((item, idx) => {
                const key = `${project.title}-media-${idx}`;
                return (
                  <Link
                    key={key}
                    href={item.metadata?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/media relative overflow-hidden rounded-2xl border border-white/15 bg-linear-to-br from-white/10 to-white/5 transition-colors duration-300 ease-in-out hover:border-white/40 hover:shadow-lg hover:from-white/13 hover:to-white/7"
                  >
                    {/* Media Preview */}
                    <div className="relative aspect-video w-full overflow-hidden bg-linear-to-br from-slate-700/50 to-slate-800/50">
                      {item.type === "photo" && item.metadata?.url ? (
                        <Image
                          src={item.metadata.url as string}
                          alt={`${project.title} photo`}
                          fill
                          className="object-cover brightness-90 transition-transform duration-300 group-hover/media:scale-110"
                        />
                      ) : item.type === "video" && item.metadata?.url ? (
                        <div className="relative h-full w-full">
                          <video
                            className="h-full w-full object-cover transition-transform duration-300 group-hover/media:scale-110"
                            muted
                            poster={
                              (item.metadata?.thumbnail as string) || undefined
                            }
                          >
                            <source
                              src={item.metadata.url as string}
                              type="video/mp4"
                            />
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="rounded-full bg-white/20 p-4 transition-all duration-300 ease-in-out group-hover/media:bg-white/30 group-hover/media:scale-110">
                              <Video size={32} className="text-white" />
                            </div>
                          </div>
                        </div>
                      ) : item.type === "pdf" ? (
                        <div className="relative h-full w-full">
                          <div className="relative w-full h-full overflow-hidden">
                            <div className="absolute z-1 inset-0" />
                            <embed
                              src={`${item.metadata?.url}#toolbar=0&navpanes=0&scrollbar=0`}
                              type="application/pdf"
                              className="w-[calc(100%+20px)] h-full border-none scale-110 transition-transform duration-300 group-hover/media:scale-120"
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="rounded-2xl bg-linear-to-br from-red-500/20 to-orange-500/20 p-4 transition-all duration-300 ease-in-out group-hover/media:from-red-500/30 group-hover/media:to-orange-500/30 group-hover/media:scale-110">
                              <FileText size={32} className="text-white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <div className="rounded-full bg-white/20 p-4 transition-all duration-300 ease-in-out group-hover/media:bg-white/30 group-hover/media:scale-110">
                            <FileQuestionMark
                              size={32}
                              className="text-white"
                            />
                          </div>
                        </div>
                      )}
                      {/* Type Badge */}
                      <div className="absolute top-3 right-3 rounded-lg border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-semibold uppercase text-white">
                        {item.type}
                      </div>
                    </div>
                    {/* Media Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold capitalize text-white/80 group-hover/media:text-white transition-colors">
                          {(item.metadata?.title as string) ??
                            `Untitled ${item.type === "pdf" ? "Document" : item.type}`}
                        </p>
                        {(item.metadata?.url as string) && (
                          <div className="flex items-center gap-1.5 text-xs text-blue-300/80 group-hover/media:text-blue-300 transition-colors font-medium">
                            <span>View</span>
                            <ExternalLink size={12} />
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Project Links */}
        {project.link && project.link.length > 0 && (
          <div>
            <h4 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-widest text-white/60 uppercase">
              <div className="h-0.5 w-6 rounded-full bg-white/40" />
              Project Links
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.link.map(({ tag, value: url }, idx) => {
                const Icon = getLinkIcon(tag);
                return (
                  <div key={`${project.title}-link-${idx}`}>
                    <Link
                      key={tag}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link flex items-center gap-2.5 rounded-xl border border-white/20 bg-linear-to-r from-white/10 to-white/5 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors duration-300 ease-in-out hover:border-white/40 hover:from-white/13 hover:to-white/7 hover:text-blue-200 hover:shadow-lg"
                    >
                      <Icon size={14} />
                      <span className="truncate max-w-50">
                        {url.replace(/^https?:\/\/(www\.)?/, "")}
                      </span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
