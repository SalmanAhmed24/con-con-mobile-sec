"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import "./sidebar.scss";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BuildIcon from "@mui/icons-material/Build";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import UpdateDisabledIcon from "@mui/icons-material/UpdateDisabled";
import LockIcon from "@mui/icons-material/Lock";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MinorCrashIcon from "@mui/icons-material/MinorCrash";
import SchoolIcon from "@mui/icons-material/School";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { usePathname } from "next/navigation";
import useStore from "@/utils/store/store";

export function AppSidebar() {
  const pathname = usePathname();
  const sidebarFlag = useStore((state) => state.sidebarFlag);
  const setSidebarFlag = useStore((state) => state.setSideBarFlag);
  console.log(pathname);
  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: function () {
        return <DashboardIcon />;
      },
    },
    {
      title: "Tools",
      url: "/toolReturn",
      icon: function () {
        return <BuildIcon />;
      },
    },
    {
      title: "Time Track",
      url: "/timeTrack",
      icon: function () {
        return <AccessTimeIcon />;
      },
    },
    {
      title: "Labor",
      url: "/labor",
      icon: function () {
        return <PeopleAltIcon />;
      },
    },
    {
      title: "Service Ticket",
      url: "/serviceTicket",
      icon: function () {
        return <ConfirmationNumberIcon />;
      },
    },
    {
      title: "Job Ticket",
      url: "/jobTicket",
      icon: function () {
        return <ConfirmationNumberIcon />;
      },
    },
    {
      title: "Request Time Off",
      url: "/timeOff",
      icon: function () {
        return <UpdateDisabledIcon />;
      },
    },
    {
      title: "Lockout/Tagout",
      url: "/tagout",
      icon: function () {
        return <LockIcon />;
      },
    },
    {
      title: "Vehicle Inspection",
      url: "/vehicleInspection",
      icon: function () {
        return <DirectionsCarIcon />;
      },
    },
    {
      title: "Accident Reports",
      url: "/reports",
      icon: function () {
        return <MinorCrashIcon />;
      },
    },
    {
      title: "Training",
      url: "/training",
      icon: function () {
        return <SchoolIcon />;
      },
    },
    {
      title: "Overstock",
      url: "/overstock",
      icon: function () {
        return <Inventory2Icon />;
      },
    },
    {
      title: "Write Up",
      url: "/writeUp",
      icon: function () {
        return <ArticleIcon />;
      },
    },
    {
      title: "Client",
      url: "/client",
      icon: function () {
        return <PeopleAltIcon />;
      },
    },
  ];
  return (
    <Sidebar
      className={`${
        sidebarFlag ? "cus-sidebar-close-style" : "cus-sidebar-style"
      }`}
    >
      {sidebarFlag ? (
        <div className="p-2 flex flex-row justify-end">
          <ArrowForwardIosIcon
            className="w-100 text-white text-center hover:cursor-pointer hover:text-orange-400"
            onClick={() => setSidebarFlag(false)}
          />
        </div>
      ) : (
        <div className="pl-2 pb-2 pt-5 pr-1 flex flex-row justify-end">
          <ArrowBackIosIcon
            className="w-100 text-white text-center hover:cursor-pointer hover:text-orange-400"
            onClick={() => setSidebarFlag(true)}
          />
        </div>
      )}

      <SidebarContent>
        <div className="pl-10 pr-10 pt-5">
          <Image
            src={"/logo.png"}
            width={100}
            height={50}
            alt="JS Electric Application"
          />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      className={
                        pathname == `${item.url}`
                          ? "sidebar-cus-link active-side-link pb-7 pt-7"
                          : "sidebar-cus-link pb-7 pt-7"
                      }
                      href={item.url}
                    >
                      {/* <Image
                        src={item.icon}
                        width={27}
                        height={22}
                        alt="icon"
                      /> */}
                      <span>{item.icon()}</span>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
