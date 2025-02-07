import { useQuery } from "@tanstack/react-query";
import { Collapse, Space, Tag, theme } from "antd";
import { IFSource } from "../../api";
import { apiFetchSourceByType } from "../../api/source.api";
import PreviewData from "./PreviewData";

const ApiDataKnowledge = () => {
  const { token } = theme.useToken();
  const { data } = useQuery({
    queryKey: ["source-api"],
    queryFn: async () => apiFetchSourceByType("api"),
  });

  return (
    <Collapse
      bordered={false}
      style={{ background: token.colorBgContainer }}
      items={(data || []).map((item: IFSource) => ({
        key: item.id,
        label: (
          <Space>
            <Tag color="green">Active</Tag>
            <Tag color="blue">{item.url}</Tag>
          </Space>
        ),
        children: <PreviewData source={item} />,
      }))}
    />
  );
};

export default ApiDataKnowledge;
