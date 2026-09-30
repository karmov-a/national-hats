export interface Hat {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  material: string;
  image_url: string;
  additional_images?: string[];
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: 'admin';
  created_at: string;
}
