import { Doctor, Service } from "@/types/medical";

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Aiman K.",
    specialization: "Therapist",
    experience: "10 years experience",
    photo: "/images/doctor1.jpg",
  },
  {
    id: "2",
    name: "Dr. Nurlan S.",
    specialization: "Cardiologist",
    experience: "12 years experience",
    photo: "/images/doctor2.jpg",
  },
];

export const services: Service[] = [
  {
    id: "1",
    title: "General consultation",
    description: "Initial consultation with a doctor",
    price: "10 000 ₸",
  },
  {
    id: "2",
    title: "Blood analysis",
    description: "Complete blood test",
    price: "6 000 ₸",
  },
];
