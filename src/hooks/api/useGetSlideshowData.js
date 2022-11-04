import { useQuery } from "@tanstack/react-query";

export default function useGetSlideshowData ({guid}) {
    return useQuery({
        queryKey: ['slideshow', guid],
        queryFn: async () => new Promise((resolve, reject) => {
            window.callApi({
                url: window.SaaS_GlobalElements_Microservice_URL + "api/SlideShows/GetSlideShowJson/" + guid,
                type: "GET",
                headers: { "LanguageGuid": window.languageuid, "WebsiteGuid": window.websiteguid, "WebsiteURL": window.WebsiteURL },
                isAsync: true,
                MicroserviceName: "SaaS_GlobalElements_Microservice",
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