const nextConfig = {
  output: 'export',
  trailingSlash: true, // создаёт папки index.html вместо чистых файлов
};  
module.exports = nextConfig;
// module.exports = {
//   reactStrictMode: true,
//   trailingSlash: true,
//   async rewrites() {
//     return [
//       {
//         source: '/signup',
//         destination: '/signup',
//       },
//       {
//         source: '/login',
//         destination: '/login',
//       },
//     ];
//   },
// };
