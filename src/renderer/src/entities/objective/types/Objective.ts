import { IWorkbench } from "common/Entities";

export type Objective = IWorkbench<false, true>;
export type LocalObjective = IWorkbench<true, true>;
export type AllObjectivesMap = Record<string, Objective>;
