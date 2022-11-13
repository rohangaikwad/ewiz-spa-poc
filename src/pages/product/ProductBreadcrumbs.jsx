import { Link } from "@solidjs/router";
import { createSignal, Match } from "solid-js";
import useGetCategoryMenuData from "../../hooks/api/useGetCategoryMenuData";

const ProductBreadcrumbs = (props) => {

    const [menuQuery,] = createSignal(useGetCategoryMenuData());

    const Collections = () => {
        let categoryList = menuQuery().data.map(c => {
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

        let collections = flatten(props.query().data.collections, []).map(_c => {
            return categoryList.filter(x => x.collectionGuid === _c.collectionguid)[0]
        });

        return collections.map(c => <li class="breadcrumb-item">
            <Link state={c} href={"/category/" + c.alias + "/" + c.collectionGuid}>{c.collectionName}</Link>
        </li>)
    }


    return <ul class="breadcrumbs">
        <li class="breadcrumb-item"><Link href="/">Home</Link></li>
        <Switch>
            <Match when={menuQuery().isSuccess}>
                <Collections />
            </Match>
        </Switch>
        {/* {collections.map((c,k) => <li class="breadcrumb-item" key={k}>
            <Link state={c} href={"/category/" + c.alias + "/" + c.collectionGuid}>{c.collectionName}</Link>
        </li>)} */}
        <li class="breadcrumb-item">{props.query().data.productname}</li>
    </ul>
}

export default ProductBreadcrumbs;