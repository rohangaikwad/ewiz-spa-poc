import { Link } from "@solidjs/router";

export default function CompanyLogo () {
    return <Link href="/" class="company-logo">
        <img width="240" src={`${window.cdnURL}/${window.websiteguid}/StaticImages/ewiz-logo.png`} alt="logo" />
    </Link>
}
