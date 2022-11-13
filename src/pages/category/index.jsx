import { useParams, useLocation, useRouteData } from "@solidjs/router";
import AllCategories from "./AllCategories";
import CategoryLanding from "./CategoryLanding";

const Category = () => {
    const params = useParams();
    const location = useLocation();
    console.log(params.collectionAlias);

    return <>
        {/* <pre>{JSON.stringify(location.state, null, 4)}</pre> */}
        {params.collectionAlias === undefined
            ? <AllCategories />
            : <CategoryLanding stateProps={location} params={params}/>
        }
    </>
}

export default Category;