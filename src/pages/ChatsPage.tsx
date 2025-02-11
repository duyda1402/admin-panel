import { Button, Flex, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import * as ld from "lodash";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SendOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { apiChatAgent } from "../api/source.api";

const boxShadow =
  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)";
const ChatsPage = () => {
  const [messages, setMessages] = useState([
    { role: "agent", content: "Hi! May I help you?" },
  ]);

  const { handleSubmit, reset, control } = useForm<{ say: string }>({
    defaultValues: {
      say: "",
    },
  });

  const { mutateAsync: sendMessageToAgent, isPending: isLoading } = useMutation(
    {
      mutationKey: ["qa-agent"],
      mutationFn: async (data: { say: string }) => apiChatAgent(data),
      onSuccess: (data: any) => {
        const arrMessages = ld.cloneDeep(messages);
        setMessages(
          arrMessages.concat({ role: "agent", content: data?.kwargs?.content })
        );
      },
      onError: (error: any) => {
        toast.error(error?.message);
      },
    }
  );

  const onUserSay = async (data: { say: string }) => {
    try {
      if (!data.say.trim()) {
        toast.error("Please enter a message!");
      }
      const arrMessages = ld.cloneDeep(messages);
      setMessages(arrMessages.concat({ role: "user", content: data.say }));
      reset({ say: "" });
      await sendMessageToAgent({ say: data.say });
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Flex
      vertical
      style={{
        height: 800,
      }}
      justify="space-between"
    >
      {/* Message */}
      <div>
        {messages.map((message, index) => (
          <Flex
            key={index}
            justify={message.role === "agent" ? "flex-start" : "flex-end"}
          >
            <p
              style={{
                borderRadius: 12,
                background: message.role === "agent" ? "#f5ebe0" : "#cdb4db",
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 8,
                paddingTop: 8,
              }}
            >
              {message.content}
            </p>
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
        style={{ boxShadow: boxShadow, borderRadius: 12, position: "relative" }}
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
  );
};

export default ChatsPage;
