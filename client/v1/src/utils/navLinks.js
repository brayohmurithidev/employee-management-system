import {
  DashboardTwoTone,
  DoneAll,
  ListAltOutlined,
  NoteAdd,
} from "@mui/icons-material";
import React from "react";

export const NavLinks = [
  {
    name: "Dashboard",
    permission: "viewDashboard",
    path: "/dashboard",
    icon: <DashboardTwoTone />,
  },
  {
    name: "Leave Management",
    permission: "leaveManagement",
    sub_menus: [
      {
        name: "Self Leave",
        permission: "viewLeave",
        path: "/me/leaves",
        icon: <ListAltOutlined />,
      },
      {
        name: "Department Leaves",
        permission: "viewDepartmentLeave",
        path: "/view-leave",
        icon: <ListAltOutlined />,
      },
    ],
  },
  {
    name: "Performance Management",
    permission: "performanceManagement",
    sub_menus: [
      {
        name: "Self Review",
        path: "/me/review",
        permission: "selfReview",
        icon: <NoteAdd />,
      },
      {
        name: "Staff Review",
        permission: "staffReview",
        path: "/staff-review",
        icon: <DoneAll />,
      },
      {
        name: "View Performances",
        permission: "viewPerformance",
        path: "/view-performances",
        icon: <ListAltOutlined />,
      },
    ],
  },
];
