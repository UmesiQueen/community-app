export interface Profile {
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

export interface Project {
  title: string;
  timeline: {
    start: number | null;
    end: number | null;
  };
  description: string;
  media: Media[];
  link: {
    tag: "github" | "live" | "figma" | "behance" | "docs" | "other";
    value: string;
  }[];
}

export interface Media {
  type: "photo" | "pdf" | "video";
  metadata: {
    url: string;
    title?: string;
    thumbnail?: string;
  };
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
