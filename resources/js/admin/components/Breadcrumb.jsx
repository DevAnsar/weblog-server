
import {Link} from "react-router-dom"
const Breadcrumb = ()=>{

    return(
        <div className="flex text-base gap-x-3">
            <Link to="/admin">
                داشبورد
            </Link>
            <span>/</span>
            <Link to="/admin/posts">
                پست ها
            </Link>
        </div>
    )
}

export default Breadcrumb;
