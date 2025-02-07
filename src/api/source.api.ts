import axiosInstance from "./instance";
import { IFSource, ResponseAPI } from "./type";

export const apiFetchSourceByType = async (
  type: "api" | "twitter" | "website"
): Promise<Array<IFSource>> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<Array<IFSource>>>(
      `/crawl/source/${type}`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiGetListFollower failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};
export const apiCreateSource = async (data: {
  url: string;
  path?: string;
  username?: string;
  type: "api" | "twitter" | "website";
}): Promise<Array<IFSource>> => {
  try {
    const response = await axiosInstance.post<any, ResponseAPI<any>>(
      `/crawl/source`,
      data
    );
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message);
  }
};

export const apiGetDataBySource = async (sourceId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<any>>(
      `/crawl/data/source/${sourceId}`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiGetDataBySource failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiDeleteSource = async (sourceId: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete<any, ResponseAPI<any>>(
      `/crawl/source/${sourceId}`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiDeleteSource failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};
export const apiResetRefIdSourceTwitter = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<any>>(
      `/crawl/source/twitter/reset`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiResetRefIdSourceTwitter failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiCrawlDataBySource = async (sourceId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<any>>(
      `/crawl/run/source/${sourceId}`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiGetListFollower failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiCrawlDataByType = async (
  type: "twitter" | "api"
): Promise<any> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<any>>(
      `/crawl/run/${type}/all`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiGetListFollower failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};
