import { Link } from "@solidjs/router";
import { Match, Switch } from 'solid-js';
import useGetCategoryMenuData from "../../hooks/api/useGetCategoryMenuData";
import './categories.scss';

export default function AllCategories () {

    const query = useGetCategoryMenuData();
    console.log("all categories")
    
    const defaultSVGImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='%23cccccc'/%3E%3C/svg%3E";

    return <div class="container">
        <div class="breadCrumbWrapper">
            <ul class="breadcrumb">
                <li class="breadcrumb-item"><Link href="/">Home</Link></li>
                <li class="breadcrumb-item active">Categories</li>
            </ul>
        </div>
        <h1>Categories</h1>
        <div id="category-list">
            <Switch>
                <Match when={query.isLoading}>Loading...</Match>
                <Match when={query.isError}>Error: {query.error.message}</Match>
                <Match when={query.isSuccess}>
                    {query.data.map((cat, i) => <div class="main-category">
                        <Link state={cat} href={"/category/" + cat.alias + "/" + cat.collectionGuid}>
                            <div class="category-image">
                                <img class="lazyload" src={defaultSVGImage} data-src={window.cdnURL + "/" + window.websiteguid + "/Collections/Default/" + cat.categoryImageURL} alt={cat.collectionName} width="250" height="250" />
                            </div>
                            <div class="subCategory-name-count">
                                <h3>{cat.collectionName} <span>({cat.productCount})</span></h3>
                            </div>
                        </Link>
                        {cat.subCategories && cat.subCategories.length > 0 && <ul>
                            {cat.subCategories.map((subCat,j) => <li key={j}>
                                <Link state={subCat} href={"/category/" + subCat.alias + "/" + subCat.collectionGuid}>
                                    <span>123{JSON.stringify(subCat.collectionName)}</span>
                                    {subCat.collectionName} <span>({subCat.productCount})</span>
                                </Link>
                            </li>)}
                        </ul>}

                    </div>)}
                </Match>
            </Switch>
        </div>
    </div>

}