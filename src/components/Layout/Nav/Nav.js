import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery, Link } from "gatsby";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

function Nav({ className, locale, pageTranslations = [] }) {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );

    return (
        <nav className={classNames(className, styles.nav)}>
            <div className={styles.brandWrapper}>
                <Link className={styles.brand} to={`/${locale}`}>
                    {data.site.siteMetadata.title}
                </Link>
            </div>
            {pageTranslations.length > 0 && (
                <ul className={styles.menu}>
                    {pageTranslations.map(({ langKey, slug }) => (
                        <li key={langKey}>
                            <Link className={styles.btnLink} to={slug}>
                                <FormattedMessage id={`read_in_${langKey}`} />
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}

Nav.propTypes = {
    className: PropTypes.string,
    locale: PropTypes.string.isRequired,
    pageTranslations: PropTypes.arrayOf(
        PropTypes.shape({
            langKey: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        })
    ),
};

export default Nav;
