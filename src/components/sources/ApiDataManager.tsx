import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Flex, Input, Space, Table, Tag } from "antd";
import { useState } from "react";
import {
  apiCreateSource,
  apiDeleteSource,
  apiFetchSourceByType,
} from "../../api/source.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

function ApiDataManager() {
  const [openCreate, setOpenCreate] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["source-api"],
    queryFn: async () => apiFetchSourceByType("api"),
  });

  const { control, handleSubmit, reset } = useForm<{
    id?: string;
    url: string;
    path: string;
  }>({
    defaultValues: {
      id: undefined,
      url: "",
      path: "",
    },
  });
  const { mutateAsync: createSource, isPending: isLoadingCreate } = useMutation(
    {
      mutationKey: ["create-api"],
      mutationFn: async (data: any) => apiCreateSource(data),
      onSuccess: () => refetch(),
    }
  );

  const { mutateAsync: deleteSource, isPending: isLoadingDeleteSource } =
    useMutation({
      mutationKey: ["create-twitter"],
      mutationFn: async (sourceId: string) => apiDeleteSource(sourceId),
      onSuccess: () => {
        refetch();
        toast.success("Source deleted successfully!");
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    });

  const onSubmit = async (data: any) => {
    try {
      await createSource({ ...data, type: "api" });
      setOpenCreate(false);
      reset({ url: "", path: "" });
      toast.success("Source added successfully!");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const columns = [
    {
      title: "Api Url",
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
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id: string) => (
        <>
          <Button
            onClick={() => deleteSource(id)}
            loading={isLoadingDeleteSource}
            variant="dashed"
            color="danger"
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Drawer
        title="Add Source"
        loading={isLoadingCreate}
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Controller
            control={control}
            name="url"
            rules={{
              required: "Url api required!",
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+(\/[a-zA-Z0-9.-]+)*(\?[a-zA-Z0-9-._~:/?#\[\]@!$&'()*+,;=%]+)?$/,
                message: "Invalid URL",
              },
            }}
            render={({
              field: { onBlur, onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                status={!invalid ? undefined : "error"}
                value={value}
                onBlur={onBlur}
                onChange={(e) => onChange(e.currentTarget.value)}
                placeholder="Enter a URL"
              />
            )}
          />

          <Controller
            control={control}
            name="path"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { invalid },
            }) => (
              <Input
                status={!invalid ? undefined : "error"}
                value={value}
                onBlur={onBlur}
                placeholder="Enter path (optional)"
                onChange={(e) => onChange(e.currentTarget.value)}
              />
            )}
          />
          <Flex gap={12} justify="flex-end" style={{ width: "100%" }}>
            <Button onClick={() => setOpenCreate(false)}>Cancel</Button>
            <Button
              loading={isLoadingCreate}
              type="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Flex>
        </Space>
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

export default ApiDataManager;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
