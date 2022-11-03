function useCallApi (options = {}) {

    

    return new Promise((resolve, reject) => {
        options["onSuccess"] = resolve;
        options["onError"] = reject;
        window.callApi()
    })
}

export default useCallApi;