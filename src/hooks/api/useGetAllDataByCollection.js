import { useQuery } from "react-query";

export default function useGetAllDataByCollection ({sectionName}) {
    return useQuery({
        queryKey: ['collectionData', sectionName],
        queryFn: async () => new Promise((resolve, reject) => {
            var Filterdata = { AliasName: sectionName, PageNo: "1", PageSize: "10", sort: "Popularity_asc" }
            window.callApi({
                url: window.SaaS_ProductListing_Microservice_URL + "api/Products/GetAllDataBycollection",
                type: 'POST',
                data: JSON.stringify(Filterdata),
                headers: { "LanguageGuid": window.languageuid, "WebsiteGuid": window.websiteguid, "CookieDetails": window.cookiedetails, "CurrencyGuid": window.currencyguid, "WebsiteURL": window.WebsiteURL },
                isAsync: true,
                MicroserviceName: 'SaaS_Product_Microservice',
                contentType: "application/json;charset=utf-8",
                OnError: reject,
                OnSuccess: (res) => {
                    if (res.statusCode == 500) reject(res);
                    else resolve(res.data);
                }
            });
        }),
        retry: 0,
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}