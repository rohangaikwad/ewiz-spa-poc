import { Link } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductCard from "../../components/productCard";
import useGetAllDataByCollection from "../../hooks/api/useGetAllDataByCollection";
import useGetSlideshowData from "../../hooks/api/useGetSlideshowData";
import PlaceholderImageURL from "../../utils/PlaceholderImageURL";

import "swiper/css";
import "./home.scss";

const onImgError = (c) => {
    c.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Crect width='280' height='280' fill='%23cccccc'/%3E%3C/svg%3E";
}

const defaultImage = "https://d3lhatfimi1ec.cloudfront.net/8FFB58E5-3928-4769-87FF-B0BAE8E8F939/StaticImages/default.png"

const MainSlideshow = ({ bannerGuid }) => {
    const {data: slideshowData, isError, isSuccess} = useGetSlideshowData({ guid: bannerGuid });

    if (isError || !isSuccess) return <></>

    return (
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          //onSlideChange={() => console.log('slide change')}
          //onSwiper={(swiper) => {console.log(swiper)}}
        >
            {slideshowData.slideShowDetails.slideShowImages.map((slide, i) => <SwiperSlide key={slide.slideShowImageGuid}>
                <Link to={slide.navigateUrl.replace("https://demo.ewizcommerce.com", "")}>
                    <img alt={slide.altText} className="lazyload" src={PlaceholderImageURL(1903, 969, "#ffffff")} data-src={slide.imageURL} />
                </Link>
            </SwiperSlide>)}
        </Swiper>
    );

}

const CategoryCarousel = ({ showCategoryDescription, categoryList }) => {

    if (categoryList == null) return <></>

    return (
        <div className="container categoryCarouselWrapper">
            <div className="categoryCarousel owl-carousel">
                {categoryList != null && categoryList.map((category) => {
                    const imageURL = window.Amazon_CDNUrl + "/" + window.websiteguid + "/Collections/Default/" + category.categoryImageURL;
                    const categoryLink = "/" + category.categoryURL.split("/").pop();
                    return <div className="item" categoryName={category.collectionName}>

                        <div className="imageTitle">
                            <Link to={categoryLink}>
                                <img className="lazyload ls-is-cached img-fluid" src={defaultImage} data-src={imageURL} alt={category.collectionName} onError={(t) => onImgError(t)} />
                            </Link>
                            <div className="categoryNameWrapper">
                                <Link to={categoryLink}>{category.collectionName}</Link>
                            </div>
                        </div>
                        {showCategoryDescription && <div className="categoryData">
                            <h2 className="categoryyTitle">{category.collectionName}</h2>
                            <p dangerouslySetInnerHTML={{ __html: category.descriptionText }} />
                            <Link to={categoryLink} className="btn btn-primary">shop now</Link>
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

    return <div className="banner2">
        <a href={bannerData.redirectionLink}>
            <img className="img-fluid lazyload" src={PlaceholderImageURL(1903, 969, "#ffffff")} data-src={bannerData.bannerLink} alt={bannerData.bannerTitle} width="100%" onError={(t) => onImgError(t)} />
        </a>
    </div>
}

/*product section*/
const ProductSection = ({ sectionName, sectionTitle, isCarousel }) => {
    const [carouselUniqueId] = useState(Math.floor(Math.random() * 90 + 10));

    const {data: collectionData, isError, isSuccess} = useGetAllDataByCollection({sectionName});

    if (isError || !isSuccess) return <></>

    return (
        <div className="container section_wrapper">
            <div className="title-main-wrapper">
                <h3 className="title">
                    <span>{sectionTitle}</span>
                </h3>
                <a className="view_all" href={window.location.origin + "/category/" + sectionName}>
                    View All
                </a>
            </div>
            <div className={`product-main-wrapper ${isCarousel ? "owl-carousel carousel" + carouselUniqueId : ""}`} >
                {collectionData.productnewvm.map((product, i) => <ProductCard productData={product} key={product.productGuid} />)}
            </div>
        </div>
    )
}
/*product section*/

const HomePage = () => {
    return <>
        <div className="container"><MainSlideshow bannerGuid="5df73294-605a-45ee-9a72-fcfc57d2cabb" /></div>
        <CategoryCarousel showCategoryDescription={false} />
        <ProductSection sectionName="new-arrival" sectionTitle="NEW ARRIVALS" isCarousel={false} />
        <SingleBanner />
        <ProductSection sectionName="best-sellers" sectionTitle="TRENDING NOW" isCarousel={true} />
        <CategoryCarousel showCategoryDescription={true} />
    </>
}

export default HomePage;