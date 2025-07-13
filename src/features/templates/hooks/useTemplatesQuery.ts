import { DocumentTemplate } from "@/shared/types/document";

const templates: DocumentTemplate[] = [
  {
    _id: "1",
    slug: "modern-resume",
    image: "/placeholder.jpg",
    title: "Modern Resume",
    description: "A clean, minimal template for tech professionals.",
    tags: ["minimal", "professional"],
  },
  {
    _id: "2",
    slug: "creative-cv",
    image: "/placeholder.jpg",
    title: "Creative CV",
    description: "Show your creative work with flair.",
    tags: ["creative", "portfolio"],
  },
  {
    _id: "3",
    slug: "executive-resume",
    image: "/placeholder.jpg",
    title: "Executive Resume",
    description: "Perfect for leadership roles.",
    tags: ["executive", "bold"],
  },
];

const useTemplatesQuery = () => {
  return templates;
};

export default useTemplatesQuery;
