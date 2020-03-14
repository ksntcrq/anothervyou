import React from "react";
import PropTypes from "prop-types";
import styles from "./ArticlePreview.module.scss";
import { FormattedDate, FormattedMessage, useIntl } from "react-intl";
import { Link } from "gatsby";
import dashify from "dashify";

function ArticlePreview({
    title,
    categories = {},
    slug,
    excerpt,
    date,
    locale,
}) {
    const intl = useIntl();
    return (
        <article className={styles.article}>
            <header>
                <h2 className={styles.title}>
                    <Link to={slug}>{title}</Link>
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
                    {categories && " • "}
                    {categories &&
                        Object.values(categories)
                            .map(category => (
                                <Link
                                    key={category}
                                    to={`/${locale}/category/${dashify(
                                        intl.formatMessage({ id: category })
                                    )}`}
                                >
                                    {intl.formatMessage({ id: category })}
                                </Link>
                            ))
                            .reduce((prev, curr) => [prev, `, `, curr])}
                </div>
            </header>
            <p className={styles.text}>
                {excerpt}
                <span className={styles.readMore}>
                    <Link to={`${slug}`}>
                        <FormattedMessage id="continue_reading" />
                    </Link>
                </span>
            </p>
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
