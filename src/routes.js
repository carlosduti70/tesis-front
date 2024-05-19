/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import Map from "views/Map.js";
import Notifications from "views/Notifications.js";
import Rtl from "views/Rtl.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import UserProfile from "views/UserProfile.js";
import Menu from "views/Menu.js";
import RegistroPaciente from "views/RegistroPaciente";
import SingIn from "views/SingIn";
import RegistroUsuario from "views/RegistroUsuario";
import Recordatorios from "views/Recordatorios";
import Alarma from "views/Alarma";
import Interactions from "views/Interacciones";

var routes = [
  {
    path: "/dashboard",
    name: "Menu",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "iniciar secion",
    rtlName: "طباعة",
    icon: "tim-icons icon-key-25",
    component: <SingIn/>,
    layout: "/admin",
  },
  {
    path: "/registropaciente",
    name: "registro de paciente",
    rtlName: "طباعة",
    icon: "tim-icons icon-key-25",
    component: <RegistroPaciente />,
    layout: "/admin",
  },
  {
    path: "/registrousuario",
    name: "Cuidadores",
    rtlName: "طباعة",
    icon: "tim-icons icon-key-25",
    component: <RegistroUsuario />,
    layout: "/admin",
  },
  {
    path: "/recordatorios",
    name: "recordatorios",
    rtlName: "طباعة",
    icon: "tim-icons icon-key-25",
    component: <Recordatorios/>,
    layout: "/admin",
  },
  {
    path: "/alarma",
    name: "alarmas",
    rtlName: "طباعة",
    icon: "tim-icons icon-key-25",
    component: <Alarma/>,
    layout: "/admin",
  },
  {
    path: "/interacciones",
    name: "interacciones",
    rtlName: "طباعة",
    icon: "tim-icons icon-key-25",
    component: <Interactions/>,
    layout: "/admin",
  },

  // ----------------------------------------------------
  
  // {
  //   path: "/menu",
  //   name: "dashboard",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-key-25",
  //   component: <Menu />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: <Map />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: <UserProfile />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: <Rtl />,
  //   layout: "/rtl",
  // },
];
export default routes;
