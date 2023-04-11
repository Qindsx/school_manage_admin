//路由配置文件
import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../views/Login.vue";
import Manager from "../views/Manager.vue"
import AddAdminInfo from "../views/adminInfo/AddAdminInfo.vue";
import adminInfoList from "../views/adminInfo/AdminInfoList.vue";

import StudentInfoList from "@/views/student/StudentInfoList";
import TeacherInfoList from "@/views/teacher/TeacherInfoList";
import StaffInfoList from "../views/staff/StaffInfoList";
import RoleInfoList from "../views/role/RoleInfoList"
import AreaInfoList from "../views/areainfo/AreaInfoList"
import ApplyInfoList from "@/views/applyinfo/ApplyInfoList";
import AnnunciateInfoList from "@/views/annunciate/AnnunciateInfoList";
import DisinfectInfoList from "@/views/disinfect/DisinfectInfoList";
import table from "@/views/slides/table";
import HealthCodeInfoList from "@/views/healthcode/HealthCodeInfoList"
import HealthCodeErrorInfoList from "@/views/healthcode/HealthCodeErrorInfoList"
import TravelCodeInfoList from "@/views/travelcode/TravelCodeInfoList"
import TravelCodeErrorInfoList from "@/views/travelcode/TravelCodeErrorInfoList"
import NucleicAcidTestErrorInfoList from "@/views/nucleicacid/NucleicAcidTestErrorInfoList"
import NucleicAcidTestInfoList from "@/views/nucleicacid/NucleicAcidTestInfoList"
//创建路由管理对象
const router = createRouter({
        //路由配置
        history: createWebHashHistory(),
        //配置页面
        routes: [
            {
                path: "/",
                redirect: {
                    name: "Login"
                }
            },
            {
                path: "/Login",
                component: Login,
                name: "Login"
            },
            {
                path: "/Manager",
                component: Manager,
                name: "Manager",
                children: [{
                    //二级路径的前面没有斜杠
                    path: "/Manager/AdminInfoList/AddAdminInfo",
                    component: () => import('../views/adminInfo/AddAdminInfo'),
                    name: "AddAdminInfo"
                }, {
                    path: "AdminInfoList",
                    component: adminInfoList,
                    name: "AdminInfoList",
                },{
                    path: "StudentInfoList",
                    component: StudentInfoList,
                    name: "StudentInfoList"
                }, {
                    path: "/Manager/StudentInfoList/AddStudent",
                    name: "AddStudent",
                    component: () => import('../views/student/AddStudent')
                }
                    , {
                        path: "TeacherInfoList",
                        component: TeacherInfoList,
                        name: "TeacherInfoList"
                    },
                    {
                        path: "/Manager/TeacherInfoList/AddTeacher",
                        name: "AddTeacher",
                        component: () => import('../views/teacher/AddTeacher')
                    }, {
                        path: "StaffInfoList",
                        component: StaffInfoList,
                        name: "StaffInfoList"
                    },
                    {
                        path: "/Manager/StaffInfoList/AddStaff",
                        name: "AddStaff",
                        component: () => import('../views/staff/AddStaff')
                    },
                    {
                        path: "RoleInfoList",
                        component: RoleInfoList,
                        name: "RoleInfoList"
                    },
                    {
                        path: "/Manager/RoleInfoList/AddRole",
                        name: "AddRole",
                        component: () => import('../views/role/AddRole')
                    },

                    {
                        path: "AreaInfoList",
                        component: AreaInfoList,
                        name: "AreaInfoList"
                    },
                    {
                        path: "/Manager/AreaInfoList/AddArea",
                        name: "AddArea",
                        component: () => import('../views/areainfo/AddArea')
                    },
                    {
                        path: "ApplyInfoList",
                        component: ApplyInfoList,
                        name: "ApplyInfoList"
                    }, {
                        path: "AnnunciateInfoList",
                        component: AnnunciateInfoList,
                        name: "AnnunciateInfoList"
                    },
                    {
                        path: "/Manager/AnnunciateInfoList/AddAnnunciate",
                        name: "AddAnnunciate",
                        component: () => import('../views/annunciate/AddAnnunciate')
                    },
                    {
                        path: "DisinfectInfoList",
                        component: DisinfectInfoList,
                        name: "DisinfectInfoList"
                    },
                    {
                        path: "/Manager/DisinfectInfoList/AddDisinfect",
                        name: "AddDisinfect",
                        component: () => import('../views/disinfect/AddDisinfect')
                    },
                    {
                        path: "HealthCodeInfoList",
                        component: HealthCodeInfoList,
                        name: "HealthCodeInfoList",
                    },
                    {
                        path: "HealthCodeErrorInfoList",
                        component: HealthCodeErrorInfoList,
                        name: "HealthCodeErrorInfoList"
                    },
                    {
                        path:"TravelCodeInfoList",
                        component:TravelCodeInfoList,
                        name:"TravelCodeInfoList"
                    },
                    {
                        path:"TravelCodeErrorInfoList",
                        component:TravelCodeErrorInfoList,
                        name:"TravelCodeErrorInfoList"
                    },
                    {
                        path:"NucleicAcidTestInfoList",
                        component:NucleicAcidTestInfoList,
                        name:"NucleicAcidTestInfoList"
                    },
                    {
                        path:"NucleicAcidTestErrorInfoList",
                        component:NucleicAcidTestErrorInfoList,
                        name:"NucleicAcidTestErrorInfoList"
                    },
                    {
                        path: "table",
                        component: table,
                        name: "table"
                    }

                ],
            },
        ]
    })
;

export default router;