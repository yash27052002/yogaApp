module.exports = {
  content: [
    './App.js', // Adjust this based on your main entry file
    './src/**/*.{js,jsx,ts,tsx}', // Adjust if your source files are in the 'src' folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};
