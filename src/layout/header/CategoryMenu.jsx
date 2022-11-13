import { Link } from "@solidjs/router";
import { Match, Switch } from 'solid-js';
import useGetCategoryMenuData from "../../hooks/api/useGetCategoryMenuData";

const CategoryMenu = () => {
    
    const query = useGetCategoryMenuData();
    //console.log(categoryList, isSuccess, isError)

    const ToggleSubMenu = (evt) => {
        evt.preventDefault()
        evt.target.classList.toggle("clicked")
        evt.target.parentElement.nextElementSibling.classList.toggle("show_sublist_menu")
    }

    return (
        <Switch>
            <Match when={query.isLoading}>Loading...</Match>
            <Match when={query.isError}>Error: {query.error.message}</Match>
            <Match when={query.isSuccess}>
                <ul class="cat-list">
                    {query.data.map((category, i) => <li key={category.collectionName} class={"cat-item " + (category.subCategories != null ? "hasSubmenu" : "")}>
                        <Link href={"/category/" + category.alias + "/" + category.collectionGuid} state={category} class={`${category.subCategories != null ? "hasArrow" : ""}`}>
                            {category.collectionName}
                            {category.subCategories != null && <span class="arrow" onClick={(evt) => ToggleSubMenu(evt)}></span>}
                        </Link>
                        {category.subCategories != null && <ul class="subcat-list">
                            {category.subCategories.map((subCategory) => <li class="subcat-item" key={subCategory.collectionName}>
                                <Link state={subCategory} href={"/category/" + subCategory.alias + "/" + subCategory.collectionGuid}>
                                    {subCategory.collectionName}
                                </Link>
                            </li>)}
                        </ul>}
                    </li>)}
                </ul>
            </Match>
        </Switch>
    )
}

export default CategoryMenu;