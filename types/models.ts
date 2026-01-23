export interface Profile {
  firstName: string;
  lastName: string;
  profileImage: string | null;
  email: string;
  phoneNumbers: string[];
  username: string;
  title: Title["id"];
}

export interface Title {
  id: string;
  name: string;
  description: string | null;
  color?: string;
}
