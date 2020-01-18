const path = require(`path`);
const kebabCase = require(`kebab-case`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const { name: langKey, relativeDirectory: namespace } = getNode(
            node.parent
        );
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
    }
};

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions;
    deletePage(page);
    createPage({
        ...page,
        context: {
            ...page.context,
            locale: page.context.intl.language,
        },
    });
};

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            pagesRemark: allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        fields {
                            langKey
                            namespace
                        }
                        frontmatter {
                            tags
                            template
                            slug
                        }
                    }
                }
            }
            tagsGroup: allMarkdownRemark {
                group(field: frontmatter___tags) {
                    fieldValue
                }
            }
        }
    `);
    result.data.pagesRemark.edges.forEach(({ node }) => {
        createPage({
            path: `${node.frontmatter.slug}`,
            component: path.resolve(
                `./src/templates/${node.frontmatter.template}.js`
            ),
            context: {
                slug: node.frontmatter.slug,
                langKey: node.fields.langKey,
                namespace: node.fields.namespace,
            },
        });
    });
    result.data.tagsGroup.group.forEach(tag => {
        createPage({
            path: `/tags/${kebabCase(tag.fieldValue)}/`,
            component: path.resolve("./src/templates/tags.js"),
            context: {
                tag: tag.fieldValue,
            },
        });
    });
};
