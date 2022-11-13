const LoginMyAccount = ({ showText = true }) => {
    let lc = window.EmailAddress == null ? "" : " logged-in";
    return <>
        <i class={"sli icon-user" + lc} />
        {window.EmailAddress == null
            ? <div class={"desc" + lc}>
                <div><a href={window.location.origin + "/Login"}>Sign In</a></div>
                <a href={window.location.origin + "/Customer/Register"}>Register</a>
            </div>
            : <>
                <div class="desc">Welcome<br/><b>{window.FirstName}</b></div>
                <div class="dropdown-account">
                    {window.UserType === "Admin" && <a href={`${window.location.origin}/dashboard`}>Dashboard</a>}
                    <a href={`${window.location.origin}/myaccount`}>My Account</a>
                    <a href={`${window.location.origin}/Basket/Wishlist`}>Wishlist</a>
                    <a href={`${window.location.origin}/logout`}>Logout</a>
                </div>
            </>}
    </>
}

export default LoginMyAccount;