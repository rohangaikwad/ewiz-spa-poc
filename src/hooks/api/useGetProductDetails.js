import { useQuery, useQueryClient } from "@tanstack/react-query";
import ObjKeysToLowerCase from "./../../utils/ObjKeysToLowerCase";

export default function useGetProductDetails ({productGuid, wishlistCount = 0, pProps}) {
    let queryClient = useQueryClient();
    
    return useQuery({
        queryKey: ['productDetails', productGuid],
        queryFn: async () => new Promise((resolve, reject) => {
            window.callApi({
                url: window.SaaS_ProductDetails_Microservice_URL + "api/Products/GetProductDetailJson/" + productGuid,
                type: 'GET',
                headers: { "LanguageGuid": window.languageuid, "WebsiteGuid": window.websiteguid, "WishlistCount": wishlistCount,
                "CookieDetails": window.cookiedetails },
                isAsync: true,
                MicroserviceName: 'SaaS_Product_Microservice',
                contentType: "application/json;charset=utf-8",
                OnError: reject,
                OnSuccess: (res) => {
                    if (res.statusCode === 500) reject(res);
                    else {
                        //setTimeout(() => {
                            resolve(ObjKeysToLowerCase({
                                ...res.Data.ProductData[0],
                                resources: res.Data.resources
                            }));
                        //}, 2000);
                    }
                }
            });
        }),
        retry: 1,
        staleTime: 1000 * 60 * 10, // 10 minutes
        placeholderData: () => {
            let data = typeof pProps !== "undefined" ? pProps : queryClient.getQueryData(['ph-product', productGuid]);
            data["collections"] = data.collectionguids;
            return data;
        }
    })
}