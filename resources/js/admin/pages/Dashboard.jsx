import { Link } from "react-router-dom";
import { UsersIcon ,ClipboardListIcon,ServerIcon ,ArrowDownIcon,TagIcon } from '@heroicons/react/solid';

const DashboardPage = ()=>{
    return(
        <div className="mt-6 w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <DashboardStatusCard title="کاربران" Icon={UsersIcon} link="/users" changes={"10"}  />
                <DashboardStatusCard title="پست ها" Icon={ClipboardListIcon} link="/posts" changes={"6"} />
                <DashboardStatusCard title="دسته بندی ها" Icon={ServerIcon} link="/categories" changes={"6"} />
                <DashboardStatusCard title="تگ ها" Icon={TagIcon} link="/tags" changes={"10"} />
            </div>
        </div>
    )
}

export const DashboardStatusCard = ({title,Icon,link,changes})=>{
    return(
        <div className="col-span-1">
            <Link to={link} className="">
                <div className="w-full p-3 bg-white border rounded-2xl hover:shadow-md transition-all ease-in-out delay-150">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between items-center">
                            <Icon className={`h-8 text-blue-500`} />
                            <span className={`rounded-full badge bg-blue-500 text-xs flex p-1 px-2 gap-1`}>
                                <span className="text-white">{changes}%</span>
                                <ArrowDownIcon className="w-3 text-slate-50" />
                            </span>
                        </div>
                        <div className="mt-8">
                            <h1 className="h5 num-4"></h1>
                            <p className="text-base text-slate-800">{title}</p>
                        </div>
                    </div>
                </div>
                {/*<div className="footer bg-white p-1 mx-4 border border-t-0 rounded rounded-t-none"></div>*/}
            </Link>
        </div>
    )
}
export default DashboardPage;
