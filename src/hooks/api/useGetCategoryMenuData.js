import { useQuery } from "@tanstack/react-query";

export default function useGetCategoryMenuData () {
    return useQuery({
        queryKey: ['categoryMenuData'],
        queryFn: async () => new Promise((resolve, reject) => {
            window.callApi({
                url: window.SaaS_ProductListing_Microservice_URL + "api/Products/GetCategoryMenu",
                type: "GET",
                headers: { "WebsiteGuid": window.websiteguid, "LanguageGuid": window.languageuid },
                isAsync: true,
                MicroserviceName: 'SaaS_ProductListing_Microservice',
                contentType: "application/json;charset=utf-8",
                OnError: reject,
                OnSuccess: ({data}) => {
                    resolve(data)
                }
            });
        }),        
        staleTime: 1000 * 60 * 10 // 10 minutes
    })
}