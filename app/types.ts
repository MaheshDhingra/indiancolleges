export interface College {
  id: number;
  name: string;
  type: string;
  location: string;
  description: string;
  image: string;
  top_package: string;
  cutoff: string;
  rating: number;
  reviews: number;
}

export interface Review {
  id: number;
  college_id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}
