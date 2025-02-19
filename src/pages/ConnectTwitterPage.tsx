import { useLocation } from "react-router-dom";

export default function ConnectTwitterPage() {
  const query = new URLSearchParams(useLocation().search);
  const code = query.get("code");

  return <div>ConnectTwitterPage {code}</div>;
}
