export type Pricing = 'Free' | 'Freemium' | 'Paid';

export type Category =
  | 'Writing' | 'Research' | 'Image' | 'Video' | 'Audio'
  | 'Coding' | 'Productivity' | 'Marketing' | 'Chatbot' | 'Data'
  | 'Design' | 'Finance';

export type BlogTag = 'students' | 'money' | 'tools' | 'news';

export interface Tool {
  id: number;
  name: string;
  cat: Category;
  icon: string;
  color: string;
  desc: string;
  pricing: Pricing;
  url: string;
  is_new?: boolean;
  slug?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  tag: BlogTag;
  emoji: string;
  bg: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  read_time: string;
  published_at: string;
  is_published: boolean;
}

export interface Rating {
  id: number;
  tool_id: number;
  user_id: string;
  rating: number;
  created_at: string;
}

export interface Bookmark {
  id: number;
  user_id: string;
  tool_id: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}
