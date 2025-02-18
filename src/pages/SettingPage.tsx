import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Flex, Select, Space, Spin, Typography } from "antd";
import { useForm } from "react-hook-form";
import { apiFetchAgentBySlug, apiFetchAgents } from "../api/source.api";
import { nameToRandomAvatar } from "../utils";
const { Text } = Typography;

const boxShadow =
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";

const SettingPage = () => {
  const { isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => apiFetchAgentBySlug("s"),
  });

  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => apiFetchAgents(),
  });

  const { watch, setValue } = useForm<{
    isEditAgentSystem: boolean;
    isEditAgentTelegram: boolean;
    isEditAgentPostTweet: boolean;
    isEditAgentReplyTweet: boolean;
  }>({
    defaultValues: {
      isEditAgentSystem: false,
      isEditAgentTelegram: false,
      isEditAgentPostTweet: false,
      isEditAgentReplyTweet: false,
    },
  });

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }} size={20}>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          background: "#fff",
          padding: 24,
          borderRadius: 16,
        }}
      >
        <Typography.Title level={4}>System Setting</Typography.Title>
        <div>
          <Text strong>Agent System:</Text>
          <Flex gap={12}>
            <Select
              loading={isLoadingAgents}
              disabled={!watch("isEditAgentSystem")}
              style={{ width: "100%" }}
              options={(agents || []).map((agent) => ({
                value: agent.slug,
                label: (
                  <Flex align="center">
                    <Avatar size={24} src={nameToRandomAvatar(agent.slug)} />
                    <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                  </Flex>
                ),
              }))}
            />
            {watch("isEditAgentSystem") ? (
              <Button variant="filled" color="primary">
                Save
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => setValue("isEditAgentSystem", true)}
              >
                Edit
              </Button>
            )}
          </Flex>
        </div>
      </Space>

      <Space
        direction="vertical"
        style={{
          width: "100%",
          background: "#fff",
          padding: 24,
          borderRadius: 16,
        }}
      >
        <Flex align="center" justify="space-between">
          <Typography.Title level={4}>Telegram Setting</Typography.Title>
          <Button
            type="primary"
            onClick={() => window.open("https://t.me/arc_intern_dev_bot")}
          >
            Join Bot Telegram
          </Button>
        </Flex>
        <div>
          <Text strong>Agent Telegram:</Text>
          <Flex gap={12}>
            <Select
              loading={isLoadingAgents}
              disabled={!watch("isEditAgentTelegram")}
              style={{ width: "100%" }}
              options={(agents || []).map((agent) => ({
                value: agent.slug,
                label: (
                  <Flex align="center">
                    <Avatar size={24} src={nameToRandomAvatar(agent.slug)} />
                    <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                  </Flex>
                ),
              }))}
            />
            {watch("isEditAgentTelegram") ? (
              <Button variant="filled" color="primary">
                Save
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => setValue("isEditAgentTelegram", true)}
              >
                Edit
              </Button>
            )}
          </Flex>
        </div>
      </Space>

      <Space
        direction="vertical"
        style={{
          width: "100%",
          background: "#fff",
          padding: 24,
          borderRadius: 16,
        }}
      >
        <Flex align="center" justify="space-between">
          <Typography.Title level={4}>Twitter Setting</Typography.Title>
          <Button type="primary">Post Tweet by Agent</Button>
        </Flex>
        <div style={{ flex: 1 }}>
          <Text strong>Twitter Profile:</Text>

          <Flex
            gap={24}
            align="center"
            // justify="space-between"
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            <Flex
              gap={10}
              align="center"
              style={{
                boxShadow: boxShadow,
                padding: "12px 24px",
                borderRadius: 12,
              }}
            >
              <Avatar size={48} src={nameToRandomAvatar("")} />
              <Space direction="vertical" size={2}>
                <Text strong>DemoTest</Text>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>
                  @demotest
                </Text>
              </Space>
            </Flex>

            <Button type="primary">Connect Twitter</Button>
          </Flex>
        </div>

        <div>
          <Text strong>Agent Post Tweets:</Text>
          <Flex gap={12}>
            <Select
              loading={isLoadingAgents}
              mode="multiple"
              allowClear
              disabled={!watch("isEditAgentPostTweet")}
              style={{ width: "100%" }}
              options={(agents || []).map((agent) => ({
                value: agent.slug,
                label: (
                  <Flex align="center">
                    <Avatar size={24} src={nameToRandomAvatar(agent.slug)} />
                    <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                  </Flex>
                ),
              }))}
            />
            {watch("isEditAgentPostTweet") ? (
              <Button variant="filled" color="primary">
                Save
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => setValue("isEditAgentPostTweet", true)}
              >
                Edit
              </Button>
            )}
          </Flex>
        </div>
        <div>
          <Text strong>Agent Reply Tweets:</Text>
          <Flex gap={12}>
            <Select
              loading={isLoadingAgents}
              mode="multiple"
              allowClear
              disabled={!watch("isEditAgentReplyTweet")}
              style={{ width: "100%" }}
              options={(agents || []).map((agent) => ({
                value: agent.slug,
                label: (
                  <Flex align="center">
                    <Avatar size={24} src={nameToRandomAvatar(agent.slug)} />
                    <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                  </Flex>
                ),
              }))}
            />
            {watch("isEditAgentReplyTweet") ? (
              <Button variant="filled" color="primary">
                Save
              </Button>
            ) : (
              <Button
                variant="text"
                color="primary"
                onClick={() => setValue("isEditAgentReplyTweet", true)}
              >
                Edit
              </Button>
            )}
          </Flex>
        </div>
      </Space>
    </Space>
  );
};

export default SettingPage;
