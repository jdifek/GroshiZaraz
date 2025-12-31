import { Expert } from "../reviews/reviewsTypes";

export interface QuestionAnswer {
  id: number;
  questionId: number;
  textOriginal: string;
  authorName: string;
  textUk?: string;
  textRu?: string;
  isModerated: boolean;
  createdAt: string;
  expert: Expert;

}

export interface SiteQuestion {
  id: number;
  name: string;
  email: string;
  category: string;
  subject: string;
  subjectRu: string;
  slug: string;
  textOriginal: string;
  textUk: string;
  textRu: string;
  isModerated: boolean;
  createdAt: string;
  targetType: string;
  targetId: number;
  answers?: QuestionAnswer[]; // <-- добавлено
}

export interface CreateSiteQuestionPayload {
  name: string;
  email: string;
  subject: string;
  category: string;
  textOriginal: string;
}
