import { Button, Flex, Space, Tabs, TabsProps } from "antd";
import ApiDataKnowledge from "../components/knowledge/ApiDataKnowledge";
import TweetsKnowledge from "../components/knowledge/TweetsKnowledge";
import { useMutation } from "@tanstack/react-query";
import { apiFetchSourceByType } from "../api/source.api";

const KnowledgePage = () => {
  const items: TabsProps["items"] = [
    {
      key: "twitter",
      label: "Twitter Profile",
      children: <TweetsKnowledge />,
    },
    {
      key: "api",
      label: "Data API",
      children: <ApiDataKnowledge />,
    },
  ];

  const { mutateAsync: crawlAllTwitter, isPending: isLoadingTwitter } =
    useMutation({
      mutationKey: ["reset-data-twitter"],
      mutationFn: async () => apiFetchSourceByType("twitter"),
    });

  const { mutateAsync: crawlAllApi, isPending: isLoadingApi } = useMutation({
    mutationKey: ["reset-data-api"],
    mutationFn: async () => apiFetchSourceByType("api"),
  });

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        background: "#fff",
        padding: 24,
        borderRadius: 16,
      }}
    >
      <Flex style={boxStyle} justify="flex-end">
        <Button
          type="primary"
          loading={isLoadingTwitter}
          onClick={() => crawlAllTwitter()}
        >
          Crawl All Twitter
        </Button>
        <Button
          type="primary"
          loading={isLoadingApi}
          onClick={() => crawlAllApi()}
        >
          Crawl All API
        </Button>
      </Flex>
      <Tabs defaultActiveKey="twitter" items={items} />
    </Space>
  );
};

export default KnowledgePage;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
