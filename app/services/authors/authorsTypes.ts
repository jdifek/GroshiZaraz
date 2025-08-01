export interface Author {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  color: string;
  position: string;
  bio: string;
  experience: string;
  followers: number;
  totalViews: number;
  totalPosts: number;
  expertise: string[];
  achievements: string[];
  telegram?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}