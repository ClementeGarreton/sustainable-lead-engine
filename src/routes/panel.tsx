import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/panel")({
  head: () => ({ meta: [{ title: "Panel del vendedor — Mi Auto Sustentable" }, { name: "robots", content: "noindex" }]}),
  component: () => <Outlet />,
});
