import React from "react";
import PropTypes from "prop-types";
import styles from "./ArticlePreview.module.scss";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "gatsby";

function ArticlePreview({ title, categories = {}, slug, excerpt }) {
    const intl = useIntl();
    return (
        <article>
            <header>
                <h2>
                    <Link to={`${slug}`}>{title}</Link>
                </h2>
            </header>
            <div>
                <p className={styles.excerpt}>{excerpt}</p>
                <span className={styles.readMore}>
                    <Link to={`${slug}`}>
                        <FormattedMessage id="continue_reading" />
                    </Link>
                </span>
            </div>
            {categories && (
                <footer className={styles.footer}>
                    <FormattedMessage id="posted_in" />{" "}
                    {Object.values(categories)
                        .map(category => intl.formatMessage({ id: category }))
                        .join(", ")}
                </footer>
            )}
        </article>
    );
}

ArticlePreview.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
};

export default ArticlePreview;
