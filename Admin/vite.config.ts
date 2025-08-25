import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from '@tailwindcss/vite'




// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],

//   server: {
//   proxy: {
//     '/api': {
//       target: 'https://ak-fashion.vercel.app',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, '')
//     }
//   },
//   // historyApiFallback: true,
// }
});
