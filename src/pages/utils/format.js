export const formatTranslations = edges =>
    edges.map(({ node }) => ({
        langKey: node.fields.langKey,
        slug: node.fields.slug,
    }));
