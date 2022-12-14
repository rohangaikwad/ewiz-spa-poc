import CompanyLogo from "./CompanyLogo";
import Search from "./Search";
import Indicator from "./Indicator";
import LoginMyAccount from "./LoginMyAccount";

const Header = () => {
    const openSidebar = () => document.body.classList.toggle("sidebar-open", true);

    return <header>
        <div className="hamburger-icon" onClick={openSidebar}></div>
        <CompanyLogo />
        <Search />
        <div className="indicators">
            <Indicator label="Wishlist" icon="heart" count={0} url={window.location.origin + "/basket/wishlist"} />
            <Indicator label="My Cart" icon="bag" count={0} url={window.location.origin + "/basket/viewbasket"} />
        </div>            
        <div className="customer-login"><LoginMyAccount /></div>
    </header>
}

export default Header;