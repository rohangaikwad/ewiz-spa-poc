import { createQuery, useQueryClient } from "@tanstack/solid-query";
import ObjKeysToLowerCase from "../../utils/ObjKeysToLowerCase";

export default function useGetAllDataByCollection ({sectionName}) {
    const queryClient = useQueryClient();

    return createQuery(
        () => ['collectionData', sectionName],
        async () => new Promise((resolve, reject) => {
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
                    if (res.statusCode === 500) reject(res);
                    else resolve(res.data[0]);
                }
            });
        }),
        {
            retry: 0,
            staleTime: 1000 * 60 * 10, // 10 minutes
            onSuccess: (data) => {
                data.productnewvm.forEach(p => {
                    const existingData = queryClient.getQueryData(['ph-product', p.productGuid]);
                    if (typeof existingData === "undefined") {
                        queryClient.setQueryData(
                            ['ph-product', p.productGuid],
                            ObjKeysToLowerCase(p),
                            { staleTime: 0 }
                        )
                    }
                })
            },
            placeholderData: {
                "collectionName": " ",
                "alias": "",
                "productCount": 6,
                "collectionType": "Section",
                "categoryBanner": null,
                "categoryBannerImageAlt": null,
                "categoryDescription": "<p>Freshen up your marketing mix with our latest releases!</p>\n",
                "productnewvm": [
                    { "productGuid": "ich-0", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-1", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-2", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-3", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-4", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-5", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-6", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                    { "productGuid": "ich-7", "productcode": "-", "productname": " ", "productImageUrl": "", "detailURL": "", "price": 0.0, "strikePrice": 0.0 },
                ]
            }
        }
    )
}