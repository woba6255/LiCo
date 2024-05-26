import { Temporal } from '@js-temporal/polyfill'
import { CHANNELS } from 'common/Channels'
import { EventNodeDataByType, EventNodeType, IEventNode, ITask, IWorkbench } from 'common/Entities'
import { ipcMain, Notification } from 'electron'
import { InterfaceToType, store } from '../App/store'
import { calculateDateFormulaRelease } from './calculateDateFormulaRelease.ts'

/**
 * Temporary solution.
 */
class EntitiesManager {
    public onAppReady() {
        ipcMain.handle(CHANNELS.GET_WORKBENCHES, () => {
            return this.getWorkbenches()
        })

        ipcMain.handle(CHANNELS.SET_WORKBENCH, (_, workbench) => {
            return this.setWorkbench(workbench)
        })

        ipcMain.handle(CHANNELS.DELETE_WORKBENCH, (_, id) => {
            return this.deleteWorkbench(id)
        })
    }

    public async onAppInit() {
        const state = await this.getWorkbenches()
        this.updateObjectives(Objective.fromObject(state))
    }

    private objectives: Objective[] = []
    private nextReleaseTime = -1
    private nextReleaseTasksIds: string[] = []
    private timer: NodeJS.Timeout | null = null

    private updateObjectives(objectives: Objective[]) {
        this.objectives = objectives
        this.setupTasks()
    }

    private setupTasks() {
        const tasks = this.objectives.flatMap((objective) => objective.tasks)

        const nextReleaseTasks = tasks
            .filter((task) => task.releaseTime !== -1)
            .sort((a, b) => a.releaseTime - b.releaseTime)
            .filter((task, index, array) => task.releaseTime === array[0].releaseTime)

        const nextReleaseTime = nextReleaseTasks[0]?.releaseTime ?? -1
        this.nextReleaseTasksIds = nextReleaseTasks.map((task) => task.id)

        if (nextReleaseTime !== this.nextReleaseTime) {
            this.nextReleaseTime = nextReleaseTime
            this.updateTimer()
        }
    }

    private onTimerEnd() {
        const tasks = this.objectives.flatMap((objective) => objective.tasks)
        const releasedTasks = tasks.filter((task) => this.nextReleaseTasksIds.includes(task.id))

        releasedTasks.forEach((task) => {
          const objective = this.objectives.find((objective) => objective.id === task.workbenchId)!
          const node = objective.getNodeById(task.nodeId)!

          node.children.forEach((id) => {
            const childNode = objective.getNodeById(id)!

            if (childNode.type === EventNodeType.NOTIFICATION) {
                const data = childNode.data as EventNodeDataByType[EventNodeType.NOTIFICATION]

                const notification = new Notification({
                    title: data.header,
                    body: data.message,
                })

                notification.show()
            }
          })
        })

        this.setupTasks()
    }

    private updateTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }

        if (this.nextReleaseTime === -1) {
            return
        }

        const timeout = this.nextReleaseTime - Temporal.Now.zonedDateTimeISO().epochMilliseconds

        const nextStr = Temporal.Now.zonedDateTimeISO().add({ milliseconds: timeout }).toLocaleString()
        console.log(`Timer updated. Next release time: ${nextStr}`)

        this.timer = setTimeout(this.onTimerEnd.bind(this), timeout)
    }

    private getWorkbenches() {
        return store.workbenches.get()
    }

    private setWorkbench(workbench: IWorkbench) {
        const objective = Objective.fromObject({ [workbench.id]: workbench })

        const objectives = this.objectives.filter((objective) => objective.id !== workbench.id)
        this.updateObjectives([...objectives, ...objective])
        return store.workbenches[workbench.id].set(workbench as InterfaceToType<IWorkbench>)
    }

    private deleteWorkbench(id: string) {
        const objectives = this.objectives.filter((objective) => objective.id !== id)
        this.updateObjectives(objectives)
        return store.workbenches[id].delete()
    }
}

export const entitiesManager = new EntitiesManager()


class Objective implements IWorkbench {
    id: string
    name: string
    description: string
    status: 'active' | 'complete' | 'failed' | 'canceled' | 'idle'
    nodes: EventNode[]

    constructor(properties: IWorkbench) {
        this.id = properties.id
        this.name = properties.name
        this.description = properties.description
        this.status = properties.status
        this.nodes = properties.nodes.map((node) => new EventNode(node))
    }

    get entryPoints() {
        return this.nodes.filter((node) => node.isEntryPoint)
    }

    get tasks() {
        const entryPoints = this.entryPoints
        const taskPoints = entryPoints.flatMap(this.getTaskPoints.bind(this))
        return [...entryPoints, ...taskPoints].map((node) => this.createTask(node))
    }

    static fromObject(object: Record<string, IWorkbench>): Objective[] {
        const values = Object.values(object)

        return values.map((value) => new Objective(value))
    }

    getNodeById(id: string) {
        return this.nodes.find((node) => node.id === id)
    }

    getTaskPoints(node: EventNode) {
        return node.children
        .map((id) => this.getNodeById(id)!)
        .filter((node) => node.isTaskPoint)
    }

    createTask(node: EventNode): ITask {
        let releaseTime = -1
        if (node.type === EventNodeType.DATE) {
            const trueNode = node as EventNode<EventNodeType.DATE>
            if (trueNode.data.dateFormula) {
                releaseTime = calculateDateFormulaRelease(trueNode.data.dateFormula)
            }
        }

        return {
            id: `${this.id}-${node.id}`,
            workbenchId: this.id,
            nodeId: node.id,
            releaseTime,
        }
    }
}

class EventNode<T extends EventNodeType = EventNodeType> implements IEventNode<false, T> {
    id: string
    type: T
    name?: string
    description?: string
    releaseDate?: string
    position: string
    children: string[]
    data: EventNodeDataByType[T]
    size: string | undefined

    constructor(properties: IEventNode<false, T>) {
        this.id = properties.id
        this.type = properties.type
        this.name = properties.name
        this.description = properties.description
        this.releaseDate = properties.releaseDate
        this.position = properties.position
        this.children = properties.children
        this.data = properties.data
        this.size = properties.size
    }

    get isEntryPoint() {
        return this.type === EventNodeType.DATE
    }

    get isTaskPoint() {
        return this.type === EventNodeType.RELATIVE
            || this.type === EventNodeType.DATE
    }
}
