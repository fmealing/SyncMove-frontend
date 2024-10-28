export interface Partner {
  fullName: string;
  profilePicture: string;
  bio: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  matchScore: number;
  _id: string;
  gender: string;
}

export interface UserProfile {
  fullName: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  activityType: string;
  fitnessGoals: string;
  experienceLevel: number;
  dob: string;
  gender: string;
  privacyPreferences: {
    shareLocation: boolean;
    shareActivityType: boolean;
    visibility: string;
  };
}
