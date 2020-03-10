import React from "react";
import { Helmet } from "react-helmet";
import { withPrefix } from "../../../.cache/gatsby-browser-entry";
import useSiteMetadata from "../../hooks/useSiteMetadata";

export default ({
    title = null,
    description,
    locale,
    langKey,
    location,
    pageTranslations = [],
    tags = [],
    imagePathname = null,
}) => {
    const { title: siteTitle, author, url: siteUrl } = useSiteMetadata();
    return (
        <Helmet>
            <html lang={langKey} />
            <title>
                {title || siteTitle} - {author}
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
            <meta
                property="og:title"
                content={(title || siteTitle) + " - " + author}
            />
            <meta property="og:description" content={description} />
            {imagePathname && (
                <meta property="og:image" content={siteUrl + imagePathname} />
            )}
            <meta property="og:url" content={siteUrl + location.pathname} />
            <meta name="twitter:card" content="summary_large_image" />
            {pageTranslations.map(({ slug, langKey }) => (
                <link
                    key={langKey}
                    rel="alternate"
                    href={siteUrl + withPrefix(slug)}
                    hreflang={langKey}
                />
            ))}
        </Helmet>
    );
};
