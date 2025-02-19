import { useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Button, Flex, Select, Space, Spin, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import {
  apiFetchAgents,
  apiFetchSettingConfig,
  apiGetLinkConnectTwitter,
  apiUpdateSettingConfig,
} from "../api/source.api";
import { nameToRandomAvatar } from "../utils";
import { IFSettingConfig, SettingConfigEnum } from "../api";
import { toast } from "react-toastify";
import { useEffect } from "react";
const { Text } = Typography;

const boxShadow =
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";

const SettingPage = () => {
  const {
    data: settings,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => apiFetchSettingConfig(),
  });

  const { data: agents, isLoading: isLoadingAgents } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => apiFetchAgents(),
  });

  const { watch, setValue, control } = useForm<{
    isEditAgentSystem: boolean;
    isEditAgentTelegram: boolean;
    isEditAgentPostTweet: boolean;
    isEditAgentReplyTweet: boolean;
    agentSystem: string;
    agentTelegram: string;
    agentPostTweet: string[];
    agentReplyTweet: string[];
  }>({
    defaultValues: {
      isEditAgentSystem: false,
      isEditAgentTelegram: false,
      isEditAgentPostTweet: false,
      isEditAgentReplyTweet: false,
    },
  });

  const { mutateAsync: updateSetting, isPending: isLoadingUpdate } =
    useMutation({
      mutationKey: ["update-setting"],
      mutationFn: async (data: IFSettingConfig) => apiUpdateSettingConfig(data),
      onSuccess: () => {
        refetch();
        toast.success("Setting updated successfully!");
        setValue("isEditAgentSystem", false);
        setValue("isEditAgentTelegram", false);
        setValue("isEditAgentPostTweet", false);
        setValue("isEditAgentReplyTweet", false);
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong!");
      },
    });

  const {
    mutateAsync: getLinkConnectTwitter,
    isPending: isLoadingGetLinkTwitter,
  } = useMutation({
    mutationKey: ["update-setting"],
    mutationFn: async (data: { redirectUrl: string }) =>
      apiGetLinkConnectTwitter(data),
    onSuccess: (url) => {
      window.open(
        url,
        "_blank",
        "width=450,height=700,resizable=yes,scrollbars=yes"
      );
    },
    onError: (error: any) => {
      toast.error(error?.message || "Something went wrong!");
    },
  });

  useEffect(() => {
    if (!isLoading && !!settings) {
      const object = settings.reduce(
        (acc: any, { key, value }: IFSettingConfig) => {
          acc[key] = value;
          return acc;
        },
        {}
      );
      setValue("agentSystem", object[SettingConfigEnum.SYSTEM_AGENT] || "");
      setValue("agentTelegram", object[SettingConfigEnum.TELEGRAM_AGENT] || "");
      setValue(
        "agentPostTweet",
        object[SettingConfigEnum.TWITTER_POST_AGENT]
          ? object[SettingConfigEnum.TWITTER_POST_AGENT].split(",")
          : []
      );
      setValue(
        "agentReplyTweet",
        object[SettingConfigEnum.TWITTER_REPLY_AGENT]
          ? object[SettingConfigEnum.TWITTER_REPLY_AGENT].split(",")
          : []
      );
    }
  }, [settings, isLoading]);

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
            <Controller
              name="agentSystem"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  loading={isLoadingAgents}
                  disabled={!watch("isEditAgentSystem")}
                  style={{ width: "100%" }}
                  value={value}
                  onBlur={onBlur}
                  onChange={(value) => onChange(value)}
                  options={(agents || []).map((agent) => ({
                    value: agent.slug,
                    label: (
                      <Flex align="center">
                        <Avatar
                          size={24}
                          src={nameToRandomAvatar(agent.slug)}
                        />
                        <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                      </Flex>
                    ),
                  }))}
                />
              )}
            />

            {watch("isEditAgentSystem") ? (
              <Button
                loading={isLoadingUpdate}
                variant="filled"
                color="primary"
                onClick={() =>
                  updateSetting({
                    value: watch("agentSystem"),
                    key: SettingConfigEnum.SYSTEM_AGENT,
                  })
                }
              >
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
            <Controller
              name="agentTelegram"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  loading={isLoadingAgents}
                  disabled={!watch("isEditAgentTelegram")}
                  style={{ width: "100%" }}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  options={(agents || []).map((agent) => ({
                    value: agent.slug,
                    label: (
                      <Flex align="center">
                        <Avatar
                          size={24}
                          src={nameToRandomAvatar(agent.slug)}
                        />
                        <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                      </Flex>
                    ),
                  }))}
                />
              )}
            />
            {watch("isEditAgentTelegram") ? (
              <Button
                variant="filled"
                color="primary"
                loading={isLoadingUpdate}
                onClick={() =>
                  updateSetting({
                    value: watch("agentTelegram"),
                    key: SettingConfigEnum.TELEGRAM_AGENT,
                  })
                }
              >
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

            <Button
              type="primary"
              loading={isLoadingGetLinkTwitter}
              onClick={() =>
                getLinkConnectTwitter({
                  redirectUrl: window.location.origin + "/twitter/connect",
                })
              }
            >
              Connect Twitter
            </Button>
          </Flex>
        </div>

        <div>
          <Text strong>Agent Post Tweets:</Text>
          <Flex gap={12}>
            <Controller
              name="agentPostTweet"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Select
                  loading={isLoadingAgents}
                  mode="multiple"
                  allowClear
                  disabled={!watch("isEditAgentPostTweet")}
                  style={{ width: "100%" }}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  options={(agents || []).map((agent) => ({
                    value: agent.slug,
                    label: (
                      <Flex align="center">
                        <Avatar
                          size={24}
                          src={nameToRandomAvatar(agent.slug)}
                        />
                        <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                      </Flex>
                    ),
                  }))}
                />
              )}
            />
            {watch("isEditAgentPostTweet") ? (
              <Button
                variant="filled"
                color="primary"
                loading={isLoadingUpdate}
                onClick={() =>
                  updateSetting({
                    value: watch("agentPostTweet").join(),
                    key: SettingConfigEnum.TWITTER_POST_AGENT,
                  })
                }
              >
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
            <Controller
              name="agentReplyTweet"
              control={control}
              render={({ field }) => (
                <Select
                  loading={isLoadingAgents}
                  mode="multiple"
                  allowClear
                  {...field}
                  disabled={!watch("isEditAgentReplyTweet")}
                  style={{ width: "100%" }}
                  options={(agents || []).map((agent) => ({
                    value: agent.slug,
                    label: (
                      <Flex align="center">
                        <Avatar
                          size={24}
                          src={nameToRandomAvatar(agent.slug)}
                        />
                        <Text style={{ marginLeft: 8 }}>{agent.name}</Text>
                      </Flex>
                    ),
                  }))}
                />
              )}
            />
            {watch("isEditAgentReplyTweet") ? (
              <Button
                variant="filled"
                color="primary"
                loading={isLoadingUpdate}
                onClick={() =>
                  updateSetting({
                    value: watch("agentReplyTweet").join(),
                    key: SettingConfigEnum.TWITTER_REPLY_AGENT,
                  })
                }
              >
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
