import { Document } from "@/shared/types/document";

const documents: Document[] = [
  {
    _id: "1",
    image: "/placeholder.jpg",
    userId: "user1",
    category: "resume",
    title: "Software Engineer Resume",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
  },
  {
    _id: "2",
    image: "/placeholder.jpg",
    userId: "user2",
    category: "cv",
    title: "Data Scientist CV",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "published",
  },
  {
    _id: "3",
    image: "/placeholder.jpg",
    userId: "user3",
    category: "resume",
    title: "Product Manager Resume",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "archived",
  },
];

const useDocumentListQuery = () => {
  return documents;
};

export default useDocumentListQuery;
