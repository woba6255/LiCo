import { IWorkbench } from "common/Entities";

export type Objective = IWorkbench<false>;
export type LocalObjective = IWorkbench<true>;
export type AllObjectivesMap = Record<string, Objective>;
