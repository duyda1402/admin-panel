import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Breadcrumb,
  Button,
  Empty,
  Flex,
  Input,
  Space,
  Spin,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  apiDeleteAgentBySlug,
  apiFetchAgentBySlug,
  apiUpdateAgentBySlug,
} from "../api/source.api";
import { nameToRandomAvatar } from "../utils";
const { Text } = Typography;

const AgentDetailsPage = () => {
  const { agentSlug } = useParams();
  const navigate = useNavigate();

  const {
    data: agent,
    isLoading,
    refetch,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["agents", agentSlug],
    queryFn: async () => apiFetchAgentBySlug(agentSlug!),
    enabled: !!agentSlug,
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

  const { mutateAsync: updateAgent, isPending: isLoadingUpdate } = useMutation({
    mutationKey: ["update-agents"],
    mutationFn: async (data: any) => apiUpdateAgentBySlug(agent?.slug!, data),
    onSuccess: () => {
      refetch();
      toast.success("Agent update successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
  const { mutateAsync: deleteAgent, isPending: isLoadingDelete } = useMutation({
    mutationKey: ["update-agents"],
    mutationFn: async () => apiDeleteAgentBySlug(agent?.slug!),
    onSuccess: () => {
      navigate("/agents");
      toast.success("Agent deleted successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  useEffect(() => {
    if (agent) {
      reset({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        prompt: agent.prompt,
      });
    }
  }, [agent, isLoading, isFetching]);

  const onSubmit = async (data: any) => {
    await updateAgent({ ...data });
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isError || !agent) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Agent not found!"
      />
    );
  }

  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
        background: "#fff",
        padding: 24,
        borderRadius: 16,
      }}
      size={20}
    >
      <Breadcrumb style={{ margin: "16px 0", cursor: "pointer" }}>
        <Breadcrumb.Item onClick={() => navigate("/agents")}>
          Agents
        </Breadcrumb.Item>
        <Breadcrumb.Item>{agent.name}</Breadcrumb.Item>
      </Breadcrumb>
      <Flex gap={12} style={{ width: "100%" }} align="flex-end">
        <Avatar size={48} src={nameToRandomAvatar(agent.slug)} />
        <div style={{ flex: 1 }}>
          <Text strong>Name Agent:</Text>
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
        </div>
      </Flex>
      <div>
        <Text strong>Description:</Text>
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
              autoSize={{ minRows: 3, maxRows: 3 }}
              placeholder="Enter description..."
              onChange={(e) => onChange(e.currentTarget.value)}
            />
          )}
        />
      </div>
      <div>
        <Text strong>Behavior of agent:</Text>
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
      </div>
      <Flex gap={12} justify="flex-end" style={{ width: "100%" }}>
        <Button
          loading={isLoadingDelete}
          color="danger"
          variant="filled"
          onClick={() => deleteAgent()}
        >
          Delete
        </Button>
        <Button
          loading={isLoadingUpdate}
          type="primary"
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Flex>
    </Space>
  );
};

export default AgentDetailsPage;
