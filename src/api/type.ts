export interface ResponseAPI<T = any> {
  data: T;
  error: boolean;
  code: number;
  message: string;
  traceId: string;
}

export interface IFSource {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  url: string;
  username?: string;
  refId?: string;
  path?: string;
  type: "twitter" | "api" | "website";
}
export interface IFAgent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
  description: string;
  prompt: string;
}
