import { useRef, useState } from "react";

export default function NewsLetter () {
    const emailRef = useRef(null)
    const [errorMsg, setErrorMsg] = useState("")

    const validateEmail = () => {
        var emailPatternCheck = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (emailRef.current.value == "") {
            setErrorMsg("Please Enter Email Id")
        } else if (!emailPatternCheck.test(emailRef.current.value)) {
            setErrorMsg("Please enter valid Email Id")
        } else {
            setErrorMsg("")
            return true
        }
        return false
    }

    const subscribeHandler = () => {
        console.log("subscribeHandler btn clicked")
        if (validateEmail()) {
            window.callApi({
                url: window.SaaS_User_Microservice_URL + "api/NewsLetter/NewsLetterSubscriptionJsonAPI",
                type: 'POST',
                isAsync: true,
                MicroserviceName: 'SaaS_Users_Microservice',
                contentType: 'application/json;charset=utf-8',
                headers: { "LanguageGuid": window.languageuid, "WebsiteGuid": window.websiteguid, "DefaultLanguageGuid": window.defaultlanguageguid },
                data: JSON.stringify({ EmailAddress: emailRef.current.value }),
                OnSuccess: ({ statusCode, data }) => {
                    let popupType = statusCode == "200" ? "Success" : "Warning";
                    window.popupV3({
                        title: popupType, content: data,
                        classes: "Subscribepopup", type: popupType,
                        actions: [{ text: "Ok", dismiss: true }]
                    });
                },
                OnError: (msg) => console.log("Newsletter function", msg)
            });
        }
    }

    return <div id="newsLetterFooter">
        <div className="newsletter_subheading">
            Sign up for exclusive updates, new arrivals &amp; insider only discounts
        </div>
        <div className="newsletter_form">
            <input id="NewsletterForm_footer" type="email" name="" className="field_input" aria-required="true" autoCorrect="off" autoCapitalize="off" placeholder="enter your email address" ref={emailRef} onBlur={validateEmail} />
            <button type="submit" className="button newsletter_form_button" id="Subscribe" onClick={subscribeHandler}>Submit</button>
        </div>
        {errorMsg !== "" && <div className="footer_msg error-text">{errorMsg}</div>}
    </div>
}