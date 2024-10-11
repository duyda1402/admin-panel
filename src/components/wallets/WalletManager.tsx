import { Table, Flex, Button, Drawer, Tag } from "antd";
import { useState } from "react";
import FormAddWallet from "./FormAddWallet";

type Props = {};

function WalletManager({}: Props) {
  const [openCreate, setOpenCreate] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      network: "Polygon",
      chainId: "39",
      address: "0x7814e9d122b1a32ed6C50053779478Ae5ee239A0",
      status: "available",
    },
    {
      key: "2",
      name: "John",
      network: "BSC",
      chainId: "49",
      address: "0x7BAF07b477850172351766E41d714669AFA88E0c",
      status: "unavailable",
    },
    {
      key: "3",
      name: "Joh wen",
      network: "Polygon",
      chainId: "39",
      address: "0x7BAF07b477850172351766E41d714669AFA88E0c",
      status: "busy",
    },
  ];

  const columns = [
    {
      title: "Wallet Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Network",
      dataIndex: "network",
      key: "network",
    },
    {
      title: "ChainId",
      dataIndex: "chainId",
      key: "chainId",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item: string) => (
        <Tag
          color={
            item === "available"
              ? "green"
              : item === "unavailable"
              ? "gray"
              : "yellow"
          }
        >
          {item.toUpperCase()}
        </Tag>
      ),
    },
  ];
  return (
    <div>
      <Drawer
        title="Add Wallet"
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        <FormAddWallet onClose={() => setOpenCreate(false)} />
      </Drawer>
      <Flex style={boxStyle} justify="flex-end">
        <Button type="primary" onClick={() => setOpenCreate(true)}>
          Add Wallet
        </Button>
      </Flex>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default WalletManager;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
