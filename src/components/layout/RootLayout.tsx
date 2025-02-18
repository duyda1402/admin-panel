import {
  MessageOutlined,
  PieChartOutlined,
  RobotOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import type { MenuProps } from "antd";
import { Empty, Flex, Layout, Menu, Spin, Typography } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { apiCheckHealthy } from "../../api/source.api";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Chat", "", <MessageOutlined />),
  getItem("Agents", "agents", <RobotOutlined />),
  getItem("Tool", "tools", <ToolOutlined />),
  getItem("Knowledge", "knowledge", <PieChartOutlined />),
  getItem("Setting", "settings", <SettingOutlined />),
];

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const firstValue = location?.pathname?.split("/")[1];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["healthy"],
    queryFn: async () => apiCheckHealthy(),
    retry: 1,
  });

  if (isLoading) {
    return (
      <Flex
        style={{ width: "100vw", height: "100vh" }}
        justify="center"
        align="center"
      >
        <Spin />
      </Flex>
    );
  }

  if (!data || isError) {
    return (
      <Flex
        style={{ width: "100vw", height: "100vh" }}
        justify="center"
        align="center"
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <Typography.Text>
              The server is currently unavailable. Please contact the
              administrator and try again later!
            </Typography.Text>
          }
        ></Empty>
      </Flex>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          onSelect={(item) => {
            navigate(`/${item.key}`);
          }}
          theme="dark"
          defaultSelectedKeys={[firstValue]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              marginTop: 20,
              minHeight: 280,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;
