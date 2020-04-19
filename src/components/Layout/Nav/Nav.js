import React from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery, Link } from "gatsby";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import { FormattedMessage, useIntl } from "react-intl";
import Dropdown from "../../Dropdown/Dropdown";
import dashify from "dashify";
import MobileMenu from "./MobileMenu/MobileMenu";

function Nav({ className, locale, pageTranslations = [] }) {
    const { site, destinations, types } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        logo
                    }
                }
                destinations: allMarkdownRemark(
                    sort: { fields: frontmatter___categories___destination }
                ) {
                    group(field: frontmatter___categories___destination) {
                        fieldValue
                    }
                }
                types: allMarkdownRemark(
                    sort: { fields: frontmatter___categories___type }
                ) {
                    group(field: frontmatter___categories___type) {
                        fieldValue
                    }
                }
            }
        `
    );

    const intl = useIntl();

    function formatCategoryItems(categoriesMarkdownRemark) {
        return categoriesMarkdownRemark.group.map(
            ({ fieldValue: destination }) => ({
                title: intl.formatMessage({ id: destination }),
                slug: `/${locale}/category/${dashify(
                    intl.formatMessage({ id: destination }),
                    { condense: true }
                )}`,
            })
        );
    }

    const formattedDestinations = formatCategoryItems(destinations);
    const formattedTypes = formatCategoryItems(types);

    return (
        <nav className={classNames(className, styles.nav)}>
            <div className={styles.brandWrapper}>
                <Link className={styles.brand} to={`/${locale}`}>
                    <span className={styles.title}>
                        {site.siteMetadata.title}
                    </span>
                    <span className={styles.logo}>
                        {site.siteMetadata.logo}
                    </span>
                </Link>
            </div>
            <Dropdown
                className={classNames(styles.menuItem, styles.category)}
                items={formattedDestinations}
                title={intl.formatMessage({ id: `destinations` })}
            />
            <Dropdown
                className={classNames(styles.menuItem, styles.category)}
                items={formattedTypes}
                title={intl.formatMessage({ id: `categories` })}
            />
            <div
                className={classNames(styles.menuItem, styles.wrapperForMobile)}
            >
                {pageTranslations.length > 0 && (
                    <div className={styles.menuItem}>
                        <ul className={styles.translations}>
                            {pageTranslations.map(({ langKey, slug }) => (
                                <li key={langKey}>
                                    <Link
                                        className={styles.translation}
                                        to={slug}
                                    >
                                        <FormattedMessage
                                            id={`read_in_${langKey}`}
                                        />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <MobileMenu
                    className={styles.menuItem}
                    formattedTypes={formattedTypes}
                    formattedDestinations={formattedDestinations}
                />
            </div>
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
