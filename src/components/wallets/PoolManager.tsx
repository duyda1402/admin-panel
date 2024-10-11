import { Button, Drawer, Flex, Table } from "antd";
import { useState } from "react";
import FormAddWallet from "./FormAddWallet";

type Props = {};

function PoolWalletManager({}: Props) {
  const [openCreate, setOpenCreate] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Test Pool",
      network: "Polygon",
      chainId: "39",
    },
    {
      key: "3",
      name: "Pool wen",
      network: "Polygon",
      chainId: "39",
    },
  ];

  const columns = [
    {
      title: "Pool Name",
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

export default PoolWalletManager;

const boxStyle: React.CSSProperties = {
  width: "100%",
  gap: 12,
  marginBottom: 12,
};
