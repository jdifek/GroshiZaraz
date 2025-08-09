import $api from "../http";
import { CreateSiteQuestionPayload, SiteQuestion } from "./SiteQuestionTypes";

export default class SiteQuestionService {
  static async getAllQuestions(params?: { onlyModerated?: boolean; sortByModerated?: boolean }): Promise<SiteQuestion[]> {
    const query = new URLSearchParams();

    if (params?.onlyModerated) query.append("onlyModerated", "true");
    if (params?.sortByModerated) query.append("sortByModerated", "true");

    const url = `/api/site-questions${query.toString() ? "?" + query.toString() : ""}`;
    return (await $api.get<SiteQuestion[]>(url)).data;
  }

  static async getOne(id: number): Promise<SiteQuestion> {
    return (await $api.get<SiteQuestion>(`/api/site-questions/${id}`)).data;
  }

  static async create(payload: CreateSiteQuestionPayload): Promise<SiteQuestion> {
    return (await $api.post<SiteQuestion>("/api/site-questions", payload)).data;
  }

  static async update(id: number, payload: Partial<CreateSiteQuestionPayload>): Promise<SiteQuestion> {
    return (await $api.put<SiteQuestion>(`/api/site-questions/${id}`, payload)).data;
  }

  static async remove(id: number): Promise<void> {
    await $api.delete(`/api/site-questions/${id}`);
  }
}
