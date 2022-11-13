import { createSignal } from "solid-js";
import { Link } from "@solidjs/router";
import ObjKeysToLowerCase from "../../utils/ObjKeysToLowerCase";

const ProductCard = ({ productData, isSubscribe = false }) => {
    //const cartCount = useSelector(state => state.cartCount);
    //const defaultImage = window.cdnURL + "/" + window.websiteguid + "/StaticImages/default.png";
    const defaultSVGImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23cccccc'/%3E%3C/svg%3E";

    const AddToWishlist = ({ productDetail }) => {
        const [isAddedToWishList, setWishlist] = createSignal(productDetail.isAddedInWishList)

        const updateWishlist = () => {
            window.callApi({
                url: window.SaaS_Basket_Microservice_URL + "api/Wishlist/AddToWishlistJSON/" + productDetail.productGuid,
                type: "GET",
                headers: { "LanguageGuid": window.languageuid, "WebsiteGuid": window.websiteguid, "currencyguid": window.currencyguid, "cookiedetails": window.cookiedetails },
                isAsync: true,
                MicroserviceName: 'SaaS_Basket_Microservice',
                contentType: "application/json;charset=utf-8",
                OnError: (msg) => console.log("AddToWishlist ", msg),
                OnSuccess: ({ data }) => {
                    console.log('is wishlist added', data);
                    setWishlist(data.isAddedInWishList);

                    let content = data.isAddedInWishList ? 'Item added to your Wishlist!' : 'Item removed from your Wishlist!';
                    window.popupV3({
                        content: content, classes: "wishlistAlert text-center", type: "notification", size: 'sm', timeout: 2000, position: "1",
                    });
                }
            });
        }

        return <div class={`wishlistIcon`} title="Add to wishlist" onClick={updateWishlist}>
            <span class="text">Add to wishlist</span>
        </div >
    }

    const lowercaseProductData = ObjKeysToLowerCase(productData);

    return <div class="card product-card">
        <div class="productImage">
            <Link state={lowercaseProductData} href={"/product/" + productData.detailURL.split("/")[4] + "/" + productData.productGuid}>
                <img class="lazyload ls-is-cached img-fluid" src={defaultSVGImage} data-src={productData.ProductImageUrl || productData.productImageURL || productData.productImageUrl} alt={productData.productname || productData.productName} />
            </Link>
            <div class="wishlist-and-view-main-div">
                <AddToWishlist productDetail={productData} />
            </div>
        </div>
        <div class="card-block">
            <div class="product-upload-day">
                <Link state={lowercaseProductData} href={"/product/" + productData.detailURL.split("/")[4] + "/" + productData.productGuid}>{productData.productcode || productData.productCode}</Link>
            </div>
            <div class="product-name">
                <Link state={lowercaseProductData} href={"/product/" + productData.detailURL.split("/")[4] + "/" + productData.productGuid}>{productData.productname || productData.productName}</Link>
            </div>
            <div class="product-price">
                <div class="price">
                    <p>
                        <span>From</span>
                        <span class="price-span"><span class="currencySymbol"></span>{productData.price || productData.Price}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
}

export default ProductCard;