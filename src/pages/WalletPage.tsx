import { Tabs, TabsProps } from "antd";
import WalletManager from "../components/wallets/WalletManager";
import PoolWalletManager from "../components/wallets/PoolManager";
import StablecoinPayment from "../components/wallets/StablecoinPayment";
import GhostyCash from "../components/wallets/GhostyCash";

type Props = {};

function WalletPage({}: Props) {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "wallet",
      label: "Wallets",
      children: <WalletManager />,
    },
    {
      key: "pool-wallet",
      label: "Pool Wallet",
      children: <PoolWalletManager />,
    },
    {
      key: "ghosty-cash-pair",
      label: "Ghosty Cash Pair",
      children: <GhostyCash />,
    },
    {
      key: "stablecoin-payment",
      label: "Stablecoin Payment",
      children: <StablecoinPayment />,
    },
  ];
  return <Tabs defaultActiveKey="wallet" items={items} onChange={onChange} />;
}

export default WalletPage;
