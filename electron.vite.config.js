import { defineConfig } from "electron-vite";
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
    publicDir: false,
    main: {
        resolve: {
            alias: {
                common: '/src/common',
                main: '/src/main',
            },
        }
    },
    preload: {
        resolve: {
            alias: {
                common: '/src/common',
                main: '/src/main',
            },
        }
    },
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
                common: '/../common',
            },
        },
    }
});
