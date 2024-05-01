import { IWorkbench } from "common/Entities.ts";

export type Workbench = IWorkbench<false, true>;
export type LocalWorkbench = IWorkbench<true, true>;
export type AllWorkbenchesMap = Record<string, Workbench>;
