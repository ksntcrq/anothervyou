import React from "react";
import Layout from "../../components/Layout/Layout";
import { useIntl } from "react-intl";
import SEO from "../../components/SEO/SEO";
import styles from "../templates.module.scss";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";

export default ({
    pageContext: { locale, category },
    data: { postsMarkdownRemark },
    location,
}) => {
    const intl = useIntl();
    const translatedCategory = intl.formatMessage({
        id: category,
    });
    return (
        <Layout locale={locale}>
            <SEO
                title={translatedCategory}
                description={intl.formatMessage(
                    { id: `category_description` },
                    {
                        number: postsMarkdownRemark.totalCount,
                        tag: translatedCategory,
                    }
                )}
                tags={[category]}
                locale={locale}
                langKey={locale}
                location={location}
            />
            <h1>{translatedCategory}</h1>
            <ul className={styles.unstyledList}>
                {postsMarkdownRemark.edges.map(({ node }) => (
                    <li key={node.id}>
                        <ArticlePreview
                            title={node.frontmatter.title}
                            categories={node.frontmatter.categories}
                            date={node.frontmatter.date}
                            slug={node.fields.slug}
                            excerpt={node.excerpt}
                            locale={locale}
                        />
                    </li>
                ))}
            </ul>
        </Layout>
    );
};
