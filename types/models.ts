export interface Profile {
  firstName: string;
  lastName: string;
  profileImage: string;
  email: string | null;
  phoneNumbers: string[];
  username: string;
  title: Title["id"];
}

export interface Title {
  id: string;
  name: string;
}
