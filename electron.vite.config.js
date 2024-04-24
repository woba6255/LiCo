import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    publicDir: false,
    main: {},
    preload: {},
    renderer: {
        plugins: [react()],
        resolve: {
            alias: {
                app: '/src/app',
                entities: '/src/entities',
                features: '/src/features',
                pages: '/src/pages',
                shared: '/src/shared',
                widgets: '/src/widgets',
            },
        },
    }
});
