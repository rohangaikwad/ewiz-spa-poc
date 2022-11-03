import { useParams, useLocation } from "react-router-dom";

const Product = () => {
    const {productName, productCode} = useParams();
    const {state: pProps} = useLocation();
    console.log(pProps)

    return <div className="container">
        {/* <Breadcrumb collections={productDetails.Collections[0]} productName={productDetails.productname}/> */}
        <div className="productDetailWrapper">
            <h1>{productCode} - {productName}</h1>
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