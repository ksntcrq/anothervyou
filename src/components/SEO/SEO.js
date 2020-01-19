import React from "react";
import { Helmet } from "react-helmet";

export default ({ title, description, locale, langKey, tags = [] }) => {
    return (
        <Helmet>
            <html lang={langKey} />
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={tags.join(",")} />
            <meta
                name="robots"
                content={
                    locale === langKey ? "index,follow" : "noindex,nofollow"
                }
            />
        </Helmet>
    );
};
