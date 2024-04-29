import { contextBridge, ipcRenderer } from 'electron';
import { CHANNELS } from "common/Channels";
import { BackendApi } from "common/BackendApi";

const backendApi: BackendApi = {
    setShowOnLogin: (value) => {
        ipcRenderer.send(CHANNELS.SET_START_ON_LOGIN, value);
    },
    getShowOnLogin() {
        return ipcRenderer.invoke(CHANNELS.GET_START_ON_LOGIN);
    },
}

window.backendApi = backendApi;
contextBridge.exposeInMainWorld('backendApi', backendApi);
