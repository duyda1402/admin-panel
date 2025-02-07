import { Tabs, TabsProps } from "antd";
import ApiDataManager from "../components/sources/ApiDataManager";

import TweetsManager from "../components/sources/TweetsManager";
import WebsiteManager from "../components/sources/WebsiteManager";

type Props = {};

function SourcePage({}: Props) {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "twitter",
      label: "Twitter Profile",
      children: <TweetsManager />,
    },
    {
      key: "api",
      label: "Data API",
      children: <ApiDataManager />,
    },
    {
      key: "web",
      label: "Web Browser",
      children: <WebsiteManager />,
    },
  ];
  return <Tabs defaultActiveKey="twitter" items={items} onChange={onChange} />;
}

export default SourcePage;
