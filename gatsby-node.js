const path = require(`path`);
const dashify = require(`dashify`);

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const { name: langKey, relativeDirectory: namespace } = getNode(
            node.parent
        );
        const slug = dashify(node.frontmatter.title) || "";
        createNodeField({
            node,
            name: `langKey`,
            value: langKey,
        });
        createNodeField({
            node,
            name: `namespace`,
            value: namespace,
        });
        createNodeField({
            node,
            name: `slug`,
            value: `/${langKey}/${slug}`,
        });
    }
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;

    createRedirect({
        fromPath: "/",
        toPath: "/fr",
    });

    const result = await graphql(`
        {
            pagesRemark: allMarkdownRemark(
                filter: { frontmatter: { draft: { ne: true } } }
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        fields {
                            langKey
                            namespace
                            slug
                        }
                        frontmatter {
                            template
                            date
                            imageName
                        }
                    }
                }
            }
            typesGroup: allMarkdownRemark {
                group(field: frontmatter___categories___type) {
                    fieldValue
                    edges {
                        node {
                            fields {
                                langKey
                            }
                        }
                    }
                }
            }
            destinationsGroup: allMarkdownRemark {
                group(field: frontmatter___categories___destination) {
                    fieldValue
                    edges {
                        node {
                            fields {
                                langKey
                            }
                        }
                    }
                }
            }
        }
    `);
    result.data.pagesRemark.edges.forEach(({ node }) => {
        const template = capitalize(node.frontmatter.template);
        createPage({
            path: `${node.fields.slug}`,
            component: path.resolve(
                `./src/templates/${template}/${template}.js`
            ),
            context: {
                slug: node.fields.slug,
                locale: node.fields.langKey,
                namespace: node.fields.namespace,
                date: node.frontmatter.date,
                imageName: node.frontmatter.imageName,
            },
        });
    });
    result.data.typesGroup.group.forEach(
      createCategoryPages(createPage, `type`)
    );
    result.data.destinationsGroup.group.forEach(
        createCategoryPages(createPage, `destination`)
    );
};

function createCategoryPages(createPage, categoryKey) {
    const template = capitalize(categoryKey);
    return category => {
        category.edges.forEach(({ node }) => {
            const langKey = node.fields.langKey;
            const messages = require(`./src/intl/${langKey}.json`);
            const translatedTag = messages[category.fieldValue];
            createPage({
                path: `/${langKey}/category/${dashify(translatedTag)}`,
                component: path.resolve(`./src/templates/Category/${template}.js`),
                context: {
                    category: category.fieldValue,
                    locale: langKey,
                },
            });
        });
    };
}
