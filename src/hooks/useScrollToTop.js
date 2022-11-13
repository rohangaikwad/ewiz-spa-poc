import { createEffect } from "solid-js";

export default function useScrollToTop() {
    createEffect(() => {
        window.scrollTo({
            top: 0, 
            behavior: "auto"
        })
    })
}