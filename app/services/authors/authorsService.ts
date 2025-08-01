import $api from "../http";
import { Author } from "./authorsTypes";

export default class AuthorService {
  static async AuthorGet({
    authorSlug,
  }: {
    authorSlug: string;
  }): Promise<Author> {
    return (await $api.get<Author>(`/api/authors/slug/${authorSlug}`)).data;
  }
}
