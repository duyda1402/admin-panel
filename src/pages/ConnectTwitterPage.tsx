import { useMutation } from "@tanstack/react-query";
import { Flex, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useLocation } from "react-router-dom";
import { IFSettingConfig, SettingConfigEnum } from "../api";
import { apiUpdateSettingConfig } from "../api/source.api";

interface BodyUpdate extends IFSettingConfig {}

export default function ConnectTwitterPage() {
  const query = new URLSearchParams(useLocation().search);
  const [errMessage, setErrMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const code = query.get("code");

  const { mutateAsync: updateSetting, isPending: isLoadingUpdate } =
    useMutation({
      mutationKey: ["update-setting"],
      mutationFn: async (data: BodyUpdate) =>
        apiUpdateSettingConfig(
          data,
          window.location.origin + "/twitter/connect"
        ),
      onSuccess: () => {
        setLoading(false);
        setTimeout(() => {
          window?.close();
        }, 6000);
      },
      onError: (error: any) => {
        setTimeout(() => {
          window?.close();
        }, 6000);
        setErrMessage(error?.message || "Something went wrong!");
        setLoading(false);
      },
    });

  useEffect(() => {
    if (code) {
      updateSetting({
        value: code,
        key: SettingConfigEnum.TWITTER_TOKEN,
      });
    }
  }, [code]);

  if (loading || isLoadingUpdate) {
    return (
      <Flex
        align="center"
        vertical
        justify="center"
        style={{ height: "100vh", background: "#0f172a" }}
      >
        <Spin />
      </Flex>
    );
  }

  return (
    <Flex
      align="center"
      vertical
      justify="center"
      style={{ height: "100vh", background: "#0f172a" }}
    >
      {errMessage ? (
        <Typography.Title
          level={3}
          style={{ color: "#f43f5e", fontWeight: 800 }}
        >
          CONNECTED ERROR
        </Typography.Title>
      ) : (
        <Typography.Title
          level={3}
          style={{ color: "#16a34a", fontWeight: 800 }}
        >
          CONNECTED SUCCESS
        </Typography.Title>
      )}

      {errMessage ? (
        <Typography.Text style={{ color: "#fff", textAlign: "center" }}>
          {errMessage} <br />
          Window will close after{" "}
          <Countdown
            date={Date.now() + 6000}
            renderer={({ seconds }) => {
              return <span>{seconds} seconds</span>;
            }}
          />
        </Typography.Text>
      ) : (
        <Typography.Text style={{ color: "#fff", textAlign: "center" }}>
          Window will close after{" "}
          <Countdown
            date={Date.now() + 6000}
            renderer={({ seconds }) => {
              return <span>{seconds} seconds</span>;
            }}
          />
        </Typography.Text>
      )}
    </Flex>
  );
}
