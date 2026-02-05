// Routes for extra pages
import ContactPage from "./ContactPage"
import FAQPage from "./FAQPage"
import AboutPage from "./About"

export default [
    {
        path: "contact",
        element: <ContactPage />
    },
    {
        path: "faq",
        element: <FAQPage />
    },
    {
        path: "about",
        element: <AboutPage />
    }
]