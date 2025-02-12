import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Drawer,
  Flex,
  Input,
  Space,
  Spin,
  Typography,
} from "antd";
import { apiCreateAgents, apiFetchAgents } from "../api/source.api";
import { nameToRandomAvatar } from "../utils";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
const { Text, Paragraph } = Typography;

const boxShadow =
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
const AgentsPage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => apiFetchAgents(),
  });

  const { control, handleSubmit, reset } = useForm<{
    id?: string;
    name: string;
    description?: string;
    prompt?: string;
  }>({
    defaultValues: {
      name: "",
    },
  });

  const { mutateAsync: createAgent, isPending: isLoadingCreate } = useMutation({
    mutationKey: ["create-agents"],
    mutationFn: async (data: any) => apiCreateAgents(data),
    onSuccess: () => {
      refetch();
      toast.success("Source added successfully!");
      setOpenCreate(false);
      reset({ name: "" });
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  const onSubmit = async (data: any) => {
    await createAgent({ ...data });
  };

  return (
    <>
      <Drawer
        title="New Agents"
        loading={isLoadingCreate}
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        <Space direction="vertical" style={{ width: "100%" }} size={20}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Url api required!",
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
                placeholder="Enter a name..."
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { invalid },
            }) => (
              <TextArea
                status={!invalid ? undefined : "error"}
                value={value}
                onBlur={onBlur}
                autoSize={{ minRows: 4, maxRows: 4 }}
                placeholder="Enter description..."
                onChange={(e) => onChange(e.currentTarget.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="prompt"
            render={({
              field: { onBlur, onChange, value },
              fieldState: { invalid },
            }) => (
              <TextArea
                status={!invalid ? undefined : "error"}
                value={value}
                onBlur={onBlur}
                placeholder="Enter Behavior of agent..."
                onChange={(e) => onChange(e.currentTarget.value)}
                autoSize={{ minRows: 5 }}
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
      <Flex style={boxStyle} justify="flex-end" align="center">
        <Button type="primary" onClick={() => setOpenCreate(true)}>
          New Agent
        </Button>
      </Flex>
      {isLoading ? (
        <Spin />
      ) : (
        <Space size={20}>
          {(data || []).map((agent) => (
            <div
              key={agent.id}
              style={{
                padding: "14px 24px",
                boxShadow: boxShadow,
                borderRadius: 12,
              }}
            >
              <Flex gap={12}>
                <Avatar size={40} src={nameToRandomAvatar(agent.slug)} />
                <Space size={4} direction="vertical">
                  <Text>{agent.name}</Text>
                  <Paragraph
                    ellipsis={{
                      rows: 2,
                      expandable: "collapsible",
                    }}
                    style={{ fontSize: 12, color: "#8c8c8c" }}
                  >
                    {agent.description}
                  </Paragraph>
                </Space>
              </Flex>
            </div>
          ))}
        </Space>
      )}
    </>
  );
};

export default AgentsPage;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
