import { Link } from "react-router-dom";
import useGetCategoryMenuData from "../../hooks/api/useGetCategoryMenuData";

const CategoryMenu = () => {
    
    const {data: categoryList} = useGetCategoryMenuData();

    const ToggleSubMenu = (evt) => {
        evt.preventDefault()
        evt.target.classList.toggle("clicked")
        evt.target.parentElement.nextElementSibling.classList.toggle("show_sublist_menu")
    }

    if (categoryList == null) return <>no {JSON.stringify(categoryList)}</>

    return <ul className="cat-list">
        {categoryList.map((category, i) => <li key={category.collectionName} className={"cat-item " + (category.subCategories != null ? "hasSubmenu" : "")}>
            <Link to={"/category/" + category.categoryURL.split("/").pop()} state={category} className={`${category.subCategories != null ? "hasArrow" : ""}`}>
                {category.collectionName}
                {category.subCategories != null && <span className="arrow" onClick={(evt) => ToggleSubMenu(evt)}></span>}
            </Link>
            {category.subCategories != null && <ul className="subcat-list">
                {category.subCategories.map((subCategory) => <li className="subcat-item" key={subCategory.collectionName}>
                    <Link state={subCategory} to={"/category/" + subCategory.categoryURL.split("/").pop()}>
                        {subCategory.collectionName}
                    </Link>
                </li>)}
            </ul>}
        </li>)}
    </ul>
}

export default CategoryMenu;