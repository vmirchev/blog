// Sätteri HAST plugin: make article heading IDs discoverable with visible links.
export const headingLinks = {
  name: "heading-links",
  element: {
    filter: ["h2", "h3", "h4"],
    visit(node, ctx) {
      if (!node.properties?.id) return;
      ctx.replaceNode(node, {
        ...node,
        children: [
          {
            type: "element",
            tagName: "a",
            properties: {
              href: `#${node.properties.id}`,
              className: ["heading-anchor"],
              "aria-label": `Link to ${ctx.textContent(node)}`,
            },
            children: node.children,
          },
        ],
      });
    },
  },
};
