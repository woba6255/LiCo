import { contextBridge, ipcRenderer } from 'electron';
import { BackendApi } from "../common/BackendApi";

const backendApi: BackendApi = {
    setShowOnLogin: (value) => {
        ipcRenderer.send('set-start-on-login', value);
    },
    getShowOnLogin() {
        return ipcRenderer.invoke('get-start-on-login');
    },
}

window.backendApi = backendApi;
contextBridge.exposeInMainWorld('backendApi', backendApi);
