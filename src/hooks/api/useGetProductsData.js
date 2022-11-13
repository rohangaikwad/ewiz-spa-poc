import { createQuery, useQueryClient } from "@tanstack/solid-query";
import ObjKeysToLowerCase from "./../../utils/ObjKeysToLowerCase";

export default function useGetProductsData ({wishlistCount = 0, productBasketVM}) {
    let queryClient = useQueryClient();

    return createQuery(
        () => ['getProducts', productBasketVM.CategoryGuid],
        async () => new Promise((resolve, reject) => {
            window.callApi({
                url: window.SaaS_ProductListing_Microservice_URL + 'api/Products/GetProductsWithOptimizeSearchNew',
                type: 'Post',
                headers: { "WebSiteGuid": window.websiteguid, 'LanguageGuid': window.languageuid, 'CurrencyGuid': window.currencyguid, 'CookieDetails': window.cookiedetails, "WishlistCount": wishlistCount },
                data: JSON.stringify(productBasketVM),
                isAsync: true,
                MicroserviceName: 'SaaS_ProductListing_Microservice',
                contentType: "application/json;charset=utf-8",
                OnError: reject,
                OnSuccess: (res) => {
                    if (res.statusCode === 500) reject(res);
                    else resolve(res.data);
                }
            });
        }),
        {                
            staleTime: 1000 * 60 * 10, // 10 minutes
            onSuccess: (res) => {
                res.forEach(p => {
                    const existingData = queryClient.getQueryData(['ph-product', p.productGuid]);
                    if (typeof existingData === "undefined") {
                        queryClient.setQueryData(
                            ['ph-product', p.productGuid],
                            ObjKeysToLowerCase(p),
                            { staleTime: 0 }
                        )
                    }
                })
            }
        }
    );
    
    // return createQuery({
    //     queryKey: ['getProducts', productBasketVM.CategoryGuid],
    //     queryFn: async () => new Promise((resolve, reject) => {
    //         window.callApi({
    //             url: window.SaaS_ProductListing_Microservice_URL + 'api/Products/GetProductsWithOptimizeSearchNew',
    //             type: 'Post',
    //             headers: { "WebSiteGuid": window.websiteguid, 'LanguageGuid': window.languageuid, 'CurrencyGuid': window.currencyguid, 'CookieDetails': window.cookiedetails, "WishlistCount": wishlistCount },
    //             data: JSON.stringify(productBasketVM),
    //             isAsync: true,
    //             MicroserviceName: 'SaaS_ProductListing_Microservice',
    //             contentType: "application/json;charset=utf-8",
    //             OnError: reject,
    //             OnSuccess: (res) => {
    //                 if (res.statusCode === 500) reject(res);
    //                 else resolve(res.data);
    //             }
    //         });
    //     }),
    //     retry: 1,
    //     staleTime: 1000 * 60 * 10, // 10 minutes
    //     onSuccess: (res) => {
    //         res.forEach(p => {
    //             const existingData = queryClient.getQueryData(['ph-product', p.productGuid]);
    //             if (typeof existingData === "undefined") {
    //                 queryClient.setQueryData(
    //                     ['ph-product', p.productGuid],
    //                     ObjKeysToLowerCase(p),
    //                     { staleTime: 0 }
    //                 )
    //             }
    //         })
    //     }

    // })
}