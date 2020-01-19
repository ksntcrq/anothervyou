import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import styles from "./Nav.module.scss";
import { Link, changeLocale } from "gatsby-plugin-intl";
import classNames from "classnames";
import { FormattedMessage } from "react-intl";

function Nav({ className, pageTranslations = [] }) {
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
                <Link className={styles.brand} to="/">
                    {data.site.siteMetadata.title}
                </Link>
            </div>
            {pageTranslations.length > 0 && (
                <ul className={styles.menu}>
                    {pageTranslations.map(({ langKey, slug }) => (
                        <li key={langKey}>
                            <button
                                className={styles.btnLink}
                                onClick={() => changeLocale(langKey, slug)}
                            >
                                <FormattedMessage id={`read_in_${langKey}`} />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}

Nav.propTypes = {
    className: PropTypes.string,
    pageTranslations: PropTypes.arrayOf(
        PropTypes.shape({
            langKey: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
        })
    ),
};

export default Nav;
