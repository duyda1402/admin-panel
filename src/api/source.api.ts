import axiosInstance from "./instance";
import { IFAgent, IFSource, ResponseAPI } from "./type";

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

export const apiChatAgent = async (data: {
  agentSlug: string;
  say: string;
  threadId?: string;
}): Promise<any> => {
  try {
    const { agentSlug, ...props } = data;
    const response = await axiosInstance.post<any, ResponseAPI<any>>(
      `/agent/${agentSlug}/ask`,
      props
    );
    return response.data;
  } catch (err: any) {
    console.log("apiChatAgent failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};
export const apiFetchAgents = async (): Promise<Array<IFAgent>> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<IFAgent[]>>(
      `/agent`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiFetchAgents failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiFetchAgentBySlug = async (slug: string): Promise<IFAgent> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<IFAgent>>(
      `/agent/record/${slug}`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiFetchAgents failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiUpdateAgentBySlug = async (
  slug: string,
  data: {
    name: string;
    description?: string;
    prompt?: string;
  }
): Promise<IFAgent> => {
  try {
    const response = await axiosInstance.put<any, ResponseAPI<IFAgent>>(
      `/agent/record/${slug}`,
      data
    );
    return response.data;
  } catch (err: any) {
    console.log("apiFetchAgents failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};
export const apiDeleteAgentBySlug = async (slug: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete<any, ResponseAPI<any>>(
      `/agent/record/${slug}`
    );
    return response.data;
  } catch (err: any) {
    console.log("apiFetchAgents failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiCreateAgents = async (data: {
  name: string;
  description?: string;
  prompt?: string;
}): Promise<Array<IFAgent>> => {
  try {
    const response = await axiosInstance.post<any, ResponseAPI<IFAgent[]>>(
      `/agent`,
      data
    );
    return response.data;
  } catch (err: any) {
    console.log("apiFetchAgents failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};

export const apiCheckHealthy = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get<any, ResponseAPI<any>>(`/healthy`);
    return response;
  } catch (err: any) {
    console.log("apiFetchAgents failed: ", err.message);
    throw new Error(err.response?.data?.message);
  }
};
