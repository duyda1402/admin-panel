import { Button, Drawer, Flex, Table, Tag } from "antd";
import { useState } from "react";
import FormAddWallet from "./FormAddWallet";

type Props = {};

function StablecoinPayment({}: Props) {
  const [openCreate, setOpenCreate] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Mike Pool",
      network: "Polygon",
      chainId: "39",
      contractToken: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
      currency: "USDC",
    },
    {
      key: "3",
      name: "Joh wen",
      network: "BSC",
      chainId: "49",
      contractToken: "0x55d398326f99059ff775485246999027b3197955",
      currency: "USDT",
    },
  ];

  const columns = [
    {
      title: "Payment Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ChainId",
      dataIndex: "chainId",
      key: "chainId",
    },
    {
      title: "Contract Token",
      dataIndex: "contractToken",
      key: "contractToken",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      render: (item: string) => (
        <Tag color={item === "USDT" ? "green" : "blue"}>
          {item.toUpperCase()}
        </Tag>
      ),
    },
  ];
  return (
    <div>
      <Drawer
        title="New Pool"
        onClose={() => setOpenCreate(false)}
        open={openCreate}
      >
        <FormAddWallet onClose={() => setOpenCreate(false)} />
      </Drawer>
      <Flex style={boxStyle} justify="flex-end">
        <Button type="primary" onClick={() => setOpenCreate(true)}>
          New Pool
        </Button>
      </Flex>

      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}

export default StablecoinPayment;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
