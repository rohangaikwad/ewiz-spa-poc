import { useEffect, useRef, useState } from "react";

const Search = () => {
    const searchRef = useRef(null)
    const [searchResultData, setSearchResultData] = useState(null);
    const [nlpStatus, setNlpStatus] = useState(false)
    const [noResult, setNoResult] = useState(false)
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [suggestionData, setSuggestionData] = useState(null)
    const [enableCK, setEnableCK] = useState(true)
    const [correctKey, setCorrectKey] = useState([])

    useEffect(() => {
        if (searchResultData) {
            console.log("search suggestion", searchResultData[0].suggestion.split('|'))
            console.log("search correct word", searchResultData[0].correctedWords.split('|'))
            if (showSuggestion && searchResultData[0].suggestion != null) {
                setSuggestionData(searchResultData[0].suggestion.split('|'))
            }

            if (enableCK && searchResultData[0].correctedWords !== "") {
                setCorrectKey(searchResultData[0].correctedWords.split('|'))
            } else {
                setCorrectKey([])
            }
        }
    }, [searchResultData, enableCK, showSuggestion])

    const resetData = () => {
        setNlpStatus(false)
        setSearchResultData(null)
        setCorrectKey([])
        setSuggestionData(null)
    }

    const handleUpdateInput = (eve) => {
        console.log(searchRef.current.value, eve)
        let reg = /^[a-zA-Z ]*$/;
        const searchedContent = searchRef.current.value;
        if (reg.test(searchedContent)) {
            setShowSuggestion(true)
            let count = 0;
            if (searchedContent.length === 0) {
                resetData()
                setNoResult(false)
            }
            if (searchedContent.length === 1 || !searchedContent.length % 2) {
                console.log("waiting for keyword")
            } else {
                console.log("searching", searchedContent)
                if (searchedContent.length !== 0) {
                    nlpSearch(searchedContent, eve.keyCode)
                } else {
                    setNlpStatus(false)

                }
            }
        }
    }

    const nlpSearch = (searchedContent, eveKeyCode) => {
        window.callApi({
            url: window.SaaS_ProductListing_Microservice_URL + `api/Products/GetSearchResultsUsingCodeExpressionAI?categoryGuid=&Keyword=${searchedContent}&PricingRange=`,
            type: 'GET',
            headers: { "LanguageGuid": window.languageuid, "WebsiteGuid": '09CFB485-1362-4052-B3ED-6A28BD485B8A', "CurrencyGuid": window.currencyguid, CookieDetails: window.cookiedetails },
            isAsync: true,
            MicroserviceName: 'SaaS_productlisting_Microservice',
            contentType: "application/json;charset=utf-8",
            OnError: (msg) => console.log("nplSearch Function Error", msg),
            OnSuccess: ({ message, data }) => {
                console.log("nlpSearch result", message, data)
                if (data !== "" && message === "Success") {
                    setNoResult(false)
                    setSearchResultData(data)
                } else {
                    setNoResult(true)
                    resetData()
                }
            }
        });
    }

    const redirectToDetail = ({ encodedProductName, productCode }) => {
        window.location.href = window.location.origin + "/product/" + encodedProductName + "/" + productCode
    }

    const handleSuggestion = (event) => {
        setShowSuggestion(false)
        setEnableCK(false)
        nlpSearch(event.target.id)
    }

    return <div className="search-container">
        <div className="searchWrapper">
            <input type="search" placeholder="Search" className="nlpSearch_input" name="search" ref={searchRef} onChange={handleUpdateInput} />
            <button className="searchWrapperBtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
                </svg>
            </button>
        </div>
        {(noResult || suggestionData != null) && <div className={`container nlpSearchWrapper slow`}>
            <div className="suggestionListWrapper">
                {correctKey.length > 0 &&
                    <>
                        <div className="title-wrapper">
                            <h3 className="search-title">  Did you mean <span className="did-you-key-text">  </span> </h3>
                            <div className="close-search"></div>
                        </div>
                        <ul className="suggestionList">
                            {correctKey.map((obj, id) => {
                                console.log(obj)
                                return <li onClick={() => handleSuggestion} id={obj}>{obj}</li>
                            })}
                        </ul>
                    </>
                }
                <h3>Suggestions</h3>
                <ul className="suggestionsList">
                    {suggestionData.map((obj, i) => {
                        return <li onClick={() => handleSuggestion} id={obj}>{obj}</li>
                    })}
                </ul>
            </div>
            {searchResultData != null && <div className="searchProducts">
                <ul className="productSuggestWrapper">
                    {searchResultData.map((obj, id) => <li key={id}>
                        <div className='productDetailsWrapper'>
                            <a className="searchImage" href={`${window.location.origin}/product/${obj.encodedProductName}/${obj.productCode}`}>
                                <div className="productImage"><img data-src={obj.imageUrl} className="lazyload" alt="Product Image" style={{}} /></div>
                                <div className="productContent" id={`${obj.encodedProductName}/${obj.productCode}`}>
                                    <div className="productName">{obj.productName}</div>
                                    <div className="search-price-wrapper">
                                        <strike className="strikePrice">
                                            {obj.price !== obj.minPrice && obj.price !== 0 && <span className="currencySymbol" >{obj.price}</span>}
                                        </strike>
                                        <p className="productPrice" id={obj.productCode}>
                                            <span className="currencySymbol"> </span> {obj.minPrice.toLocaleString('en-IN')}
                                        </p>

                                    </div>

                                    <button className="mobile-btn" onClick={() => redirectToDetail(obj)}>Buy</button>
                                </div>
                            </a>
                        </div>
                    </li>)}
                </ul>
            </div>}
            {noResult && < div>No Result Found</div>}
        </div>}

    </div>
}

export default Search;