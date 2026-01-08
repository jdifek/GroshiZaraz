/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  nameUk: string;
  metaTitleRu?: string;
  metaTitleUk?: string;
  metaDescriptionRu?: string;
  metaDescriptionUk?: string;
  metaKeywordsRu?: string;
  metaKeywordsUk?: string;
}
export interface CategoryCreateDto {
  name: string;
  icon?: string;
  nameUk: string;
}

export interface CategoryUpdateDto extends CategoryCreateDto {}