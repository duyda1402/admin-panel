import { Table, Flex, Button, Drawer, Tag } from "antd";
import { useState } from "react";
import FormAddWallet from "./FormAddWallet";

type Props = {};

function GhostyCash({}: Props) {
  const [openCreate, setOpenCreate] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Ghosty Test 3",
      network: "Polygon",
      chainId: "39",
      inputCurrency: "USDC",
      outputCurrency: "USDT",
      status: "available",
      destinationType: "pool",
    },
    {
      key: "2",
      name: "Ghosty Test 2",
      network: "BSC",
      chainId: "49",
      inputCurrency: "BNB",
      outputCurrency: "USDT",
      destinationType: "wallet",
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
      title: "Input Currency",
      dataIndex: "inputCurrency",
      key: "inputCurrency",
      render: (item: string) => <Tag color={"blue"}>{item.toUpperCase()}</Tag>,
    },
    {
      title: "Output Currency",
      dataIndex: "outputCurrency",
      key: "outputCurrency",
      render: (item: string) => <Tag color={"green"}>{item.toUpperCase()}</Tag>,
    },
    {
      title: "Destination Type",
      dataIndex: "destinationType",
      key: "destinationType",
      render: (item: string) => (
        <Tag color={item === "wallet" ? "orange" : "yellow"}>
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

export default GhostyCash;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
