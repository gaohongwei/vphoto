import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// import react from "@vitejs/plugin-react";
import path from "path";

const target = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });

export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      port: 8000,
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          secure: false,
          // agent: new http.Agent(),
          // proxyOptions: {
          //   maxBodySize: "50mb",
          // },
        },
      },
    },
    build: {
      minify: false,
      cssCodeSplit: true,
      modulePreload: true,
      // sourcemap: true,
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: "@root-entry-name: default;",
        },
      },
    },
    // Enable inline JavaScript
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        "@pg": path.resolve(__dirname, "./src/pages/"),
      },
    },
  });
};
