import CryptoJS from "crypto-js";

export function nameToRandomAvatar(name: string): string {
  const normalizedName = name.toLowerCase().trim();
  const hash = CryptoJS.SHA256(normalizedName).toString(CryptoJS.enc.Hex);
  const addressPrefix = "0x";
  const address = addressPrefix + hash.slice(0, 40);
  return `https://effigy.im/a/${address}.svg`;
}
