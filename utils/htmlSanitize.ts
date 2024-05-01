import $sanitizeHtml from "sanitize-html";

const sanitizeHtml = (html: string) => {
  return $sanitizeHtml(html, {
    allowedTags: ["iframe"],
    allowedAttributes: {
      iframe: ["frameborder", "style", "src"],
    },
    allowedIframeHostnames: ["viewer.diagrams.net"],
  });
};

export default sanitizeHtml;