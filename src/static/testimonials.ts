export interface Testimonial {
  name: string;
  position: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    position: "Product Manager at TechCorp",
    content:
      "Working with this developer was an absolute pleasure. Their attention to detail and commitment to delivering high-quality code made our project a success.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Michael Chen",
    position: "CTO at StartupX",
    content:
      "The technical expertise and problem-solving skills demonstrated were exceptional. They consistently delivered solutions that exceeded our expectations.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emily Rodriguez",
    position: "UX Designer at DesignHub",
    content:
      "Their ability to translate design concepts into functional code while maintaining pixel-perfect accuracy was impressive. A true professional.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "David Kim",
    position: "Project Lead at InnovateTech",
    content:
      "The developer's technical knowledge and ability to adapt to changing requirements made them an invaluable asset to our team.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];
