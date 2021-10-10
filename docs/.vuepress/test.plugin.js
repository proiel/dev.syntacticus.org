const path = require("path");
const chart = require("./lib/markdown-it-chart");

module.exports = (options, ctx) => {
  return {
    name: "vuepress-plugin-chart",
    chainMarkdown(config) {
      config.plugin("chart").use(chart);
    }
  };
};