import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Flex, Input, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import {
  apiCreateSource,
  apiDeleteSource,
  apiFetchSourceByType,
  apiResetRefIdSourceTwitter,
} from "../../api/source.api";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const extractUsernameFromUrl = (url: String) => {
  const urlPattern = /([^/]+)(?=\/?$)/;
  const match = url.match(urlPattern);
  return match ? match[0] : "";
};

function TweetsManager() {
  const [openCreate, setOpenCreate] = useState(false);
  const { control, handleSubmit, watch, setValue, reset } = useForm<{
    id?: string;
    url: string;
    username: string;
  }>({
    defaultValues: {
      id: undefined,
      url: "",
      username: "",
    },
  });

  useEffect(() => {
    if (watch("url")) {
      const username = extractUsernameFromUrl(watch("url"));
      setValue("username", username);
    } else {
      setValue("username", "");
    }
  }, [watch("url")]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["source-twitter"],
    queryFn: async () => apiFetchSourceByType("twitter"),
  });

  const { mutateAsync: createSource, isPending: isLoadingCreate } = useMutation(
    {
      mutationKey: ["create-twitter"],
      mutationFn: async (data: any) => apiCreateSource(data),
      onSuccess: () => {
        refetch();
        toast.success("Source added successfully!");
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
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
  const {
    mutateAsync: resetRefIdSourceTwitter,
    isPending: isResetRefIdSourceTwitter,
  } = useMutation({
    mutationKey: ["reset-source-twitter"],
    mutationFn: async () => apiResetRefIdSourceTwitter(),
    onSuccess: () => {
      refetch();
      toast.success("Source reset successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  const onSubmit = async (data: any) => {
    await createSource({ ...data, type: "twitter" });
    setOpenCreate(false);
    reset({ url: "", username: "" });
  };

  const columns = [
    {
      title: "Profile Url",
      dataIndex: "url",
      key: "url",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Tag color="blue"> {url} </Tag>
        </a>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Referrer Id",
      dataIndex: "refId",
      key: "refId",
      render: (refId: string) => <Tag>{refId}</Tag>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Status",
      dataIndex: "refId",
      render: (refId?: string) => (
        <>
          {refId ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="yellow">Inactive</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
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
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Controller
            control={control}
            name="url"
            rules={{
              required: "Link profile required!",
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?(x\.com|twitter\.com)\/[a-zA-Z0-9_-]+/,
                message: "Link profile invalid!",
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
                placeholder="Profile URL"
              />
            )}
          />

          <Controller
            control={control}
            name="username"
            render={({ field: { value } }) => (
              <Input placeholder="Username" readOnly disabled value={value} />
            )}
          />
          <Flex gap={12} justify="flex-end" style={{ width: "100%" }}>
            <Button
              loading={isLoadingCreate}
              onClick={() => setOpenCreate(false)}
            >
              Cancel
            </Button>
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
        <Button
          loading={isResetRefIdSourceTwitter}
          type="primary"
          onClick={() => resetRefIdSourceTwitter()}
        >
          Reset Source
        </Button>
        <Button type="primary" onClick={() => setOpenCreate(true)}>
          Add Source
        </Button>
      </Flex>

      <Table loading={isLoading} dataSource={data} columns={columns} />
    </div>
  );
}

export default TweetsManager;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
