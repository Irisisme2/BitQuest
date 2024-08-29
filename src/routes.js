import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineExplore,
  MdOutlineMonetizationOn,
  MdOutlineAccountBalance,
  MdOutlinePeople,
  MdNotifications,
  MdSettings,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import BTCFi from "views/admin/BTCFi";
import Community from "views/admin/Community";
import Quests from "views/admin/Quests";
import profile from "views/admin/profile";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Quests",
    layout: "/admin",
    icon: <Icon as={MdOutlineExplore} width='20px' height='20px' color='inherit' />,
    path: "/Quests",
    component: Quests,
  },
  {
    name: "BTCFi",
    layout: "/admin",
    icon: <Icon as={MdOutlineMonetizationOn} width='20px' height='20px' color='inherit' />,
    path: "/BTCFi",
    component: BTCFi,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Community",
    layout: "/admin",
    icon: <Icon as={MdOutlinePeople} width='20px' height='20px' color='inherit' />,
    path: "/Community",
    component: Community,
  },
  {
    name: "Profile",
    layout: "/admin",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    path: "/profile",
    component: profile,
  },
];

export default routes;
