export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  photo: string;
  description?: string;
};

export type Service = {
  id: string;
  title: string;
  description?: string;
  price?: string;
};
