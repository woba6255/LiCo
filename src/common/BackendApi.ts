import { IWorkbench } from "common/Entities.ts";

export type BackendApi = {
  getShowOnLogin: () => Promise<boolean>;
  setShowOnLogin: (value: boolean) => void;
  getWorkbenches: () => Promise<Record<string, IWorkbench>>;
  setWorkbench: (workbench: IWorkbench) => Promise<void>;
  deleteWorkbench: (workbenchId: string) => Promise<void>;
}

declare global {
  interface Window {
    backendApi: BackendApi;
  }
}
