/** @type {import('next').NextConfig} */
import path from 'path';
const stylesPath = path.resolve('styles');

const nextConfig = {
  sassOptions: {
    includePaths: [stylesPath],
    prependData: `@import "mixins.scss"; @import "placeholders.scss"; @import "constants.scss";`,
  },
};

export default nextConfig;
