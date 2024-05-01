import { contextBridge, ipcRenderer } from 'electron';
import { CHANNELS } from "common/Channels";
import { BackendApi } from "common/BackendApi";

const backendApi: BackendApi = {
    getShowOnLogin() {
        return ipcRenderer.invoke(CHANNELS.GET_START_ON_LOGIN);
    },
    setShowOnLogin(value) {
        ipcRenderer.send(CHANNELS.SET_START_ON_LOGIN, value);
    },
    getWorkbenches() {
        return ipcRenderer.invoke(CHANNELS.GET_WORKBENCHES);
    },
    setWorkbench(workbench) {
        return ipcRenderer.invoke(CHANNELS.SET_WORKBENCH, workbench);
    },
    deleteWorkbench(id) {
        return ipcRenderer.invoke(CHANNELS.DELETE_WORKBENCH, id);
    }

}

window.backendApi = backendApi;
contextBridge.exposeInMainWorld('backendApi', backendApi);
