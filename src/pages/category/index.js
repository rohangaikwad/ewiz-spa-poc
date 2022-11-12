import { useParams, useLocation } from "react-router-dom";
import AllCategories from "./AllCategories";
import CategoryLanding from "./CategoryLanding";

const Category = () => {
    const {collectionAlias, collectionGuid} = useParams();
    const {state: loc} = useLocation();
    //console.log(catName, loc)

    return <>
        {collectionAlias === undefined
            ? <AllCategories />
            : <CategoryLanding stateProps={loc} collectionAlias={collectionAlias} collectionGuid={collectionGuid}/>
        }
    </>
}

export default Category;