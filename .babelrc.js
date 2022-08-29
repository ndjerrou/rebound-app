module.exports = {
  plugins: [
    'babel-plugin-twin',
    'babel-plugin-macros',
    '@babel/plugin-proposal-class-properties',
  ],
  presets: ['@babel/preset-react'],
  twin: {
    preset: 'styled-components',
    autoCssProp: false,
  },
};
