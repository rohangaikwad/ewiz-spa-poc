import { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ productData, isSubscribe = false }) => {
    //const cartCount = useSelector(state => state.cartCount);
    //const defaultImage = window.cdnURL + "/" + window.websiteguid + "/StaticImages/default.png";
    const defaultSVGImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23cccccc'/%3E%3C/svg%3E";

    const AddToWishlist = ({ productDetail }) => {
        const [isAddedToWishList, setWishlist] = useState(productDetail.isAddedInWishList)

        const updateWishlist = () => {
            window.callApi({
                url: window.SaaS_Basket_Microservice_URL + "api/Wishlist/AddToWishlistJSON" + "/" + productDetail.productGuid,
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

        return <div className={`wishlistIcon ${isAddedToWishList ? "checked" : ""}`} title="Add to wishlist" onClick={updateWishlist}>
            <span className="text">{isAddedToWishList ?  "Remove from" : "Add to" } wishlist</span>
            <svg viewBox="0 0 512 512" className="icon icon-wishlist">
                <path d="M474.644,74.27C449.391,45.616,414.358,29.836,376,29.836c-53.948,0-88.103,32.22-107.255,59.25 c-4.969,7.014-9.196,14.047-12.745,20.665c-3.549-6.618-7.775-13.651-12.745-20.665c-19.152-27.03-53.307-59.25-107.255-59.25 c-38.358,0-73.391,15.781-98.645,44.435C13.267,101.605,0,138.213,0,177.351c0,42.603,16.633,82.228,52.345,124.7 c31.917,37.96,77.834,77.088,131.005,122.397c19.813,16.884,40.302,34.344,62.115,53.429l0.655,0.574 c2.828,2.476,6.354,3.713,9.88,3.713s7.052-1.238,9.88-3.713l0.655-0.574c21.813-19.085,42.302-36.544,62.118-53.431 c53.168-45.306,99.085-84.434,131.002-122.395C495.367,259.578,512,219.954,512,177.351 C512,138.213,498.733,101.605,474.644,74.27z M309.193,401.614c-17.08,14.554-34.658,29.533-53.193,45.646 c-18.534-16.111-36.113-31.091-53.196-45.648C98.745,312.939,30,254.358,30,177.351c0-31.83,10.605-61.394,29.862-83.245 C79.34,72.007,106.379,59.836,136,59.836c41.129,0,67.716,25.338,82.776,46.594c13.509,19.064,20.558,38.282,22.962,45.659 c2.011,6.175,7.768,10.354,14.262,10.354c6.494,0,12.251-4.179,14.262-10.354c2.404-7.377,9.453-26.595,22.962-45.66 c15.06-21.255,41.647-46.593,82.776-46.593c29.621,0,56.66,12.171,76.137,34.27C471.395,115.957,482,145.521,482,177.351 C482,254.358,413.255,312.939,309.193,401.614z"></path>
            </svg>
        </div >
    }

    const AddToCart = ({ productDetail }) => {
        const addToCartHandler = () => {
            const UserCookie = JSON.parse(window.cookiedetails);

            const ProductBasketVM = {
                "UserGuid": UserCookie.UserGuid || "",
                "SessionGuid": UserCookie.SessionGuid || "",
                "EmaiAddress": UserCookie.EmailAddress || "",
                "productGuid": productDetail.productGuid,
                "productcode": productDetail.productcode,
                "productname": productDetail.productname,
                "skuGuid": productDetail.productnewskuVM[0].skuGuid,
                "quantity": 1,
                "Price": productDetail.price,
                "sku": productDetail.productnewskuVM[0].sku,
                "imageName": productDetail.productnewskuVM[0].imageName,
                "variantName": productDetail.productnewskuVM[0].variantName,
                "pricingGuid": productDetail.priceGuid,
                "addons": []
            };

            const productBasketDetailVM = [];
            productBasketDetailVM.push(ProductBasketVM)

            window.callApi({
                url: window.SaaS_Basket_Microservice_URL + 'api/basket/POSAddToCart',
                type: 'POST',
                data: JSON.stringify(productBasketDetailVM),
                headers: { "WebSiteGuid": window.websiteguid, 'LanguageGuid': window.languageuid, "CookieDetails": window.cookiedetails, "CurrencyGuid": window.currencyguid },
                isAsync: true,
                MicroserviceName: 'SaaS_Basket_Microservice',
                contentType: "application/json;charset=utf-8",
                OnError: (msg) => console.log("addToCart function ", msg),
                OnSuccess: ({ statusCode }) => {
                    console.log("POSAddToCartresult", statusCode);
                    if (statusCode == 200) {
                        //GetBasketProductCount()
                        //dispatch({ type: "SET_CART_COUNT", payload: cartCount + 1 })
                        window.popupV3({
                            content: 'Item added to your cart!', classes: "wishlistAlert text-center", type: "notification", size: 'md', timeout: 2000,
                        });
                    };
                }
            });
        }

        return <div className="action">
            <a className="action-icon add-to-cart" onClick={addToCartHandler}><span className="action-name">Add to Cart</span></a>
        </div>
    }

    const AddToSubscription = ({productDetailLink}) => {
        
        return <div className="action">
            <a className="action-icon add-to-cart" href={productDetailLink}><span className="action-name">Add to Subscribe</span></a>
        </div>
    }

    return <div className="card product-card">
        <div className="productImage">
            <Link state={productData} to={"/" + productData?.detailURL.replace("https://demo.ewizcommerce.com/", "")}>
                <img className="lazyload ls-is-cached img-fluid" src={defaultSVGImage} data-src={productData.ProductImageUrl || productData.productImageURL || productData.productImageUrl} alt={productData.productname || productData.productName} />
            </Link>
            <div className="wishlist-and-view-main-div">
                <AddToWishlist productDetail={productData} />
            </div>
            {isSubscribe ? <AddToSubscription productDetailLink={productData?.detailURL} /> : <AddToCart productDetail={productData} /> }
        </div>
        <div className="card-block">
            <div className="product-upload-day">
                <Link state={productData} to={"/" + productData?.detailURL.replace("https://demo.ewizcommerce.com/", "")}>{productData.productcode || productData.productCode}</Link>
            </div>
            <div className="product-name">
                <Link state={productData} to={"/" + productData?.detailURL.replace("https://demo.ewizcommerce.com/", "")}>{productData.productname || productData.productName}</Link>
            </div>
            <div className="product-price">
                <div className="price">
                    <p>
                        <span>From</span>
                        <span className="price-span"><span className="currencySymbol"></span>{productData.price || productData.Price}</span>
                    </p>
                </div>
            </div>
            {/*{collection.productnewskuVM.length != 0 ? <div className="product-swatchs" data-sku-lenght={collection.productnewskuVM.length}>
                <ul>
                    {collection.productnewskuVM.map((sku) => {
                        const imageURL =`${cdnURL}/${websiteguid}/Products/Medium/${sku.imageName}`
                        return <li className="item">
                            <img src={defaultImage} data-src={imageURL} className="img-fluid lazyload ls-is-cached" alt={sku.variantName} />
                        </li>
                    })}
                </ul>
            </div>
            : <Fragment />} */}
        </div>
    </div>
}

export default ProductCard;