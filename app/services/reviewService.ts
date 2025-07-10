import axios from "axios";
import { Mfo } from "./mfosService";

export interface Review {
  id: number;
  author_name: string;
  review_text: string;
  rating: number;
  helpful_count: number;
  not_helpful_count: number;
  admin_response: string | null;
  admin_response_at: string | null;
  admin_response_author: string | null;
  created_at: string;
  mfo: {
    id: number;
    name: string;
    slug: string;
    logo_url: string;
  };
}

export type SortType = "newest" | "helpful" | "rating_desc" | "rating_asc";

export interface GetReviewsParams {
  page?: number;
  mfo_slug?: string;
  mfo_id?: number;
  rating?: number;
  sort?: SortType;
}

// Тип ответа API
export interface ReviewsApiResponse {
  mfo: Mfo
  data: Review[];
  meta?: {
    current_page?: number;
    last_page?: number;
    per_page?: number;
    total?: number;
  };
  links?: {
    first?: string;
    last?: string;
    next?: string | null;
    prev?: string | null;
  };
}


export interface CreateReviewParams {
  mfo_id: number;
  author_name: string;
  author_email: string;
  review_text: string;
  speed_rating: number;
  conditions_rating: number;
  support_rating: number;
  website_rating: number;
}

// Ответ от API на POST /reviews
interface CreateReviewResponse {
  message: string;
  review: Review;
}
export const getReviews = async (
  params: GetReviewsParams = {}
): Promise<ReviewsApiResponse> => {
  try {
    const response = await axios.get<ReviewsApiResponse>(
      "https://mfo.qissseee.tech/api/v1/reviews",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("getReviews error:", error);
    throw new Error("Failed to fetch reviews");
  }
};

export const createReview = async (
  data: CreateReviewParams
): Promise<CreateReviewResponse> => {
  try {
    const response = await axios.post<CreateReviewResponse>(
      "https://mfo.qissseee.tech/api/v1/reviews",
      data
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 422) {
      console.error("Validation errors:", error.response.data.errors);
      throw error.response.data;
    }
    console.error("createReview error:", error);
    throw new Error("Failed to create review");
  }
};


// Тип для запроса на создание ответа
export interface CreateReviewReplyParams {
  parent_id: number;
  author_name: string;
  review_text: string;
}

// Ответ от API
export interface CreateReviewReplyResponse {
  message: string;
  reply: {
    id: number;
    parent_id: number;
    author_name: string;
    review_text: string;
    created_at: string;
  };
}

// Функция для отправки ответа на отзыв
export const createReviewReply = async (
  data: CreateReviewReplyParams
): Promise<CreateReviewReplyResponse> => {
  try {
    const response = await axios.post<CreateReviewReplyResponse>(
      "https://mfo.qissseee.tech/api/v1/reviews/reply",
      data
    );
    return response.data;
  } catch (error) {
    console.error("createReviewReply error:", error);
    throw new Error("Failed to create review reply");
  }
};
export interface ReviewVoteResponse {
  message: string;
  helpful_count: number;
  not_helpful_count: number;
  user_vote?: "helpful" | "not_helpful";
}

// Отметить отзыв как полезный
export const markReviewHelpful = async (
  id: number
): Promise<ReviewVoteResponse> => {
  try {
    const response = await axios.post<ReviewVoteResponse>(
      `https://mfo.qissseee.tech/api/v1/reviews/${id}/helpful`
    );
    return response.data;
  } catch (error) {
    console.error("markReviewHelpful error:", error);
    throw new Error("Failed to mark review as helpful");
  }
};

// Отметить отзыв как неполезный
export const markReviewNotHelpful = async (
  id: number
): Promise<ReviewVoteResponse> => {
  try {
    const response = await axios.post<ReviewVoteResponse>(
      `https://mfo.qissseee.tech/api/v1/reviews/${id}/not-helpful`
    );
    return response.data;
  } catch (error) {
    console.error("markReviewNotHelpful error:", error);
    throw new Error("Failed to mark review as not helpful");
  }
};