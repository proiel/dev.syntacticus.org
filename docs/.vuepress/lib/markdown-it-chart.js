// Quick hack to make links to SVG files generated off-line from old LaTeX code.
const { hash } = require("@vuepress/shared-utils");

const chart = (md) => {
  const temp = md.renderer.rules.fence.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];

    if (token.info === "tree") {
      const key = `chart_${hash(idx)}`;
      const code = "\n" + token.content;

      var crypto = require('crypto');
      var shasum = crypto.createHash('sha1');
      shasum.update(code);

      return `<img src="/assets/img/${shasum.digest('hex')}.svg"></img>`;
    }
    return temp(tokens, idx, options, env, slf);
  };
};

module.exports = chart;