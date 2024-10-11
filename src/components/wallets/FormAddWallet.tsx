import { Button, Flex, Form, Input } from "antd";

type Props = {
  onClose?: () => void;
};

const FormAddWallet = ({ onClose }: Props) => {
  return (
    <Form layout="vertical">
      <Form.Item label="Wallet Name" style={{ width: "100%" }}>
        <Input placeholder=" Name Wallet" />
      </Form.Item>

      <Form.Item label="Chain Id" style={{ width: "100%" }}>
        <Input placeholder="Enter chain" />
      </Form.Item>

      <Form.Item label="Address" style={{ width: "100%" }}>
        <Input placeholder="Enter address" />
      </Form.Item>

      <Flex gap={12} justify="flex-end" style={{ width: "100%" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="primary">Submit</Button>
      </Flex>
    </Form>
  );
};

export default FormAddWallet;
