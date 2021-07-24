import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";

export const AdminMenu = [
  {
    name: "Quản lý tài khoản",
    icon: <DashboardIcon />,
    path: "/admin/accounts",
  },
  {
    name: "Quản lý tuyến xe",
    icon: <ShoppingCartIcon />,
    path: "/admin/tuyen-xe",
  },
  {
    name: "Quản lý chuyến xe",
    icon: <PeopleIcon />,
    path: "/admin/chuyen-xe",
  },
  {
    name: "Thông tin ô đậu",
    icon: <BarChartIcon />,
    path: "/admin/entrance-infor",
  },
  {
    name: "Thông tin cá nhân",
    icon: <LayersIcon />,
    path: "/admin",
  },
];
