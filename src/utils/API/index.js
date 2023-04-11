/**
 * 主要是为了试下API目录下面的模块的高内聚低耦合
 */
import adminInfo from "./adminInfo";
import login from "./login"
import teacherinfo from "./teacherInfo"
import studentinfo from "@/utils/API/studentInfo";
import staffinfo from "@/utils/API/staffInfo"
import annunciateinfo from "@/utils/API/annunciateinfo"
import applyinfo from "@/utils/API/applyinfo"
import areainfo from "@/utils/API/areainfo"
import disinfectinfo from "@/utils/API/disinfectinfo"
import healthcodeinfo from "@/utils/API/healthcodeinfo"
import nucleicacidinfo from "@/utils/API/nucleicacidinfo"
import roleinfo from "@/utils/API/roleinfo"
import travelcodeinfo from "@/utils/API/travelcodeinfo"

export default {
    adminInfo,
    login,
    teacherinfo,
    studentinfo,
    staffinfo,
    annunciateinfo,
    applyinfo,
    areainfo,
    disinfectinfo,
    healthcodeinfo,
    nucleicacidinfo,
    roleinfo,
    travelcodeinfo
}