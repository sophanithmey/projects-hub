export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: 'github' | 'twitter' | 'linkedin' | 'globe' | 'mail' | 'telegram';
}

export interface CreatorProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  availableForHire: boolean;
  portfolioUrl?: string;
  socialLinks: SocialLink[];
}
