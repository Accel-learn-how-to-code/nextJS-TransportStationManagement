import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";

export const AdminMenu = [
  {
    name: "Quản lý tài khoản",
    icon: <DashboardIcon />,
    path: "/admin/Accounts",
  },
  {
    name: "Quản lý tuyến xe",
    icon: <ShoppingCartIcon />,
    path: "/admin/TuyenXe",
  },
  {
    name: "Quản lý chuyến xe",
    icon: <PeopleIcon />,
    path: "/admin/ChuyenXe",
  },
  {
    name: "Thông tin ra vào",
    icon: <BarChartIcon />,
    path: "/admin/EntranceInfor",
  },
  {
    name: "Thông tin cá nhân",
    icon: <LayersIcon />,
    path: "/users/Profile",
  },
];
