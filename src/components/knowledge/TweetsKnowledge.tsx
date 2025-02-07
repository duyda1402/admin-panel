import { useQuery } from "@tanstack/react-query";
import { Collapse, Space, Tag, theme } from "antd";
import { IFSource } from "../../api";
import { apiFetchSourceByType } from "../../api/source.api";
import PreviewData from "./PreviewData";

const TweetsKnowledge = () => {
  const { token } = theme.useToken();

  const { data } = useQuery({
    queryKey: ["source-twitter"],
    queryFn: async () => apiFetchSourceByType("twitter"),
  });

  return (
    <Collapse
      bordered={false}
      style={{ background: token.colorBgContainer }}
      items={(data || [])
        .filter((item: IFSource) => !!item.refId)
        .map((item: IFSource) => ({
          key: item.id,
          label: (
            <Space>
              {item.refId ? (
                <Tag color="green">Active</Tag>
              ) : (
                <Tag color="yellow">Inactive</Tag>
              )}
              <Tag color="blue">{item.url}</Tag>
            </Space>
          ),
          children: <PreviewData source={item} />,
        }))}
    />
  );
};

export default TweetsKnowledge;
