export interface Profile {
  firstName: string;
  lastName: string;
  profileImage: string | null;
  email: string;
  phoneNumbers: string[];
  username: string;
  title: Title;
  links: Link[];
}

export interface Title {
  name: string;
  description: string | null;
  color?: string;
}

interface Link {
  tag: string; // eg linkedin, github, website
  value: string; // https://linkedin.com
  title: string; // LinkedIn
}
