import { Link } from "@solidjs/router";
import ProductCard from "../../components/productCard";
import useGetAllDataByCollection from "../../hooks/api/useGetAllDataByCollection";
import useGetSlideshowData from "../../hooks/api/useGetSlideshowData";
import PlaceholderImageURL from "../../utils/PlaceholderImageURL";

import "./home.scss";
import { Switch } from "solid-js";

const onImgError = (c) => {
    c.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Crect width='280' height='280' fill='%23cccccc'/%3E%3C/svg%3E";
}

const defaultImage = "https://d3lhatfimi1ec.cloudfront.net/8FFB58E5-3928-4769-87FF-B0BAE8E8F939/StaticImages/default.png"

const MainSlideshow = ({ bannerGuid }) => {
    const slidershowQuery = useGetSlideshowData({ guid: bannerGuid });

    return <Switch>
        <Match when={slidershowQuery.isLoading}>
            <img width="100%" alt={"slide.altText"} src={PlaceholderImageURL(1903, 969, "#f1f1f1")} />
        </Match>
        <Match when={slidershowQuery.isSuccess}>
            <img width="100%" alt={slidershowQuery.data.slideShowDetails.slideShowImages[0].altText} src={slidershowQuery.data.slideShowDetails.slideShowImages[0].imageURL} />
        </Match>
    </Switch> 

}

const CategoryCarousel = ({ showCategoryDescription, categoryList }) => {

    if (categoryList == null) return <></>

    return (
        <div class="container categoryCarouselWrapper">
            <div class="categoryCarousel owl-carousel">
                {categoryList != null && categoryList.map((category) => {
                    const imageURL = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Collections/Default/" + category.categoryImageURL;
                    const categoryLink = "/" + category.categoryURL.split("/").pop();
                    return <div class="item" categoryName={category.collectionName}>

                        <div class="imageTitle">
                            <Link href={categoryLink}>
                                <img class="lazyload ls-is-cached img-fluid" src={defaultImage} data-src={imageURL} alt={category.collectionName} onError={(t) => onImgError(t)} />
                            </Link>
                            <div class="categoryNameWrapper">
                                <Link href={categoryLink}>{category.collectionName}</Link>
                            </div>
                        </div>
                        {showCategoryDescription && <div class="categoryData">
                            <h2 class="categoryyTitle">{category.collectionName}</h2>
                            <p dangerouslySetInnerHTML={{ __html: category.descriptionText }} />
                            <Link href={categoryLink} class="btn btn-primary">shop now</Link>
                        </div>}
                    </div>
                })}
            </div>
        </div>
    )
}

const SingleBanner = () => {
    const bannerData = {
        "bannerLink": window.Amazon_CDNUrl + "/" + window.websiteguid + "/SlideShows/Large/Slider-Banner-2_3238bf6d-ddcb-4f65-aadb-3eee730fb9c8_434342_3238bf6d-ddcb-4f65-aadb-3eee730fb9c8_002233.jpg?v=" + Date.now(),
        "bannerTitle": "dummy banner",
        "redirectionLink": window.location.origin + "/Category/New-Arrival"
    }

    return <div class="banner2" style="margin-top:30px">
        <a href={bannerData.redirectionLink}>
            <img class="img-fluid lazyload" src={PlaceholderImageURL(1903, 969, "#ffffff")} data-src={bannerData.bannerLink} alt={bannerData.bannerTitle} width="100%" onError={(t) => onImgError(t)} />
        </a>
    </div>
}

/*product section*/
const ProductSection = ({ sectionName, sectionTitle, isCarousel }) => {
    const carouselUniqueId = Math.floor(Math.random() * 90 + 10);

    const collectionQuery = useGetAllDataByCollection({sectionName});

    return <Switch>
        <Match when={collectionQuery.isSuccess}>
            <div class="container section_wrapper">
                <div class="title-main-wrapper">
                    <h3 class="title">
                        <span>{sectionTitle}</span>
                    </h3>
                    <a class="view_all" href={window.location.origin + "/category/" + sectionName}>
                        View All
                    </a>
                </div>
                <div class={`product-main-wrapper ${isCarousel ? "owl-carousel carousel" + carouselUniqueId : ""}`} >
                    {collectionQuery.data.productnewvm.map((product, i) => <ProductCard productData={product} key={product.productGuid} />)}
                </div>
            </div>
        </Match>
    </Switch>
}
/*product section*/

const HomePage = () => {
    return <>
        <div class="container"><MainSlideshow bannerGuid="5df73294-605a-45ee-9a72-fcfc57d2cabb" /></div>
        <CategoryCarousel showCategoryDescription={false} />
        <ProductSection sectionName="new-arrival" sectionTitle="NEW ARRIVALS" isCarousel={false} />
        <SingleBanner />
        <ProductSection sectionName="best-sellers" sectionTitle="TRENDING NOW" isCarousel={false} />
        <CategoryCarousel showCategoryDescription={true} />
    </>
}

export default HomePage;