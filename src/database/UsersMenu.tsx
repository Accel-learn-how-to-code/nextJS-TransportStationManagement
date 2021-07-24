import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

export const UsersMenu = [
  {
    name: "Quản lý xe",
    icon: <DashboardIcon />,
    path: "/users/vehicles",
  },
  {
    name: "Quản lý tuyến xe",
    icon: <ShoppingCartIcon />,
    path: "/users/tuyen-xe",
  },
  {
    name: "Quản lý chuyến xe",
    icon: <PeopleIcon />,
    path: "/users/chuyen-xe",
  },
  {
    name: "Thông tin ra vào",
    icon: <BarChartIcon />,
    path: "/users/entrance-infor",
  },
  {
    name: "Thông tin cá nhân",
    icon: <LayersIcon />,
    path: "/users",
  },
];
