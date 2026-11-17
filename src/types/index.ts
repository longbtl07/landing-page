export type EventCategory = 
  | 'competition' 
  | 'talkshow' 
  | 'workshop' 
  | 'culture' 
  | 'recruitment';

export type EventBenefit = 
  | 'training_points' 
  | 'certificate' 
  | 'prizes' 
  | 'internship';

export interface EventReview {
  id: string;
  author: string;
  faculty: string;
  batch: string; // e.g. "K57", "K58"
  avatar: string;
  rating: number;
  comment: string;
  season: string; // e.g. "Mùa 2025", "Mùa 2024"
  date: string;
}

export interface EventTimelineStage {
  stage: string;
  time: string;
  desc: string;
}

export interface EventItem {
  id: string;
  title: string;
  organizer: string;
  organizerBadge: string;
  organizerType: 'youth_union' | 'faculty' | 'club' | 'school';
  category: EventCategory;
  categoryLabel: string;
  targetAudience: string;
  isFreshmanFriendly: boolean;
  benefits: EventBenefit[];
  benefitBadges: string[];
  trainingPoints?: number;
  hasCertificate: boolean;
  hasPrize: boolean;
  deadline: string; // YYYY-MM-DD
  deadlineFormatted: string;
  daysRemaining: number;
  isUrgent: boolean;
  eventDate: string;
  location: string;
  isOnline: boolean;
  bannerGradient: string; // CSS gradient class
  bannerTheme: string;
  bannerTag: string;
  shortDesc: string;
  fullDesc: string;
  detailedBenefits: string[];
  timeline: EventTimelineStage[];
  registrationUrl: string;
  contactEmail: string;
  contactFanpage: string;
  rating: number;
  reviewCount: number;
  reviews: EventReview[];
  tags: string[];
  createdAt: string;
  viewsCount: number;
}

export interface TeammatePost {
  id: string;
  authorName: string;
  faculty: string;
  batch: string;
  avatarColor: string;
  targetEventTitle: string;
  lookingFor: string[];
  description: string;
  currentMembers: number;
  maxMembers: number;
  contactZalo?: string;
  contactFacebook?: string;
  contactEmail: string;
  createdAt: string;
  status: 'recruiting' | 'full';
}

export interface SavedEventItem {
  eventId: string;
  savedAt: string;
  reminder24h: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
