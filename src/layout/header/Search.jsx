import { createEffect, createSignal } from "solid-js";

const Search = () => {
    let searchRef;
    const [searchResultData, setSearchResultData] = createSignal(null);
    const [nlpStatus, setNlpStatus] = createSignal(false)
    const [noResult, setNoResult] = createSignal(false)
    const [showSuggestion, setShowSuggestion] = createSignal(false)
    const [suggestionData, setSuggestionData] = createSignal(null)
    const [enableCK, setEnableCK] = createSignal(true)
    const [correctKey, setCorrectKey] = createSignal([])

    createEffect(() => {
        if (searchResultData()) {
            console.log("search suggestion", searchResultData()[0].suggestion.split('|'))
            console.log("search correct word", searchResultData()[0].correctedWords.split('|'))
            if (showSuggestion() && searchResultData()[0].suggestion != null) {
                setSuggestionData(searchResultData()[0].suggestion.split('|'))
            }

            if (enableCK() && searchResultData()[0].correctedWords !== "") {
                setCorrectKey(searchResultData()[0].correctedWords.split('|'))
            } else {
                setCorrectKey([])
            }
        }
    })

    const resetData = () => {
        setNlpStatus(false)
        setSearchResultData(null)
        setCorrectKey([])
        setSuggestionData([])
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

    return <div class="search-container">
        <div class="searchWrapper">
            <input type="search" placeholder="Search" class="nlpSearch_input" name="search" ref={searchRef} onChange={handleUpdateInput} />
            <button class="searchWrapperBtn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                    <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
                </svg>
            </button>
        </div>
        {(noResult() || suggestionData() != null) && <div class={`container nlpSearchWrapper slow`}>
            <div class="suggestionListWrapper">
                {correctKey().length > 0 &&
                    <>
                        <div class="title-wrapper">
                            <h3 class="search-title">  Did you mean <span class="did-you-key-text">  </span> </h3>
                            <div class="close-search"></div>
                        </div>
                        <ul class="suggestionList">
                            {correctKey().map((obj, id) => {
                                console.log(obj)
                                return <li onClick={() => handleSuggestion} id={obj}>{obj}</li>
                            })}
                        </ul>
                    </>
                }
                <h3>Suggestions</h3>
                <ul class="suggestionsList">
                    {suggestionData() != null && suggestionData().map((obj, i) => {
                        return <li onClick={() => handleSuggestion} id={obj}>{obj}</li>
                    })}
                </ul>
            </div>
            {searchResultData() != null && <div class="searchProducts">
                <ul class="productSuggestWrapper">
                    {searchResultData().map((obj, id) => <li key={id}>
                        <div className='productDetailsWrapper'>
                            <a class="searchImage" href={`${window.location.origin}/product/${obj.encodedProductName}/${obj.productCode}`}>
                                <div class="productImage"><img data-src={obj.imageUrl} class="lazyload" alt="Product Image" style={{}} /></div>
                                <div class="productContent" id={`${obj.encodedProductName}/${obj.productCode}`}>
                                    <div class="productName">{obj.productName}</div>
                                    <div class="search-price-wrapper">
                                        <strike class="strikePrice">
                                            {obj.price !== obj.minPrice && obj.price !== 0 && <span class="currencySymbol" >{obj.price}</span>}
                                        </strike>
                                        <p class="productPrice" id={obj.productCode}>
                                            <span class="currencySymbol"> </span> {obj.minPrice.toLocaleString('en-IN')}
                                        </p>

                                    </div>

                                    <button class="mobile-btn" onClick={() => redirectToDetail(obj)}>Buy</button>
                                </div>
                            </a>
                        </div>
                    </li>)}
                </ul>
            </div>}
            {noResult() && < div>No Result Found</div>}
        </div>}

    </div>
}

export default Search;