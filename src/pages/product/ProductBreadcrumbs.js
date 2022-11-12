import React from "react";
import { Link } from "react-router-dom";
import useGetCategoryMenuData from "../../hooks/api/useGetCategoryMenuData";

const ProductBreadcrumbs = ({productData}) => {

    let {data: categoryList} = useGetCategoryMenuData();
    if (categoryList === undefined) return <></>
    
    let _categoryList = categoryList.map(c => {
        return (c.subCategories !== null)
            ? [c, c.subCategories].flat()
            : c;
    }).flat()

    let flatten = (c, list) => {
        list.push(c[0]);
        if (c[0].subcategories != null) {
            list = flatten(c[0].subcategories, list)
        }
        return list;
    }

    let collections = [];    
    if (productData.collections !== undefined) collections = flatten(productData.collections, []).map(_c => {
        return _categoryList.filter(x => x.collectionGuid === _c.collectionguid)[0]
    });
    //console.log(collections)


    return <ul className="breadcrumbs">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {collections.map((c,k) => <li className="breadcrumb-item" key={k}>
            <Link state={c} to={"/category/" + c.alias + "/" + c.collectionGuid}>{c.collectionName}</Link>
        </li>)}
        <li className="breadcrumb-item">{productData.productname}</li>
    </ul>
}

export default React.memo(ProductBreadcrumbs);