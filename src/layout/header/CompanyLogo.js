import { Link } from "react-router-dom";

export default function CompanyLogo () {
    return <Link to="/" className="company-logo">
        <img width="240" src={`${window.cdnURL}/${window.websiteguid}/StaticImages/ewiz-logo.png`} alt="logo" />
    </Link>
}
