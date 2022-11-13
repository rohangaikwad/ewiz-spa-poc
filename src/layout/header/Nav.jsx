import { Link } from "@solidjs/router";
import CategoryMenu from "./CategoryMenu";

export default function Nav () {
    return <nav>
        <Link href="/category" id="all-cat">
            <i class="icon-grid"></i>Browse All
        </Link>
        <div class="category-menu desktop">
            <CategoryMenu />
        </div>
        <div class="quick-links">
            {window.EmailAddress != null && <a href={window.location.origin + "/order/customerorderreport"}>My Orders</a>}
            <a href="#">Offers</a>
            <a href="#">Gift Cards</a>
            <a href={window.location.origin + "/contactus"}>Contact Us</a>
        </div>
    </nav>
}