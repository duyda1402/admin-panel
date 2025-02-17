import { Avatar, Button, Flex, Select, Spin, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import * as ld from "lodash";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SendOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiChatAgent, apiFetchAgents } from "../api/source.api";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { v4 as uuidv4 } from "uuid";
import { nameToRandomAvatar } from "../utils";
import { IFAgent } from "../api";
const { Text } = Typography;

const boxShadow =
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
const ChatsPage = () => {
  const [messages, setMessages] = useState<Array<any>>([]);

  const [threadId, setThreadId] = useState(() => uuidv4());
  const [agentSelected, setAgentSelected] = useState<
    IFAgent | null | undefined
  >(null);

  const { handleSubmit, reset, control } = useForm<{ say: string }>({
    defaultValues: {
      say: "",
    },
  });

  const { data: agents, isLoading: isAgentsLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: async () => apiFetchAgents(),
  });

  useEffect(() => {
    if (agents?.[0]) {
      setAgentSelected(agents[0]);
    }
  }, [agents, isAgentsLoading]);

  useEffect(() => {
    if (agentSelected) {
      setMessages([{ role: "agent", content: "Hi! May I help you?" }]);
    }
  }, [agentSelected]);

  const { mutateAsync: sendMessageToAgent, isPending: isLoading } = useMutation(
    {
      mutationKey: ["qa-agent"],
      mutationFn: async (data: {
        agentSlug: string;
        say: string;
        threadId?: string;
      }) => apiChatAgent(data),
      onSuccess: (data: any) => {
        const arrMessages = ld.cloneDeep(messages);
        setMessages(() => arrMessages.concat({ role: "agent", content: data }));
        setTimeout(() => handlerScroll(), 500);
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    }
  );

  const onUserSay = async (data: { say: string }) => {
    try {
      if (!agentSelected) {
        toast.warn("Please select an agent!");
        return;
      }
      if (!data.say.trim()) {
        toast.error("Please enter a message!");
      }
      const arrMessages = ld.cloneDeep(messages);
      setMessages(() =>
        arrMessages.concat({ role: "user", content: data.say })
      );
      reset({ say: "" });
      setTimeout(() => handlerScroll(), 500);
      await sendMessageToAgent({
        agentSlug: agentSelected?.slug,
        say: data.say,
        threadId: threadId,
      });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handlerNewThread = () => {
    setMessages(() => [{ role: "agent", content: "Hi! May I help you?" }]);
    setThreadId(() => uuidv4());
  };

  const handlerScroll = () => {
    const messagesDiv = document.getElementById("messages");
    if (!messagesDiv) return;
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  };

  return (
    <>
      <Flex style={boxStyle} justify="flex-end" align="center">
        <Text strong>Agent: </Text>
        <Select
          loading={isAgentsLoading}
          style={{ minWidth: 150 }}
          value={agentSelected?.slug}
          onChange={(value) => {
            console.log(value);
            setAgentSelected(agents?.find((a) => a.slug === value));
          }}
          defaultValue={agentSelected?.slug}
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
        <Button type="primary" onClick={handlerNewThread}>
          New Conversation
        </Button>
      </Flex>

      {isAgentsLoading ? (
        <Spin />
      ) : (
        <>
          {agentSelected && (
            <Flex
              vertical
              style={{
                height: 700,
                position: "relative",
              }}
              justify="space-between"
            >
              <div
                id="messages"
                style={{
                  paddingTop: 12,
                  maxHeight: 650,
                  overflow: "auto",
                  paddingBottom: 12,
                }}
              >
                {messages.map((message, index) => (
                  <Flex
                    style={{ marginTop: 8, marginBottom: 8 }}
                    key={index}
                    justify={
                      message.role === "agent" ? "flex-start" : "flex-end"
                    }
                    align="flex-start"
                    gap={10}
                  >
                    {message.role === "agent" && (
                      <Avatar
                        size={32}
                        src={nameToRandomAvatar(agentSelected.slug)}
                      />
                    )}
                    <Text
                      style={{
                        borderRadius: 12,
                        background:
                          message.role === "agent" ? "#f5ebe0" : "#cdb4db",
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: 8,
                        paddingTop: 8,
                        maxWidth: "70%",
                      }}
                    >
                      <MarkdownPreview
                        source={message.content}
                        style={{
                          background: "transparent",
                          color: "#343a40",
                          fontSize: 14,
                        }}
                      />
                    </Text>
                  </Flex>
                ))}
                {isLoading && (
                  <div style={{ padding: 8 }}>
                    <Spin />
                  </div>
                )}
              </div>
              {/* Chat Input */}
              <div
                style={{
                  boxShadow: boxShadow,
                  borderRadius: 12,
                  position: "relative",
                }}
              >
                <Controller
                  control={control}
                  name="say"
                  render={({ field: { value, onBlur, onChange } }) => (
                    <TextArea
                      readOnly={isLoading}
                      style={{ borderRadius: 12, padding: 12 }}
                      value={value}
                      onBlur={onBlur}
                      onChange={(e) => onChange(e.target.value)}
                      variant="filled"
                      placeholder="What do you say?"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  )}
                />
                <div style={{ position: "absolute", bottom: 10, right: 12 }}>
                  <Button
                    loading={isLoading}
                    onClick={handleSubmit(onUserSay)}
                    type="primary"
                    shape="circle"
                    icon={<SendOutlined />}
                  />
                </div>
              </div>
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default ChatsPage;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
