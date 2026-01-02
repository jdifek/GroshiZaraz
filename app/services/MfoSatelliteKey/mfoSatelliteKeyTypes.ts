/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MfoSatelliteKey {
  id: number;
  keyUk: string;
  keyRu: string;
  slugUk: string;
  slugRu: string;
  seoContentUk: string;
  seoContentRu: string;
  mfoLinks: any[];
  metaTitleUk: string;
  metaTitleRu: string;
  metaDescUk: string;
  imageUrl?: string;
  keywords?: string;
  metaDescRu: string;
  titleUk: string;
  titleRu: string;
  descriptionUk: string;
  descriptionRu: string;
  createdAt: string;
  updatedAt: string;
  satellites: Array<{
    id: number;
    titleUk: string;
    titleRu: string;
  }>;
}

export interface MfoSatelliteKeyPayload {
  keyName: string;
  keyValue: string;
  mfoId: number;
}
