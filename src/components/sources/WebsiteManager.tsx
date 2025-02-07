import { useQuery } from "@tanstack/react-query";
import { Button, Drawer, Flex, Table, Tag } from "antd";
import { useState } from "react";
import { apiFetchSourceByType } from "../../api/source.api";

function WebsiteManager() {
  const [openCreate, setOpenCreate] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["source-website"],
    queryFn: async () => apiFetchSourceByType("website"),
  });

  const columns = [
    {
      title: "Web Url",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Tag color="blue"> {url} </Tag>
        </a>
      ),
    },
    {
      title: "Path",
      dataIndex: "path",
      key: "path",
      render: (refId: string) => <Tag>{refId}</Tag>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
  ];
  return (
    <div>
      <Drawer
        title="Add Source"
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        Coming Soon
      </Drawer>
      <Flex style={boxStyle} justify="flex-end">
        <Button type="primary" onClick={() => setOpenCreate(true)}>
          Add Source
        </Button>
      </Flex>

      <Table loading={isLoading} dataSource={data} columns={columns} />
    </div>
  );
}

export default WebsiteManager;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
