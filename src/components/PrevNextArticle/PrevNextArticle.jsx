import React from "react";
import PropTypes from "prop-types";
import styles from "./PrevNextArticle.module.scss";
import { Link } from "gatsby";
import { FormattedMessage } from "react-intl";

function PrevNextArticle({ prev, next }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.prevWrapper}>
                {prev && (
                    <>
                        <FormattedMessage id="previous_article" />
                        <div className={styles.title}>
                            <Link to={prev.fields.slug}>
                                {prev?.frontmatter.title}
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.nextWrapper}>
                {next && (
                    <>
                        <FormattedMessage id="next_article" />
                      <div className={styles.title}>
                            <Link to={next.fields.slug}>
                                {next.frontmatter.title}
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

PrevNextArticle.propTypes = {
    prev: PropTypes.shape({
        frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired,
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
        }).isRequired,
    }),
    next: PropTypes.shape({
        frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
        }).isRequired,
        fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
        }).isRequired,
    }),
};

export default PrevNextArticle;
