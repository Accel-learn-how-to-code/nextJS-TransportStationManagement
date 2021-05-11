import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

export const AdminMenu = [
  {
    name: "Quản lý tài khoản",
    icon: <DashboardIcon />,
  },
  {
    name: "Quản lý tuyến xe",
    icon: <ShoppingCartIcon />,
  },
  {
    name: "Quản lý chuyến xe",
    icon: <PeopleIcon />,
  },
  {
    name: "Thông tin ra vào",
    icon: <BarChartIcon />,
  },
  {
    name: "Thông tin cá nhân",
    icon: <LayersIcon />,
  },
];
