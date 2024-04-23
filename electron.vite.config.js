import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    publicDir: false,
    main: {},
    preload: {},
    renderer: {
        plugins: [react()]
    }
});
