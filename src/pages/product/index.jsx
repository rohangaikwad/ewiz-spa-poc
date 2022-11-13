import { createEffect, createSignal } from "solid-js";
import { useParams, useLocation } from "@solidjs/router";
import useGetProductDetails from "../../hooks/api/useGetProductDetails";
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import useScrollToTop from "../../hooks/useScrollToTop";

import "./product.scss";

const Product = () => {

    useScrollToTop();

    const {productGuid} = useParams();
    const pProps = useLocation();

    //console.log(productGuid, pProps.state)

    const query = useGetProductDetails({productGuid, pProps: pProps.state });
    const [activeSKU, setActiveSKU] = createSignal(null);
    const [mainImage, setMainImage] = createSignal("");
    const [qty, setQty] = createSignal(1);

    createEffect(() => {
        if (query.data !== undefined && activeSKU() === null) {
            if(query.data.productnewskuvm[0].productmedialist) {
                setActiveSKU(query.data.productnewskuvm[0])
            }
        }
    });

    const defaultImage = window.Amazon_CDNUrl + "/" + window.websiteguid + "/StaticImages/default.png";
    //const imageInitialPath = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Products/Medium/";
    const imageThumbnailPath = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Products/Thumbnail/";
    const onImgError = (c) => {
        c.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Crect width='280' height='280' fill='%23cccccc'/%3E%3C/svg%3E";
    }

    return <Switch>
        <Match when={query.isLoading}>
            <h1>Loading</h1>
        </Match>
        <Match when={query.isError}>
            <h1>Some error occured. Please try again.</h1>
        </Match>
        <Match when={query.isSuccess}>
            <div class="container">
                {/* <Breadcrumb collections={query.data.Collections[0]} productName={query.data.productname}/> */}

                <ProductBreadcrumbs query={query}/>

                <div class="productDetailWrapper">

                    <div class="product-images">
                        <figure>
                            <img width="400" src={imageThumbnailPath + 
                                (activeSKU() === null
                                    ? query.data.productimageurl.split("/").pop()
                                    : mainImage() === ""
                                        ? activeSKU().imagename
                                        : mainImage())
                                } alt={query.data.productname} />
                        </figure>
                        {activeSKU() !== null && <div class="media-list-images">
                            {activeSKU().productmedialist?.filter(m => m.mediatype === "Image").map(media => {
                                return <div key={media.mediaguid} class="media-item">
                                    <img width={150} alt={media.medianame} src={defaultImage} data-src={`${imageThumbnailPath}${media.media}`} class="img-fluid lazyload" onClick={() => setMainImage(media.media)} onError={(t) => onImgError(t)}/>
                                </div>            
                            })}
                        </div>}
                    </div>

                    <div class="product-details">
                        <small class="product-code">{query.data.productcode}</small>
                        <h1 class="product-name">{query.data.productname}</h1>
                        <div class="review-ratings">
                            <div class="visual-rating" style={`background-image: linear-gradient(90deg, var(--main-color) 71%, #ccc 60%)`}>
                                {new Array(5).fill(0).map((s,i) => <>&#9733;</>)}
                            </div>
                            <div class="review-count">0 Review(s)</div>
                        </div>
                        {query.data.strikeprice > 0 && <div class="discounted-price">
                            <span class="currencySymbol" />
                            {query.data.strikeprice}
                            <div class="discount">({((query.data.price-query.data.strikeprice)/(query.data.price/100)).toFixed(0)}% OFF)</div>
                        </div>}
                        <div class="price">
                            <span class="currencySymbol" />
                            {query.data.price.toLocaleString("en-US")}
                        </div>

                        <div class="variants">
                            <h3>Variant: {activeSKU()?.sku}</h3>
                            <div class="variant-list">
                                {query.data.productnewskuvm.filter(s => s.sku !== null).map(sku => <div title={sku.sku} key={sku.skuguid} class={sku.skuguid === activeSKU()?.skuguid ? "variant-item active" : "variant-item" } onClick={() => {
                                    setActiveSKU(sku);
                                    setMainImage("")
                                }}>
                                    <img width={75} src={imageThumbnailPath + sku.imagename} alt={sku.sku} title={sku.sku} />
                                </div>)}
                            </div>
                        </div>


                        <div class="product-desc" innerHTML={query.data.description} />
                        <div class="further-desc" innerHTML={query.data.furtherdescription} />

                        {query.data.productdetails && <div class="details">
                            <table>
                                <tbody>
                                    {query.data?.productdetails.map((d,i) => <tr key={i}>
                                        <td>{d.groupkey}</td>
                                        <td>{d.groupvalue}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>}
                    </div>

                    <section id="buy-box">
                        <h3>Order</h3>

                        {/* {query.data.strikeprice > 0 && <div class="discount-box">
                            {((query.data.price-query.data.strikeprice)/(query.data.price/100)).toFixed(0)}% OFF
                        </div>}

                        <div class="discount">
                            {query.data.strikeprice > 0
                                ? <>
                                    <span><span class="currencySymbol"></span>{query.data.strikeprice}</span>
                                    <strike><span class="currencySymbol"></span>{query.data.price}</strike>
                                </>
                                : <span><span class="currencySymbol"></span>{query.data.price}</span>}
                        </div> */}


                        {activeSKU() != null && <div class="variant">
                            <div class="thumb">
                                <img width={50} src={imageThumbnailPath + activeSKU().imagename} alt={activeSKU().sku} title={activeSKU().sku}  />
                            </div>
                            <div class="info">
                                <label>Selected Variant</label>
                                <div>{activeSKU().sku}</div>
                            </div>
                        </div>}

                        <div id="qty-stock">
                            <div class="quantity">
                                <span data-disabled={qty() === 1} class="action btn minus" onClick={() => setQty(qty() - 1)}></span>
                                <span>{qty()}</span>
                                <span class="action btn-plus" onClick={() => setQty(qty() + 1)}></span>
                            </div>
                            <div class="stock">Stock: <b>987</b></div>
                        </div>

                        <div className="total-price">
                            <label>Total Price:</label>
                            <div className="price">
                                <div className="currencySymbol"/>
                                <b>{(query.data.strikeprice > 0
                                    ? query.data.strikeprice * qty()
                                    : query.data.price * qty()).toLocaleString()
                                }</b>
                            </div>
                        </div>

                        <div className="actions">
                            <div className="btn cart">Add to Cart</div>
                            <div className="btn wishlist">Add to Wishlist</div>
                        </div>
                    </section>
                </div>
            </div>
        </Match>
    </Switch>
}

export default Product;