import React from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "../../../.cache/gatsby-browser-entry";

export default ({
    title,
    description,
    author,
    locale,
    langKey,
    pageTranslations = [],
    tags = [],
}) => {
    return (
        <Helmet>
            <html lang={langKey} />
            <title>
                {title} - {author}
            </title>
            <meta name="description" content={description} />
            <meta name="author" content={author} />
            <meta name="keywords" content={tags.join(",")} />
            <meta
                name="robots"
                content={
                    locale === langKey ? "index,follow" : "noindex,nofollow"
                }
            />
            {pageTranslations.map(({ slug, langKey }) => (
                <link
                    key={langKey}
                    rel="alternate"
                    href={withPrefix(slug)}
                    hreflang={langKey}
                />
            ))}
        </Helmet>
    );
};
