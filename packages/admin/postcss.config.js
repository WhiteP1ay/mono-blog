export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["*"],
      exclude: /node_modules/i,
    },
  },
};
