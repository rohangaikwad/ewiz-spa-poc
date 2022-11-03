import { Link } from "react-router-dom";
import useGetCategoryMenuData from "../../hooks/api/useGetCategoryMenuData";
import './categories.scss';

export default function AllCategories () {

    const {data: categoryList, isSuccess, isError} = useGetCategoryMenuData();
    
    const defaultSVGImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23cccccc'/%3E%3C/svg%3E";

    if (isError || !isSuccess) return <></>

    return <div className="container">
        <div className="breadCrumbWrapper">
            <ul className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Categories</li>
            </ul>
        </div>
        <h1>Categories</h1>
        <div id="category-list">
            {categoryList !== null && categoryList.map((cat, i) => <div key={i} className="main-category">
                <Link state={cat} to={cat.categoryURL.split("/").pop()}>
                    <div className="category-image">
                        <img className="lazyload" src={defaultSVGImage} data-src={window.cdnURL + "/" + window.websiteguid + "/Collections/Default/" + cat.categoryImageURL} alt={cat.collectionName} width="250" height="250" />
                    </div>
                    <div className="subCategory-name-count">
                        <h3>{cat.collectionName} <span>({cat.productCount})</span></h3>
                    </div>
                </Link>
                {cat.subCategories && cat.subCategories.length > 0 && <ul>
                    {cat.subCategories.map((subCat,j) => <li key={j}>
                        <Link state={subCat} to={subCat.categoryURL.split("/").pop()}>
                            <span>123{JSON.stringify(subCat.collectionName)}</span>
                            {subCat.collectionName} <span>({subCat.productCount})</span>
                        </Link>
                    </li>)}
                </ul>}

            </div>)}
        </div>
    </div>

}