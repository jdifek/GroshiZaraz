import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://mfo.qissseee.tech";

export interface PageDatesResponse {
  date_published: string; // ISO 8601
  date_modified: string;  // ISO 8601
  type: string;
}

export async function getPageDates(params: {
  type: "home" | "questions" | "reviews" | "catalog" | "loans" | "credits" | "mfo" | "promocodes";
  mfo_id?: number;
  mfo_slug?: string;
  category?: string;
}): Promise<PageDatesResponse> {
  try {
    const response = await axios.get<PageDatesResponse>(
      `${API_URL}/api/v1/pages/dates`,
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("getPageDates error:", error);
    throw new Error("Failed to fetch page dates");
  }
}
