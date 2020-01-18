const path = require(`path`);
const kebabCase = require(`kebab-case`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const langKey = getNode(node.parent).name;
        createNodeField({
            node,
            name: `langKey`,
            value: langKey,
        });
    }
};

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions
    deletePage(page)
    // You can access the variable "locale" in your page queries now
    createPage({
        ...page,
        context: {
            ...page.context,
            locale: page.context.intl.language,
        },
    })
}

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions;
    const result = await graphql(`
        {
            postsRemark: allMarkdownRemark(
                sort: { order: DESC, fields: [frontmatter___date] }
            ) {
                edges {
                    node {
                        fields {
                            langKey
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
    result.data.postsRemark.edges.forEach(({ node }) => {
        createPage({
            path: `${node.frontmatter.slug}`,
            component: path.resolve(
                `./src/templates/${node.frontmatter.template}.js`
            ),
            context: {
                slug: node.frontmatter.slug,
                pageKey: node.frontmatter.pageKey,
                langKey: node.fields.langKey,
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
