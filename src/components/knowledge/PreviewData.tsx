import { useMutation, useQuery } from "@tanstack/react-query";
import ReactJson from "react-json-view";
import { IFSource } from "../../api";
import { apiCrawlDataBySource, apiGetDataBySource } from "../../api/source.api";
import { Button, Flex, Space } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

type Props = {
  source: IFSource;
};

const PreviewData = ({ source }: Props) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["data-crawl", source.id],
    queryFn: async () => apiGetDataBySource(source.id),
    enabled: !!source.id,
  });

  const { mutateAsync: crawlBySource, isPending: isLoadingCrawl } = useMutation(
    {
      mutationKey: ["crawl-by-source"],
      mutationFn: async (sourceId: string) => apiCrawlDataBySource(sourceId),
      onSuccess: () => {
        refetch();
        toast.success("Crawl data successfully!");
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <Space direction="vertical">
      <Flex style={boxStyle} justify="flex-start">
        <Button
          loading={isLoadingCrawl}
          onClick={() => crawlBySource(source.id)}
          icon={<SyncOutlined />}
          type="primary"
          size="small"
        >
          Crawl
        </Button>
      </Flex>
      <ReactJson
        src={data}
        // theme="shapeshifter"
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </Space>
  );
};
export default PreviewData;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
