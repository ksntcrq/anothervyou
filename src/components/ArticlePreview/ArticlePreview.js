import React from "react";
import PropTypes from "prop-types";
import styles from "./ArticlePreview.module.scss";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { Link } from "gatsby";

function ArticlePreview({ title, categories = {}, slug, excerpt, date }) {
    const intl = useIntl();
    return (
        <article className={styles.article}>
            <header>
                <h2 className={styles.title}>
                    <Link to={`${slug}`}>{title}</Link>
                </h2>
                <div className={styles.metadata}>
                    <time>
                        <FormattedDate
                            value={date}
                            year="numeric"
                            month="long"
                            day="numeric"
                        />
                    </time>
                    {categories &&
                        " • " +
                            Object.values(categories)
                                .map(category =>
                                    intl.formatMessage({ id: category })
                                )
                                .join(", ")}
                </div>
            </header>
            <div className={styles.text}>
                <p className={styles.excerpt}>{excerpt}</p>
                <span className={styles.readMore}>
                    <Link to={`${slug}`}>
                        <FormattedMessage id="continue_reading" />
                    </Link>
                </span>
            </div>
        </article>
    );
}

ArticlePreview.propTypes = {
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    categories: PropTypes.object,
};

export default ArticlePreview;
