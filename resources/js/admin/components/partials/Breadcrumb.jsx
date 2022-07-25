import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();

    const prepareLinks = () => {
        let links = [
            {
                text: "Dashboard",
                url: "/",
                icon: "fa fa-dashboard",
            },
        ];
        if (location.pathname != "/") {
            // split pathname using '/'
            let parts = location.pathname.split("/");
            // filter parts to exclude empty and numeric parts
            parts = parts.filter((val) => val != "" && isNaN(val));
            // loop through parts and push in the links array
            for (let i = 0; i < parts.length; i++) {
                if (i == parts.length - 1) {
                    links.push({
                        text: parts[i].replace(/^\w/, (c) => c.toUpperCase()),
                        url: "#",
                    });
                } else {
                    links.push({
                        text: parts[i].replace(/^\w/, (c) => c.toUpperCase()),
                        url: "/" + parts[i],
                    });
                }
            }
        }
        return links;
    };
    return (
        <ol className="flex gap-2 flex-row-reverse">
            {prepareLinks().map((link, index,links) => (
                <BreadcrumbItem
                    key={index}
                    link={link}
                    is_active={index === links.length - 1}
                />
            ))}
        </ol>
    );
};

const BreadcrumbItem = ({ link, is_active }) => {
    return (
        <li className={is_active ? "text-blue-600" : "text-gray-800"}>
            { !is_active && ("< ")}
            <Link to={link.url}>
                {link.icon ? <i className={link.icon}></i> : null}
                {link.text}
            </Link>
            
        </li>
    );
};

export default Breadcrumb;
