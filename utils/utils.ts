export function stripLocale(pathname: string) {
  const parts = pathname.split("/");
  // /en/contact -> ["", "en", "contact"]
  if (parts[1] && parts[1].length === 2) {
    return "/" + parts.slice(2).join("/");
  }
  return pathname;
}
