export type BackendApi = {
  setShowOnLogin: (value: boolean) => void;
  getShowOnLogin: () => Promise<boolean>;
}

declare global {
  interface Window {
    backendApi: BackendApi;
  }
}
