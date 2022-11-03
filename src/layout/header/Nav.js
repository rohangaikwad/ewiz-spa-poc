import { Link } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";

export default function Nav () {
    return <nav>
        <Link to="/category" id="all-cat">
            <i className="icon-grid"></i>Browse All
        </Link>
        <div className="category-menu desktop">
            <CategoryMenu />
        </div>
        <div className="quick-links">
            {window.EmailAddress != null && <a href={window.location.origin + "/order/customerorderreport"}>My Orders</a>}
            <a href="#">Offers</a>
            <a href="#">Gift Cards</a>
            <a href={window.location.origin + "/contactus"}>Contact Us</a>
        </div>
    </nav>
}