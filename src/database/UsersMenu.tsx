import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

export const UsersMenu = [
  {
    name: "Quản lý xe",
    icon: <DashboardIcon />,
    path: "/users/Vehicles",
  },
  {
    name: "Quản lý tuyến xe",
    icon: <ShoppingCartIcon />,
    path: "/users/TuyenXe",
  },
  {
    name: "Quản lý chuyến xe",
    icon: <PeopleIcon />,
    path: "/users/ChuyenXe",
  },
  {
    name: "Thông tin ra vào",
    icon: <BarChartIcon />,
    path: "/users/EntranceInfor",
  },
  {
    name: "Thông tin cá nhân",
    icon: <LayersIcon />,
    path: "/users/Profile",
  },
];
