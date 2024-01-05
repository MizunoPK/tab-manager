import { TabData } from "./TabData.model";

export interface WindowData {
    id: number,
    creationTime: Date,
    tabs: TabData[]
}