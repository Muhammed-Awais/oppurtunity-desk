export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: "job" | "scholarship" | "internship";
  description: string;
  deadline: string;
  location: string;
  tags: string[];
  image?: string;
  featured?: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
}

export interface Note {
  id: string;
  title: string;
  subject: string;
  category: string;
  type: "text" | "pdf" | "mcq";
  content?: string;        // For text notes
  pdfUrl?: string;          // For PDF download link
  questions?: Question[];   // For MCQ notes
  pages: number;
  downloads: number;
  updatedAt: string;
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  attempts: number;
  questions?: Question[];
}
