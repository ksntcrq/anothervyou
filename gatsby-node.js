const path = require(`path`);
const dashify = require(`dashify`);

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
                            tags
                            template
                            date
                        }
                    }
                }
            }
            tagsGroup: allMarkdownRemark {
                group(field: frontmatter___tags) {
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
        createPage({
            path: `${node.fields.slug}`,
            component: path.resolve(
                `./src/templates/${node.frontmatter.template}.js`
            ),
            context: {
                slug: node.fields.slug,
                locale: node.fields.langKey,
                namespace: node.fields.namespace,
                date: node.frontmatter.date,
            },
        });
    });
    result.data.tagsGroup.group.forEach(tag => {
        tag.edges.forEach(({ node }) => {
            const langKey = node.fields.langKey;
            const messages = require(`./src/intl/${langKey}.json`);
            const translatedTag = messages[tag.fieldValue];
            createPage({
                path: `/${langKey}/tags/${dashify(translatedTag)}`,
                component: path.resolve("./src/templates/tags.js"),
                context: {
                    tag: tag.fieldValue,
                    locale: langKey,
                },
            });
        });
    });
};
