// markdown-it: a parser that converts Markdown text into HTML
// katex: a plugin that adds math rendering support to markdown-it
import markdownIt from "markdown-it";
import { katex } from "@mdit/plugin-katex";

// exports a function that Eleventy automatically calls when building the site
export default function (eleventyConfig) {
  // Vendor the CSS straight from node_modules - no CDN dependency, works
  // offline, and it is trivial to bump versions later with npm update.
  eleventyConfig.addPassthroughCopy({
    // copy files into the output folder _site without processing them
    "src/css/ledger-theme.css": "css/ledger-theme.css",
    "node_modules/latex.css/style.css": "css/vendor/latex.css",
    "node_modules/katex/dist/katex.min.css": "css/vendor/katex.min.css",
    "node_modules/katex/dist/fonts": "css/vendor/fonts",
    "src/assets/images": "images",
    "src/js": "js",
  });

  // Render $...$ and $$...$$ to real math at build time - no client-side JS,
  // no flash of unrendered TeX. htmlAndMathml keeps KaTeX's visual output
  // and a semantic MathML fallback for screen readers.
  const md = markdownIt({ html: true }).use(katex, {
    output: "htmlAndMathml",
  });
  eleventyConfig.setLibrary("md", md);

  // search for source files in src write the built website in _site
  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}