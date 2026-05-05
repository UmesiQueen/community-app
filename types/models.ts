export interface Profile {
  userId?: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  email: string;
  phoneNumbers: string[];
  username: string;
  title: Title;
  links: Link[];
  shortBio?: string;
  projects?: Project[];
}

export interface Title {
  name: string;
  description: string | null;
  color?: string;
}

export interface Link {
  tag: string; // eg linkedin, github, website
  value: string; // https://linkedin.com
  title: string; // LinkedIn
}

export interface Project_Link {
  tag: "github" | "live" | "figma" | "behance" | "docs" | "other";
  value: string;
}

export interface MediaMetadata {
  url: string; // filled after cloud upload
  title?: string; // user-supplied label
  filename: string; // uploaded file name
  mimeType: string; // e.g. "image/png"
  size: number; // bytes
  duration?: number; // seconds – video only
  width?: number; // px – image/video
  height?: number; // px – image/video
  storageId?: string; // Convex storageId after upload
}

export interface Media {
  type: "photo" | "pdf" | "video";
  metadata: MediaMetadata;
}

export type TimelineDate =
  | null
  | { year: string }
  | { month: string; year: string };

export interface Project {
  title: string;
  timeline: {
    start: TimelineDate;
    end: TimelineDate;
  };
  ongoing: boolean;
  description: string;
  media: Media[];
  link: Project_Link[];
}

export interface WorkExperience {
  logo?: string;
  companyName: string;
  location: "remote" | "hybrid" | "onsite";
  type: "contract" | "full-time";
  timeline: {
    start: number;
    end?: number;
  };
  description: string;
  position: string;
}
