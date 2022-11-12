import { useParams, useLocation } from "react-router-dom";
import useGetProductDetails from "../../hooks/api/useGetProductDetails";
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import useScrollToTop from "../../hooks/useScrollToTop";

import "./product.scss";
import { useState } from "react";
import { useEffect } from "react";


const Product = () => {

    useScrollToTop();

    const {productGuid} = useParams();
    const {state: pProps} = useLocation();
    const {data: productDetails} = useGetProductDetails({productGuid, pProps });
    console.log(productDetails);

    const [activeSKU, setActiveSKU] = useState(null);
    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (productDetails.productnewskuvm[0].productmedialist && activeSKU === null) {
            setActiveSKU(productDetails.productnewskuvm[0])
        }
    }, [productDetails, activeSKU]);

    const defaultImage = window.Amazon_CDNUrl + "/" + window.websiteguid + "/StaticImages/default.png";
    const imageInitialPath = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Products/Medium/";
    const imageThumbnailPath = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Products/Thumbnail/";
    const onImgError = (c) => {
        c.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Crect width='280' height='280' fill='%23cccccc'/%3E%3C/svg%3E";
    }

    if(!productDetails) return <>Loading</>;
    return <div className="container">
        {/* <Breadcrumb collections={productDetails.Collections[0]} productName={productDetails.productname}/> */}

        <ProductBreadcrumbs productData={productDetails}/>

        <div className="productDetailWrapper">

            <div className="product-images">
                <figure>
                    <img width="400" src={imageInitialPath + 
                        (activeSKU === null
                            ? productDetails.productimageurl.split("/").pop()
                            : mainImage === ""
                                ? activeSKU.imagename
                                : mainImage)
                        } alt={productDetails.productname} />
                </figure>
                {activeSKU !== null && <div className="media-list-images">
                    {activeSKU.productmedialist.filter(m => m.mediatype === "Image").map(media => {
                        return <div key={media.mediaguid} className="media-item">
                            <img width={150} alt={media.medianame} src={defaultImage} data-src={`${imageThumbnailPath}${media.media}`} className="img-fluid lazyload" onClick={() => setMainImage(media.media)} onError={(t) => onImgError(t)}/>
                        </div>            
                    })}
                </div>}
            </div>

            <div className="product-details">
                <small>{productDetails.productcode}</small>
                <h1>{productDetails.productname}</h1>
                <div className="reviewCount">
                    <div className="rating visualRating">
                        <span className="icon-star-empty"></span>
                        <span className="icon-star-empty"></span>
                        <span className="icon-star-empty"></span>
                        <span className="icon-star-empty"></span>
                        <span className="icon-star-empty"></span>
                    </div>
                    <span className="reviewCount review_text">0 Review</span>
                    <button id="writeReviewBtn" className="btn-link">Write a Review</button>
                </div>
                {productDetails.strikeprice > 0 && <div className="discounted-price">
                    <span className="currencySymbol" />
                    {productDetails.strikeprice}
                </div>}
                <div className="price">
                    <span className="currencySymbol" />
                    {productDetails.price}
                </div>

                <div className="variants">
                    <h3>Variant: {activeSKU?.sku}</h3>
                    <div className="variant-list">
                        {productDetails.productnewskuvm.filter(s => s.sku !== null).map(sku => <div title={sku.sku} key={sku.skuguid} className={sku.skuguid === activeSKU?.skuguid ? "variant-item active" : "variant-item" } onClick={() => {
                            setActiveSKU(sku);
                            setMainImage("")
                        }}>
                            <img width={75} src={imageThumbnailPath + sku.imagename} alt={sku.sku} title={sku.sku} />
                        </div>)}
                    </div>
                </div>


                <div className="desc" dangerouslySetInnerHTML={{__html: productDetails.description}} />
                <div className="further-desc" dangerouslySetInnerHTML={{__html: productDetails.furtherdescription}} />
                {productDetails.productdetails && <div className="details">
                    <table>
                        <tbody>
                            {productDetails?.productdetails.map((d,i) => <tr key={i}>
                                <td>{d.groupkey}</td>
                                <td>{d.groupvalue}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>}
            </div>

            {/* <div className="productImagesVariantWrapper">
                <div className="productImages">
                    <img src={productImage} className="img-fluid" width="250" height="250"/>
                </div>
                <ImageVariant productSkus={productDetails.productnewskuVM} changeVariantImage={changeVariantImageHandler}  selectedProductImage={productImage} selectedSize={selectedSku[0].VariantSize || ""}/>
            </div>
            <div className="details">
                <div className="productNameCode">
                    <h1><span>{productDetails.productcode}</span> - {productDetails.productname}</h1>
                </div>
                <ReviewList productCode = {productDetails.productcode} productName={productDetails.productname} productImage={selectedSku[0].ImageName}/>
                <div className="price">
                    {productDetails.StrikePrice > 0 && <span className="price">
                        <span className="currencySymbol" />{productDetails.StrikePrice}
                    </span>}
                    <span className={`price ${productDetails.StrikePrice > 0 ? "strike": ""}`}><span className="currencySymbol" />{productDetails.Price}</span>
                </div>
                <div className="selectedSkuDetails">
                    <div className="skudetail">
                        <span className="heading">SKU</span> <span className="result">{selectedSku[0].VariantName}</span>
                    </div>
                    <div className="skudetail">
                        <span className="heading">Availability</span> <span className="result">{selectedSku[0].Inventory > 0 ? "In Stock" : "Out of Stock"}</span>
                    </div>
                </div>
                
                {selectedSku[0].VariantSize != "" && <div className="sizes">
                    <div className="sectionHeading_wrapper">
                        <h3 className="sectionHeading">Sizes : </h3><span className="selectedSize">{selectedSku[0].VariantSize}</span>
                    </div>
                    {productDetails.productnewskuVM.filter(sku => sku.VariantName == selectedSku[0].VariantName).map((filterdSkus,i)=>{
                        return <div className={`size ${selectedSku[0].VariantSize == filterdSkus.VariantSize? "activeSize" : ""}`} onClick={()=>changeSizeHandler(selectedSku[0].VariantName,filterdSkus.VariantSize)}>{filterdSkus.VariantSize}</div>
                    })}
                </div>}
                <AddToCart productDetail={productDetails} selectedSku={selectedSku} prodPrice ={productDetails.StrikePrice > 0 ? productDetails.StrikePrice : productDetails.Price}/>
                <div className="toggleHeadersSection">
                    {productDetails.Description != null && <ShowDetails title="Description" defaultShow={true}>
                        <div dangerouslySetInnerHTML={{__html: productDetails.Description}}></div>
                    </ShowDetails>}
                    {productDetails.FurtherDescription != null && <ShowDetails title="Further Description"  defaultShow={false}>
                        <div dangerouslySetInnerHTML={{__html: productDetails.FurtherDescription}}></div>
                    </ShowDetails>}
                    {productDetails.ProductDetails != null && <ShowDetails title="Product Details" defaultShow={false}>
                        <div className="table-responsive">
                            <table className="table-bordered table">
                                {productDetails.ProductDetails.map((details,i)=>{
                                    return <tr key={i} data-group-name={details.GroupName}>
                                        <th className="tableHeading">{details.GroupKey}</th>
                                        <td className="tableValue">{details.GroupValue}</td>
                                    </tr>
                                })}
                            </table>
                        </div>
                    </ShowDetails>}
                    <ShowDetails title="Reviews" defaultShow={false}>
                        <ReviewList productCode = {productDetails.productcode} productName={productDetails.productname} productImage={selectedSku[0].ImageName} showListing={true}/>
                    </ShowDetails>
                </div>
            </div> */}
        </div>
    </div>

}

export default Product;