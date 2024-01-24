/* eslint-disable no-unused-vars */
import React from "react";
import {
  IconCalendarStats,
  IconDeviceAnalytics,
  IconGauge,
  IconSettings,
  IconUser,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";

import {
  ActionIcon,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { BsPencilSquare } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import Analytics from "../pages/Analytics";
// import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

const mockData = [
  { icon: IconGauge, label: "Dashboard", to: "dashboard" },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "Analytics",
    to: "analytics",
  },
  {
    icon: IconCalendarStats,
    label: "Content",
    to: "contents",
  },
  {
    icon: IconUser,
    label: "Followers",
    to: "followers",
  },
  {
    icon: BsPencilSquare,
    label: "Create Post",
    to: "write",
  },
  {
    icon: IconSettings,
    label: "Settings",
  },
];

const NavbarLink = ({ icon: Icon, label, active, onClick }) => {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={clsx(
          "flex items-center gap-2 px-4 py-1.5 rounded-full",
          active ? "bg-black text-white" : ""
        )}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
        {label}
      </UnstyledButton>
    </Tooltip>
  );
};

const Sidebar = ({ close = () => {} }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname?.slice(1);
  // console.log(location.pathname)

  const handleClick = (to) => {
    close();
    navigate(to);
  };

  const links = mockData.map((link, index) => {
    return (
      <NavbarLink
        {...link}
        key={index}
        active={link.to === path}
        onClick={() => handleClick(link.to)}
      />
    );
  });

  return (
    // <nav className="h-full flex flex-col gap-5 border-t border-slate-700 px-6 2xl:px-14">
    <nav className="h-full flex flex-col gap-5 border-slate-700 px-6 2xl:px-14">
      <p className="py-6 text-center font-bold ">MENU</p>
      <div className="">
        <Stack justify="center" gap={10}>
          {links}
        </Stack>

        <ActionIcon
          onClick={() =>
            setColorScheme(colorScheme === "light" ? "dark" : "light")
          }
          variant="default"
          size="xl"
          aria-label="Toggle color scheme"
          className="w-full rounded-full mt-10"
        >
          {colorScheme === "dark" ? (
            <IconSun stroke={0.5} />
          ) : (
            <IconMoon stroke={0.5} />
          )}
        </ActionIcon>
      </div>
    </nav>
  );
};

export default Sidebar;

// r f a c e