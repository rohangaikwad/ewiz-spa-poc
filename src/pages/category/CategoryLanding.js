import { Link } from "react-router-dom";
import PlaceholderImageURL from "../../utils/PlaceholderImageURL";
import useGetProductsData from "./../../hooks/api/useGetProductsData";
import ProductCard from "./../../components/productCard";

const CategoryLanding = ({catName, stateProps}) => {

    console.log(catName, stateProps)

    
    const initialProductBasketVM = {
        "ProductGuid": null,
        "WebsiteGuid": window.websiteguid,
        "LanguageGuid": window.languageuid,
        "CategoryGuid": stateProps?.collectionGuid || document.getElementById("hidGuid").value,
        "CategoryGUIDs": "",
        "SectionGUIDs": "",
        "BrandGUIDs": "",
        "PageNo": 1,
        "PageSize": 24,
        "DisplayView": null,
        "NoProducts": null,
        "SortName": "ProductName_asc",
        "MinPrice": "0.0",
        "MaxPrice": "1000000.0",
        "SelectedMinPrice": 0.0,
        "SelectedMaxPrice": 0.0,
        "BrandGuid": null,
        "Industry": "",
        "EventTheme": "",
        "ProductionTime": "",
        "IsRecommended": 0,
        "MinOrder": "",
        "ProductRating": "",
        "ImprintMethods": "",
        "Materials": "",
        "Sizes": "",
        "Colors": "",
        "SearchText": "",
        "SearchResults": "",
        "ShowInActive": false,
        "ProductCodes": null,
        "VariantName": null,
        "IsMultipleCurrency": false,
        "CurrencyGuid": window.currencyguid,
        "IsDealOfTheWeekEnabled": false,
        "SelectedFilter": "subcategory|price|color|variantsize|brand",
        "MaxOrder": "",
        "ShowViewAll": "true",
        "ParentCategoryGuids": null,
        "CountryCode": "",
        "ZipCode": "",
        "IsReviewCount": false,
        "ProductCodeSimilarProduct": "",
        "CustomField": "",
        "IsViewAll": true,
        "IsSwatchesSelected": false,
        "CustomField1": "",
        "NoOfSwatches": "6",
        "NoOfVariants": null,
        "ShowVariant": false,
        "IsFilterTabView": false,
        "PriceSliderMinMaxPosition": null,
        "IsPriceFilterLabelEnable": 0,
        "VariantSize": null,
        "multipleProductionTime": "",
        "SubCategoriesGUIDs": "",
        "ParentCategoriesGUIDs": "",
        "CollectionGuids": null,
        "ParentCategoriesChildGUIDs": null,
        "IsPriceBreakfilter": false,
        "IsPriceMenu": false,
        "SearchWithinCategory": ''
    };
    const {data: productData, isError, isSuccess} = useGetProductsData({wishlistCount: 0, productBasketVM: initialProductBasketVM})

    const onImgError = (c) => {
        c.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Crect width='280' height='280' fill='%23cccccc'/%3E%3C/svg%3E";
    }



    return <div className="container">
        <div className="categoryDetails">
            <div className="categoryBanner">
                <img src={PlaceholderImageURL(1024,100, "#f1f1f1")} data-src={stateProps?.categoryBanner} alt={catName} className="lazyload ls-is-cached img-fluid" width="1000" height="200" />
            </div>
            <h1>{stateProps?.collectionName || catName}</h1>
            <div className="categoryDescription" dangerouslySetInnerHTML={{ __html: stateProps?.descriptionText }}></div>

            {stateProps !== null && stateProps?.subCategories !== null && <div className="subCategoryList">
                {stateProps.subCategories.map((subCat,k) => {
                    const imageURL = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Collections/Default/" + subCat.categoryImageURL
                    return <Link state={subCat} key={k} to={subCat.categoryURL.split("/").pop()} className="subcategoryData">
                        <img className="lazyload ls-is-cached img-fluid" src={PlaceholderImageURL(250,250,"#cccccc")} data-src={imageURL} alt={subCat.collectionName} onError={(t) => onImgError(t)} width="250" height="250" />
                        <div className="subCategory-name-count">
                            <h3>{subCat.collectionName}</h3>
                            <span>({subCat.productCount})</span>
                        </div>
                    </Link>
                })}
            </div>}
        </div>
        
        {(!isError && isSuccess) && <div className="productWrapper">
            {console.log("component getting called")}
            {productData.map((product, i) => {
                return <ProductCard productData={product} key={product.productGuid} />
            })}
        </div>}
    </div>
}



// let enable = "";
// if (window.location.href.includes("search")) {
//     enable = alisname.replace("(", "").replace(")", "").replace(/%20/g, " ").replace("-", " ")
// }

// const aliasName = window.location.pathname.split('/').pop();
// const topLevelGuid = document.getElementById("hidTopLevelCategory").value
// const isCategoryLandingPage = topLevelGuid == document.getElementById("hidGuid").value;


// const ProductsListing = ({ productBasketVM, productPerRow, setProductCount }) => {
//     const [productData, setProductData] = useState([]);
//     const wishlistCount = useSelector(state => state.wishlistCount);
//     const ProductCard = useSelector(state => state.ProductCard); // ProductCard component is create in layout.react.js
    
//     // product data will get load on productBasketVM or when productBasketVM is updated
//     useEffect(()=>{
//         const filterChanged = document.getElementById("filterchanged").value
//         let _oldProductData = filterChanged == '' ? productData : []
//         setProductData([])
//         callApi({
//             url: SaaS_ProductListing_Microservice_URL + 'api/Products/GetProductsWithOptimizeSearchNew',
//             type: 'Post',
//             headers: { "WebSiteGuid": websiteguid, 'LanguageGuid': languageuid, 'CurrencyGuid': currencyguid, 'CookieDetails': cookiedetails, "WishlistCount": wishlistCount },
//             data: JSON.stringify(productBasketVM),
//             isAsync: true,
//             MicroserviceName: 'SaaS_ProductListing_Microservice',
//             contentType: "application/json;charset=utf-8",
//             OnError: (msg) => console.log("ProductsListing Error", msg),
//             OnSuccess: ({ data, productCount }) => {
//                 setProductData([..._oldProductData,...data])
//                 setProductCount(productCount)
//                 document.getElementById("filterchanged").value = ''
//             }
//         });
//     },[productBasketVM])

//     if (productData.length == 0) return <div className="noProducts">No Products found.</div>

    
    
//     return <div className="productWrapper" data-product={productPerRow}>
//         {console.log("component getting called")}
//         {productData.map((product, i) => {
//             return <ProductCard productData={product} key={i} />
//         })}
//     </div>
// }

// /* Product card ends */

// /* Filter Code Starts */
// const PriceSlider =({min, max, setPriceFitler, resetPriceFilter}) =>{
//     const [minVal, setMinVal] = useState(min);
//     const [maxVal, setMaxVal] = useState(max);

//     const minValRef = useRef(null);
//     const maxValRef = useRef(null);
//     const range = useRef(null);

//     // Convert to percentage
//     const getPercent = (value) =>{
//         return Math.round(((value - min) / (max - min)) * 100);
//     }

//     useEffect(()=>{
//         if(resetPriceFilter){
//             setMinVal(min)
//             setMaxVal(max)
//         }
//     },[resetPriceFilter])

//     // Set width of the range to decrease from the left side
//     useEffect(() => {
//         if (maxValRef.current) {
//             const minPercent = getPercent(minVal);
//             const maxPercent = getPercent(+maxValRef.current.value);
//             if (range.current) {
//                 range.current.style.left = minPercent+"%";
//                 range.current.style.width = maxPercent - minPercent+"%";
//             }
//         }
//     }, [minVal, getPercent]);
  
//     // Set width of the range to decrease from the right side
//     useEffect(() => {
//         if (minValRef.current) {
//             const minPercent = getPercent(+minValRef.current.value);
//             const maxPercent = getPercent(maxVal);

//             if (range.current) {
//                 range.current.style.width = maxPercent - minPercent+"%";
//             }
//         }
//     }, [maxVal, getPercent]);

//     const minValueChange = (event) =>{
//         const value = Math.min(+event.target.value, maxVal - 1);
//         setMinVal(value);
//         event.target.value = value.toString();
//     }

//     const maxValueChange = (event) =>{
//         const value = Math.max(+event.target.value, minVal + 1);
//         setMaxVal(value);
//         event.target.value = value.toString();
//     }

//     const applyFilterHandler =() =>{
//         console.log("min & max value",minVal, maxVal)
//         const priceData={
//             "MinPrice": minVal.toString(),
//             "MaxPrice": maxVal.toString()
//         }
//         setPriceFitler(priceData)
//     }

//     return <div className="price-filter filter">
//         <h4 className="filterHeading" data-toggle="collapse" href="#priceCollapse"  aria-expanded="false">
//             <a href="javascript:void(0)">Price</a>
//         </h4>
//         <div className="panel-collapse filter-list collapse" id="priceCollapse">
//             <div className="priceFilterWrapper">
//                 <input type="range" min={min} max={max} value={minVal} ref={minValRef} onChange={(event)=>minValueChange(event)} className="thumb thumb--zindex-3" />
//                 <input type="range" min={min} max={max} value={maxVal} ref={maxValRef} onChange={(event)=>maxValueChange(event)} className="thumb thumb--zindex-4" />
//             </div>
//             <div className="slider">
//                 <div className="slider__track" />
//                 <div ref={range} className="slider__range" />
//             </div>
//             <div className="priceInput mt-4">
//                 <div className="priceRange_wrapper">
//                     <span className="currencySymbol"></span>
//                     <input className="form-control" pattern="[0-9]" id="MinValueInput" min={min} max={max} value={minVal} name="MinValueInput"  type="number" onChange={(event)=>minValueChange(event)}/>
//                 </div>
//                 <span className="txt_to">to</span>
//                 <div className="priceRange_wrapper">
//                     <span className="currencySymbol"></span>
//                     <input className="form-control" pattern="[0-9]" id="MaxValueInput" min={min} max={max} value={maxVal} name="MaxValueInput"  type="number" onChange={(event)=>maxValueChange(event)}/>
//                 </div>
//             </div>
//             <div className="applyFilter">
//                 <button type="button" onClick={applyFilterHandler} className="btn btnApplyPriceFilter">Apply</button>
//             </div>
//         </div>
//     </div>
// }

// const Filter = ({productBasketVM, changePriceFilter, resetFilter, changeCheckboxFilter, toggleMobileFilter, productCount}) =>{
//     const categoryData = useSelector(state => state.categoryData)
//     const [filterData, setFilterData] = useState(null)
//     const [selectedFilter, setSelectedFilter] = useState([])
//     const [resetPriceFilter, setResetPriceFilter] = useState(false)

//     useEffect(()=>{
//         callApi({
//             url: SaaS_ProductListing_Microservice_URL + "api/Products/GetFiltersJson",
//             type: 'Post',
//             headers: {
//             'WebSiteGuid': websiteguid, 'LanguageGuid': languageuid, 'CurrencySymbol': currencysymbol, 'CookieDetails': cookiedetails},
//             data: JSON.stringify(productBasketVM),
//             isAsync: true,
//             MicroserviceName: 'SaaS_ProductListing_Microservice',
//             contentType: "application/json;charset=utf-8",
//             dataType: "HTML",
//             OnError: (msg) => console.log("ProductsListing Error", msg),
//             OnSuccess: ({productfilterBE}) => {
//                 console.log("filter Data",productfilterBE)
//                 setFilterData(productfilterBE)
//             }
//         });
//     },[])

//     /* using trigger to change the price slider filter to set to initValue */
//     useEffect(()=>{
//         if(resetPriceFilter){
//             setTimeout(setResetPriceFilter(false), 3000)
//         }
//     },[resetPriceFilter])
//     /* using trigger to change the price slider filter to set to initValue */

//     useEffect(()=>{
//         getFilterCount("color")
//         getFilterCount("size")
//     },[selectedFilter])

//     const removeFilterHandler = useCallback((id)=>{
//         document.getElementById(id).click()
//     },[selectedFilter])

//     const filterChangeHandler = useCallback((filterName,label,isChecked)=>{
//         console.log(label,isChecked)
//         let _selectedFilter = Object.assign([], selectedFilter)
//         if(isChecked){
//             _selectedFilter.push({"label":label,"filterName":filterName})
//             setSelectedFilter(_selectedFilter)
//             changeCheckboxFilter(filterName,label,"push")
//         }else{
//             const index = _selectedFilter.findIndex(x => x.label ===label)
//             _selectedFilter.splice(index,1)
//             setSelectedFilter(_selectedFilter)
//             changeCheckboxFilter(filterName,label,"pop")
//         }
//         console.log("selectedFilter",selectedFilter,_selectedFilter)
//     },[productBasketVM,selectedFilter])

//     const resetFilterHandler = ()=>{
//         setSelectedFilter([])
//         resetFilter()
//     }

//     const removePriceFilterhandler = useCallback(() =>{
//         console.log("removePriceFilterhandler called")
//         const initPriceValue = {"MinPrice": 0,"MaxPrice": parseInt(filterData.priceFilters.maxPrice)}
//         let _selectedFilter = Object.assign([], selectedFilter)
//         const index = _selectedFilter.findIndex(x => x.type === "price")
//         _selectedFilter.splice(index,1)
//         setSelectedFilter(_selectedFilter)

//         changePriceFilter(initPriceValue)
//         setResetPriceFilter(true) /* using trigger to change the price slider filter to set to initValue */
//     },[selectedFilter,resetPriceFilter])

//     const setPriceFitler = (priceData)=>{
//         let _selectedFilter = Object.assign([], selectedFilter)
//         const index = _selectedFilter.findIndex(x => x.type === "price")
//         if(index == -1){
//             _selectedFilter.push({"type":"price","label":priceData.MinPrice + " - " + priceData.MaxPrice,"id":"test"})
//         }else{
//             _selectedFilter[index].label = priceData.MinPrice + " - " + priceData.MaxPrice
//         }     
//         setSelectedFilter(_selectedFilter)
//         changePriceFilter(priceData)
//     }

//     const getFilterCount = useCallback((filterName)=>{
//         const count = selectedFilter.filter(filter => filter.filterName == filterName).length 
//         if(count > 0) return <span className="count">({count})</span>
//         return null
//     }, [selectedFilter])

//     if(filterData == null) return <Fragment />
    
//     return <div className="sidebar_outer_wrapper">
//         <div className="sidebar_inner_wrapper">
//             <div className="sidebar_mobile">
//                 <span className="sidebar_text">Sidebar</span>
//                 <span className="sidebar_icon" onClick={toggleMobileFilter}></span>
//             </div>
//             <div className="filterWrapper">
//                 <div className="category-filter filter">
//                     <h4 className="filterHeading" data-toggle="collapse" href="#categoryCollapse" aria-expanded="true">
//                         <a href="javascript:void(0)">Category </a>
//                     </h4>
//                     <div className="panel-collapse filter-list collapse show" id="categoryCollapse">
//                         <ul className="categoryFilterUl">
//                             {categoryData.map((category,i)=>{
//                                 return <li key={i} className={`${topLevelGuid==category.collectionGuid ? "active": ""}`}>
//                                     <a className="link"  href={category.categoryURL}>{category.collectionName}</a>
//                                 </li>
//                             })}
//                         </ul>
//                     </div>
//                 </div>
//                 {selectedFilter.length != 0 && <div className="selected-filter filter">
//                     <h4 className="filterHeading color_option">
//                         <a className="refined_by" href="javascript:void(0)">Refined By</a>
//                         <div className="clearColors" onClick={resetFilterHandler}>clear All</div>
//                     </h4>
//                     <div className="resultSearchProductCount">{productCount} {productCount > 1 ? "results" : "result"}</div>
//                     <div className="selectedFilter">
//                         {selectedFilter.map((filter)=>{
//                             return <div className="filter_label" data-type={filter.filterName} data-label={filter.label} onClick={()=>filter.type =="price" ?  removePriceFilterhandler() : removeFilterHandler(filter.label)}>
//                                 <span className="refinedFilterName">{filter.label}</span>
//                             </div>
//                         })}
//                     </div>
//                 </div>}
//                 {filterData.varintForFilters != null && <Fragment>
//                     <div className="size-filter filter">
//                         <h4 className="filterHeading" data-toggle="collapse" href="#sizeCollapse" aria-expanded="false">
//                             <a href="javascript:void(0)">Size {getFilterCount("size")}</a>
//                         </h4>
//                         <div className="panel-collapse filter-list collapse" id="sizeCollapse">
//                             {filterData.varintForFilters.map((size,i)=>{
//                                 return <label for={size.variantSize}>
//                                     <input type="checkbox" id={size.variantSize} onClick={(e)=>filterChangeHandler("VariantSize",size.variantSize,e.target.checked)}/>
//                                     <span className="sizeText">{size.variantSize}</span>
//                                 </label>
//                             })}
//                         </div>
//                     </div>
//                 </Fragment>}
//                 {filterData.colorsDataWithCount != null && <Fragment>
//                     <div className="color-filter filter">
//                         <h4 className="filterHeading" data-toggle="collapse" href="#colorCollapse" aria-expanded="false">
//                             <a href="javascript:void(0)">Color {getFilterCount("color")}</a>
//                         </h4>
//                         <div className="panel-collapse filter-list collapse" id="colorCollapse">
//                             {filterData.colorsDataWithCount.map((color,i)=>{
//                                 return <label for={color.masterColorGuid}>
//                                     <input type="checkbox" id={color.masterColorName} onClick={(e)=>filterChangeHandler("VariantName",color.masterColorName,e.target.checked)}/>
//                                     <span className="color" style={{backgroundColor: color.masterColorHexValue}}></span>
//                                     <span className="colorText">{color.masterColorName}</span>
//                                 </label>
//                             })}
//                         </div>
//                     </div>
//                 </Fragment>}
//                 {filterData.priceFilters != null && <PriceSlider  min={0} max={parseInt(filterData.priceFilters.maxPrice)} setPriceFitler={setPriceFitler} resetPriceFilter={resetPriceFilter}/>}   
//             </div>
//         </div>
//      </div>
// }
//     /* Filter Code ends */

// const Breadcrumb = ({categoryData,isCategoryLandingPage})=>{
//     const categoriesData = useSelector(state => state.categoryData)
//     const mainCategoryDetail = categoriesData.filter(cat => cat.collectionGuid == topLevelGuid)[0];

//     return <div className="breadCrumbWrapper">
//         <ul class="breadcrumb">
//             <li class="breadcrumb-item"><a href={window.location.origin}>Home</a></li>
//             {!isCategoryLandingPage && <li class="breadcrumb-item"><a href={`${window.location.origin}/category/${mainCategoryDetail.alias}`}>{mainCategoryDetail.collectionName}</a></li>}
//             <li class="breadcrumb-item active">{categoryData.collectionName}</li>
//         </ul>
//     </div>
// }



// const ListGridView = ({setProduct}) =>{
    
//     const setProd = (count)=>{
//         setProduct(count)

//     }
//     return <div className="productViewOptions">
//         <span className="optionHeading">View</span>
//         <div className="viewOptions">
//             <div className="toolbarIcon" onClick={()=>setProd(1)}>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//             </div>
//             <div className="toolbarIcon vertical_icon" onClick={()=>setProd(2)}>
//                 <i></i>
//                 <i></i>
//             </div>
//             <div className="toolbarIcon" onClick={()=>setProd(3)}>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//             </div>
//         </div>
//     </div>
// }

// const SortBy = ({changeSortingOption}) =>{
//     const [selectedSortBy, setSelectedSortBy] = useState("Alphabetically, A-Z")
//     const [mobileSortVisible,isMobileSortVisible] = useState(false)

//     const sortByList = [
//         {
//             "label":"Alphabetically, A-Z",
//             "value":"ProductName_asc"
//         },
//         {
//             "label":"Alphabetically, Z-A",
//             "value":"ProductName_desc"
//         },
//         {
//             "label":"Price, Low to High",
//             "value":"AsLowAsPrice_asc"
//         },
//         {
//             "label":"Price, High to Low",
//             "value":"AsLowAsPrice_desc"
//         }
//     ]

//     const sortHandler = (e,selectedName)=>{
//         setSelectedSortBy(selectedName)
//         changeSortingOption(e.target.id)
//     }
    
//     const toggleMobileSort = useCallback(() =>{
//         isMobileSortVisible(!mobileSortVisible)
//     },[mobileSortVisible])

//     return <Fragment>
//         <div className={`sort_alphabet_wrapper ${mobileSortVisible ? "mobile-sort-visible": ""}`}>
            
//             <div className="productSortOptions sort_alphabet">
//                 <span className="optionHeading" onClick={toggleMobileSort}>Sort by</span>
//                 <div className="viewOptions viewSortBy">
//                     <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
//                         <span>{selectedSortBy}</span>
//                     </button>
//                     <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="Sort By" name="Sort By">
//                         {sortByList.map((item,i)=>{
//                             return <li id={item.value} class={`dropdown-item ${selectedSortBy == item.label ? "active": ""}`} onClick={(e) => sortHandler(e, item.label)}>{item.label}</li>
//                         })}    
                        
//                     </ul>
//                 </div>
//             </div>
//         </div>
//         {mobileSortVisible && <div className="backDrop" onClick={toggleMobileSort}></div>}
//         <div className="sort_mobile" onClick={toggleMobileSort}>
//             <span className="sort_text">Sort</span>
//             <span className="sort_icon"></span>
//         </div>
//     </Fragment>
// }

// const ItemsPerPage =({changeItemPerPage}) =>{
//     const [itemsPerPage, setItemsPerPage] = useState(24)

//     const showItemsPerPageHandler = (_itemsPerPage)=>{
//         setItemsPerPage(_itemsPerPage)
//         changeItemPerPage(_itemsPerPage)
//     }

//     return <div className="productSortOptions items_per_page">
//         <span className="optionHeading">Items per Page</span>
//         <div className="viewOptions">
//             <button class="btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
//                 <span>{itemsPerPage}</span>
//             </button>
//             <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" id="Sort By" name="Sort By">
//                 <li id="" class="dropdown-item" onClick={(e) => showItemsPerPageHandler(12)}>12</li>
//                 <li id="" class="dropdown-item" onClick={(e) => showItemsPerPageHandler(24)}>24</li>
//                 <li id="" class="dropdown-item" onClick={(e) => showItemsPerPageHandler(36)}>36</li>
//                 <li id="" class="dropdown-item" onClick={(e) => showItemsPerPageHandler(48)}>48</li>
//             </ul>
//         </div>
//     </div> 
// }

// const SubCategoryList = ({collectionType}) =>{
//     const categoryData = useSelector(state => state.categoryData)
//     let [subCategoryList,setSubCategoryList] = useState(null);
//     useEffect(()=>{
//         if(collectionType == "Category"){
//             setSubCategoryList(categoryData.filter(t => t.alias === aliasName)[0].subCategories)
//         }
//     },[])
    
//     if(subCategoryList == null) return <Fragment />

//     return <div className="subCategoryList">
//         {subCategoryList.map((subCategoryData)=>{
//             const imageURL = Amazon_CDNUrl + "/" + websiteguid + "/Collections/Default/" + subCategoryData.categoryImageURL
//             return <a href={subCategoryData.categoryURL} className="subcategoryData">
//                 <img className="lazyload ls-is-cached img-fluid" src={defaultImage} data-src={imageURL} alt={subCategoryData.collectionName} onError={(t) => onImgError(t)} width="250" height="250" />
//                 <div className="subCategory-name-count">
//                     <h3>{subCategoryData.collectionName}</h3>
//                     <span>({subCategoryData.productCount})</span>
//                 </div>
//             </a>
//         })}
//     </div>
// }

// const Pagiation = ({productCount, productsPerPage,setPageNo,pageNo}) =>{
//     const[totalPageCount, setTotalPageCount] = useState(Math.ceil(parseInt(productCount) / parseInt(productsPerPage)))

//     useEffect(()=>{
//         setTotalPageCount(Math.ceil(parseInt(productCount) / parseInt(productsPerPage)))
//     },[productsPerPage,pageNo,productCount])

//     if(totalPageCount == 1) return <Fragment />
    
//     return <ul className='pagination d-flex'>
//         {pageNo >= 2 && <Fragment>
//             <li className={`page-link page-first`} onClick={()=>setPageNo(1)}>First</li>
//             <li className={`page-link page-prev`} onClick={()=>setPageNo(pageNo-1)}>Prevoius</li>
//         </Fragment>}
//         {new Array(totalPageCount).fill('').map((count,i)=>{
//             const _pageNo = i+1
//             return <li className={`page-link ${pageNo == _pageNo ? "active" : ""}`} onClick={()=>setPageNo(_pageNo)}>{_pageNo}</li>
//         })}
//         {pageNo < totalPageCount && <Fragment>
//             <li className={`page-link page-next`} onClick={()=>setPageNo(pageNo+1)}>Next</li>
//             <li className={`page-link page-last`} onClick={()=>setPageNo(totalPageCount)}>Last</li>
//         </Fragment>}
//     </ul>
// }

// const ListingPage = () => {
//     const [productBasketVM, setProductBasketVM] = useState(initialProductBasketVM)
//     const [categoryDetails, setCategoryDetails] = useState(null)
//     const [productPerRow, setProductPerRow] = useState(3)
//     const [mobileSortVisible, isMobileSortVisible] = useState(false)
//     const [mobileFilterVisible, isMobileFilterVisible] = useState(false)
//     const [productCount, setProductCount] = useState(0)
//     const loaderRef = useRef(null)
//     const [loader,showLoader] = useState(false)

//     const options={
//         root: null,
//         rootMargin: '0px',
//         threshold: 1.0
//     }   

//     useEffect(()=>{
//         const observer = new IntersectionObserver(intersectionObserverCallbackFun,options)
//         if(loaderRef.current) {
//             observer.observe(loaderRef.current)
//             console.log("observer")
//         }
//         return () => {
//             observer.disconnect(loaderRef.current);
//         }
//     },[loaderRef.current,productBasketVM, productCount])

//     const intersectionObserverCallbackFun = useCallback((entries)=>{
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         const totalPage = Math.ceil(parseInt(productCount) / parseInt(_productBasketVM["PageSize"]))
//         console.log('productBasketVM["PageNo"] < totalPage',_productBasketVM["PageNo"], totalPage, _productBasketVM["PageNo"] < totalPage)
//         entries.forEach((entry) => {
//             showAnimationLoading()
//             if(entry.intersectionRatio > 0 && _productBasketVM["PageNo"] < totalPage){
//                 _productBasketVM["PageNo"] +=1 
//                 setProductBasketVM(_productBasketVM)
                
//             }
//             hideAnimationLoading()
//         })
//     },[productBasketVM, productCount])

//     useEffect(() => {
//         callApi({
//             url: SaaS_ProductListing_Microservice_URL + "api/Products/GetCategoriesDetails" + '/' + aliasName,
//             type: 'GET',
//             headers: { "WebsiteGuid": websiteguid, "LanguageGuid": languageuid, "WebsiteURL": WebsiteURL },
//             isAsync: true,
//             MicroserviceName: 'SaaS_ProductListing_Microservice',
//             contentType: "application/json;charset=utf-8",
//             OnError: (msg) => console.log("GetCategoriesDetails Error", msg),
//             OnSuccess: ({data}) => {
//                 console.log("GetCategoriesDetails Data",data)
//                 setCategoryDetails(data)
//             }
//         });
//     },[])

//     const productView = useCallback((_productPerRow)=>{        
//         setProductPerRow(_productPerRow)
//     },[productPerRow])

//     const productCountHandler = useCallback((count)=>{
//         setProductCount(count)
//     },[productCount])

//     const setPageNoHandler = useCallback((pageNo)=>{
//         document.getElementById("filterchanged").value = "changed"
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         _productBasketVM["PageNo"] = pageNo
//         console.log("pageNoSelectd",pageNo)
//         // const scrollPosition = document.querySelector('.sort-view-page').getBoundingClientRect().top
//         // window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
//         setProductBasketVM(_productBasketVM)
//     },[productBasketVM])

//     const changeSortingOption = useCallback((newSortOption)=>{
//         document.getElementById("filterchanged").value = "changed"
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         _productBasketVM["SortName"] = newSortOption
//         _productBasketVM["PageNo"] = 1
//         console.log("sortingOptionSelectd",newSortOption)
//         setProductBasketVM(_productBasketVM)
//     },[productBasketVM])

//     const changeItemPerPage = useCallback((newItemsPerPage)=>{
//         document.getElementById("filterchanged").value = "changed"
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         _productBasketVM["PageSize"] = newItemsPerPage
//         _productBasketVM["PageNo"] = 1 // adding this so that page starts from 1
//         console.log("newItemsPerPageSelectd",newItemsPerPage)
//         setProductBasketVM(_productBasketVM)
//     },[productBasketVM])

//     const changePriceFilter = useCallback((filterValues)=>{
//         document.getElementById("filterchanged").value = "changed"
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         for (var key in filterValues) {
//             _productBasketVM[key] = filterValues[key]
//         }
//         console.log("newItemsPerPageSelectd",filterValues)
//         setProductBasketVM(_productBasketVM)
//     },[productBasketVM])

//     const resetFilter = useCallback(()=>{
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         _productBasketVM["MinPrice"] = initialProductBasketVM["MinPrice"]
//         _productBasketVM["MaxPrice"] = initialProductBasketVM["MaxPrice"]
//         _productBasketVM["Colors"] = initialProductBasketVM["Colors"]
//         console.log("reset filter",_productBasketVM)
//         setProductBasketVM(_productBasketVM)
//     },[productBasketVM]) 

//     const changeCheckboxFilter = useCallback((filterName,filterValues,operation)=>{
//         console.log("filterName",filterName," filterValues",filterValues," operation",operation)
//         document.getElementById("filterchanged").value = "changed"
//         let _productBasketVM = Object.assign({}, productBasketVM)
//         if(operation== "push"){
//             if(_productBasketVM[filterName] == null) _productBasketVM[filterName]=[]
//             _productBasketVM[filterName].push(filterValues)
//         }else{
//             const getIndex = _productBasketVM[filterName].indexOf(filterValues)
//             console.log("getIndex",getIndex)
//             _productBasketVM[filterName].splice(getIndex,1)
//             if(_productBasketVM[filterName].length == 0) _productBasketVM[filterName]= null
//         }
//         setProductBasketVM(_productBasketVM)
//     },[productBasketVM])

//     const mobileFilterHandler = useCallback(() =>{
//         isMobileFilterVisible(!mobileFilterVisible)
//     },[mobileFilterVisible])

//     if(categoryDetails == null) return <Fragment />
//     console.log("rerednder")

//     return <div className={`listingPageWrapper ${mobileFilterVisible ? "mobile-filter-visible": ""}`}>
//         <Breadcrumb categoryData={categoryDetails} isCategoryLandingPage={isCategoryLandingPage}/>
//         <div className="filer-product-wrapper">
//             <Filter productBasketVM={productBasketVM} changePriceFilter={changePriceFilter} resetFilter={resetFilter} changeCheckboxFilter={changeCheckboxFilter} toggleMobileFilter={mobileFilterHandler} productCount={productCount}/>
//             <div className="productDetailWrapper">
//                 <CategoryDetils categoryData={categoryDetails} productCount={productCount}/>
//                 {isCategoryLandingPage && <SubCategoryList collectionType={categoryDetails.collectionType}/>}
//                 {mobileFilterVisible && <div className="backDrop" onClick={mobileFilterHandler}/> }
//                 <div className="sort-view-page">
//                     <div className="filter_icon" onClick={mobileFilterHandler}>
//                         <span class="icon-filter"></span>
//                         <span class="filter-text">Filter</span>
//                     </div>
//                     {/*mobileFilterVisible && <div className="backDrop" onClick={mobileFilterHandler}/> */}
//                     <ListGridView setProduct={productView}/>
//                     <ItemsPerPage changeItemPerPage={changeItemPerPage}/>
//                     {/*<Pagiation productCount={productCount} productsPerPage={productBasketVM.PageSize} setPageNo={setPageNoHandler} pageNo={productBasketVM.PageNo}/>*/}
//                     <SortBy changeSortingOption={changeSortingOption}/>
//                 </div>
//                 <ProductsListing productBasketVM={productBasketVM} productPerRow={productPerRow} setProductCount={productCountHandler}/>
//                 {/*<Pagiation productCount={productCount} productsPerPage={productBasketVM.PageSize} setPageNo={setPageNoHandler} pageNo={productBasketVM.PageNo}/>*/}
                
//             </div>
//         </div>
//         <div className="text-danger">remove bootstrap dd and add it similar to product card</div>
//     </div>
// }

export default CategoryLanding;