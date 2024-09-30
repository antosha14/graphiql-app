/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `@import "mixins.scss"; @import "placeholders.scss"; @import "constants.scss";`,
  },
};

export default nextConfig;
