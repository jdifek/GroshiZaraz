import $api from "../http";
import { Mfo, MfoPayload, RandomKey } from "./mfoTypes";

export default class MfoService {
  static async createMfo(params: MfoPayload): Promise<void> {
    try {
      await $api.post('/api/mfos', params);
    } catch (error) {
      console.error('Ошибка при создании МФО:', error);
      throw error;
    }
  }
  static async getMfoBySlug(slug: string): Promise<Mfo> {
    try {
      const response = await $api.get<Mfo>(`/api/mfos/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении МФО по slug="${slug}":`, error);
      throw error;
    }
  }

  static async updateMfo(id: number, params: MfoPayload): Promise<void> {
    try {
      await $api.put(`/api/mfos/${id}`, params);
    } catch (error) {
      console.error(`Ошибка при обновлении МФО с id=${id}:`, error);
      throw error;
    }
  }

  static async deleteMfo(id: number): Promise<void> {
    try {
      await $api.delete(`/api/mfos/${id}`);
    } catch (error) {
      console.error(`Ошибка при удалении МФО с id=${id}:`, error);
      throw error;
    }
  }

  static async getMfo(id: number): Promise<Mfo> {
    try {
      const response = await $api.get<Mfo>(`/api/mfos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Ошибка при получении МФО с id=${id}:`, error);
      throw error;
    }
  }

  static async getAllMfos(): Promise<Mfo[]> {
    try {
      const response = await $api.get<Mfo[]>('/api/mfos');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении списка МФО:', error);
      throw error;
    }
  }
  static async getRandomKeys(): Promise<RandomKey[]> {
    try {
      const response = await $api.get<RandomKey[]>('/api/mfos/all-20-random-keys');
      return response.data;
    } catch (error) {
      console.error('Ошибка при получении случайных ключей:', error);
      throw error;
    }
  }
}
