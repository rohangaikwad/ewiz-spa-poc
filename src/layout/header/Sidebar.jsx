import CategoryMenu from "./CategoryMenu";

export default function Sidebar () {
    
    const closeSidebar = () => document.body.classList.toggle("sidebar-open", false);

    return <div id="sidebar-menu-container">
        <div class="backdrop" onClick={closeSidebar}></div>

        <aside>
            <h2>Welcome{window.EmailAddress == null ? "" : (", " + window.FirstName)}<i onClick={closeSidebar} /></h2>
            <div class="scroll-auto">
                <div class="sidebar-item category-menu mobile">
                    <h3>Shop By Category</h3>
                    <CategoryMenu />
                </div>

                {window.EmailAddress != null && <div class="sidebar-item">
                    <h3>My Account</h3>
                    <ul class="my-account-list">
                        {window.UserType === "Admin" && <a href={`${window.location.origin}/dashboard`}>Dashboard</a>}
                        <a href={`${window.location.origin}/myaccount`}>My Account</a>
                        <a href={`${window.location.origin}/Basket/Wishlist`}>Wishlist</a>
                        <a href={`${window.location.origin}/logout`}>Logout</a>
                    </ul>
                </div>}
            </div>
        </aside>
    </div>
}