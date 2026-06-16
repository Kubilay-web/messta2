"use client";
import { Button, Dropdown } from "antd";
import { User } from "@prisma/client";

export default function HeaderClient({ user }: { user: User }) {
  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Properties", path: "/user/properties" },
  ];

  return (
    <Dropdown
      menu={{
        items: menuItems.map(item => ({
          key: item.path,
          label: item.label,
          onClick: () => (window.location.href = item.path),
        })),
      }}
    >
      <Button type="link">{user.username}</Button>
    </Dropdown>
  );
}
