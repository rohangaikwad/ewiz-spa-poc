import Newsletter from "./Newsletter";
import "./footer.scss";
import CategoryMenu from "../header/CategoryMenu";

const Footer = () => {
    return <footer>
        <div class="container">
            <div class="footer_content_top">
                <div class="customized_container footer_section_holder">
                    <div class="footer_section">
                        <div class="footer_section_header section_border">
                            <div class="heading">
                                SHOP
                            </div>
                            <div class="icon"></div>
                        </div>
                        <div class="footer_section_item section_item_hide" id="footerCategoryMenu">
                            <CategoryMenu />
                        </div>
                    </div>
                    <div class="footer_section">
                        <div class="footer_section_header section_border">
                            <div class="heading">
                                INFORMATION
                            </div>
                            <div class="icon"></div>
                        </div>
                        <div class="footer_section_item  section_item_hide">
                            <ul class="section_list">
                                <li class="list_item">
                                    <a>
                                        About
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Customer Service
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Reward Program
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Shipping &amp; Returns
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Privacy Policy
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Terms &amp; Conditions
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="footer_section">
                        <div class="footer_section_header section_border">
                            <div class="heading">
                                CUSTOMER SERVICE
                            </div>
                            <div class="icon"></div>
                        </div>
                        <div class="footer_section_item section_item_hide">
                            <ul class="section_list">
                                <li class="list_item">
                                    <a>
                                        Search Terms
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Advanced Search
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Orders and Returns
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Contact Us
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Theme FAQS
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Consultant
                                    </a>
                                </li>
                                <li class="list_item">
                                    <a>
                                        Store Locations
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div class="footer_section">
                        <div class="footer_section_header">
                            <div class="heading">
                                NEWSLETTER SIGNUP
                            </div>
                        </div>
                        <div class="footer_section_item">
                            <Newsletter />                            

                            <div class="footer_social">
                                <ul class="social_list">
                                    <li class="social_item">
                                        <a class="social_link">
                                            <span class="icomoon-facebook"></span>
                                        </a>
                                    </li>
                                    <li class="social_item">
                                        <a class="social_link">
                                            <span class="icomoon-instagram"></span>
                                        </a>
                                    </li>
                                    <li class="social_item">
                                        <a class="social_link">
                                            <span class="icomoon-pintrest"></span>
                                        </a>
                                    </li>
                                    <li class="social_item">
                                        <a class="social_link">
                                            <span class="icomoon-tictok"></span>
                                        </a>
                                    </li>
                                    <li class="social_item">
                                        <a class="social_link">
                                            <span class="icomoon-youtube"></span>
                                        </a>
                                    </li>
                                    <li class="social_item">
                                        <a class="social_link">
                                            <span class="icomoon-twitter"></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer_content_bottom">
                <div class="customized_container copyright_payment_wrapper">
                    <div class="footer_copyright">
                        <div class="copyright_content">
                            All Rights Reserved. Powered by Ewizcommerce.
                        </div>
                    </div>
                    <div class="footer_payment">
                        <div class="payment_wrapper">
                            <ul class="payment_list">
                                <li class="payment_item">
                                    <span class="icomoon-viza"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                </li>
                                <li class="payment_item">
                                    <span class="icomoon-master-card"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                                </li>
                                <li class="payment_item">
                                    <span class="icomoon-american-express"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
                                </li>
                                <li class="payment_item">
                                    <span class="icomoon-apple-pay"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span></span>
                                </li>
                                <li class="payment_item">
                                    <span class="icomoon-discover"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span></span>
                                </li>
                                <li class="payment_item">
                                    <span class="icomoon-paypal"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></span>
                                </li>
                                <li class="payment_item">
                                    <span class="icomoon-shopify-pay"><span class="path1"></span><span class="path2"></span><span class="path3"></span></span>
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