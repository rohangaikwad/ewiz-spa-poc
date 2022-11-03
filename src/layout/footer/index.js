import Newsletter from "./Newsletter";
import "./footer.scss";
import CategoryMenu from "../header/CategoryMenu";

const Footer = () => {
    return <footer>
        <div className="container">
            <div className="footer_content_top">
                <div className="customized_container footer_section_holder">
                    <div className="footer_section">
                        <div className="footer_section_header section_border">
                            <div className="heading">
                                SHOP
                            </div>
                            <div className="icon"></div>
                        </div>
                        <div className="footer_section_item section_item_hide" id="footerCategoryMenu">
                            <CategoryMenu />
                        </div>
                    </div>
                    <div className="footer_section">
                        <div className="footer_section_header section_border">
                            <div className="heading">
                                INFORMATION
                            </div>
                            <div className="icon"></div>
                        </div>
                        <div className="footer_section_item  section_item_hide">
                            <ul className="section_list">
                                <li className="list_item">
                                    <a>
                                        About
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Customer Service
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Reward Program
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Shipping &amp; Returns
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Privacy Policy
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="footer_section">
                        <div className="footer_section_header section_border">
                            <div className="heading">
                                CUSTOMER SERVICE
                            </div>
                            <div className="icon"></div>
                        </div>
                        <div className="footer_section_item section_item_hide">
                            <ul className="section_list">
                                <li className="list_item">
                                    <a>
                                        Search Terms
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Advanced Search
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Orders and Returns
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Contact Us
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Theme FAQS
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Consultant
                                    </a>
                                </li>
                                <li className="list_item">
                                    <a>
                                        Store Locations
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className="footer_section">
                        <div className="footer_section_header">
                            <div className="heading">
                                NEWSLETTER SIGNUP
                            </div>
                        </div>
                        <div className="footer_section_item">
                            <Newsletter />                            

                            <div className="footer_social">
                                <ul className="social_list">
                                    <li className="social_item">
                                        <a className="social_link">
                                            <span className="icon-facebook"></span>
                                        </a>
                                    </li>
                                    <li className="social_item">
                                        <a className="social_link">
                                            <span className="icon-instagram"></span>
                                        </a>
                                    </li>
                                    <li className="social_item">
                                        <a className="social_link">
                                            <span className="icon-pintrest"></span>
                                        </a>
                                    </li>
                                    <li className="social_item">
                                        <a className="social_link">
                                            <span className="icon-tictok"></span>
                                        </a>
                                    </li>
                                    <li className="social_item">
                                        <a className="social_link">
                                            <span className="icon-youtube"></span>
                                        </a>
                                    </li>
                                    <li className="social_item">
                                        <a className="social_link">
                                            <span className="icon-twitter"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_content_bottom">
                <div className="customized_container copyright_payment_wrapper">
                    <div className="footer_copyright">
                        <div className="copyright_content">
                            All Rights Reserved. Powered by Ewizcommerce.
                        </div>
                    </div>
                    <div className="footer_payment">
                        <div className="payment_wrapper">
                            <ul className="payment_list">
                                <li className="payment_item">
                                    <span className="icon-viza"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                </li>
                                <li className="payment_item">
                                    <span className="icon-master-card"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></span>
                                </li>
                                <li className="payment_item">
                                    <span className="icon-american-express"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                </li>
                                <li className="payment_item">
                                    <span className="icon-apple-pay"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span></span>
                                </li>
                                <li className="payment_item">
                                    <span className="icon-discover"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span></span>
                                </li>
                                <li className="payment_item">
                                    <span className="icon-paypal"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span></span>
                                </li>
                                <li className="payment_item">
                                    <span className="icon-shopify-pay"><span className="path1"></span><span className="path2"></span><span className="path3"></span></span>
                                </li>
                            </ul>   
                        </div>
                    </div>
                </div>            
            </div>
        </div>
    </footer>
}

export default Footer;