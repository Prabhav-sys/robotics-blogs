module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("content");
  eleventyConfig.addPassthroughCopy("admin");



  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
