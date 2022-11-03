import { Link, useParams, useLocation } from "react-router-dom";
import AllCategories from "./AllCategories";
import CategoryLanding from "./CategoryLanding";

const Category = () => {
    const {catName} = useParams();
    const {state: loc} = useLocation();
    //console.log(catName, loc)

    return <>
        {catName === undefined
            ? <AllCategories />
            : <CategoryLanding stateProps={loc} catName={catName}/>
        }
    </>
}

export default Category;