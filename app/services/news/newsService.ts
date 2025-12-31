// services/NewsService.ts
import $api from "../http";
import { News, NewsFormData, NewsStatistic } from "./newsTypes";

export default class NewsService {
  static async createNews(data: NewsFormData): Promise<News> {
    const res = await $api.post<News>("/api/news", data);
    return res.data;
  }

  static async updateNews(id: number, data: NewsFormData): Promise<News> {
    const res = await $api.put<News>(`/api/news/${id}`, data);
    return res.data;
  }

  static async getNewsById(id: number): Promise<News> {
    const res = await $api.get<News>(`/api/news/${id}`);
    return res.data;
  }

  static async getNewsBySlug(slug: string): Promise<News> {
    const res = await $api.get<News>(`/api/news/slug/${slug}`);
    return res.data;
  }

  static async deleteNews(id: number): Promise<void> {
    await $api.delete(`/api/news/${id}`);
  }

  static async getAllNews(limit?: number): Promise<News[]> {
    const query = limit ? `?limit=${limit}` : "";
    const res = await $api.get<News[]>(`/api/news/${query}`);
    return res.data;
  }

  static async getNewsByCategorySlug(slug: string): Promise<News[]> {
    const res = await $api.get<News[]>(`/api/news/category/${slug}`);
    return res.data;
  }

  static async getNewsStatistic(): Promise<NewsStatistic> {
    const res = await $api.get<NewsStatistic>("/api/news/dashboard/statistic");
    return res.data;
  }
}
