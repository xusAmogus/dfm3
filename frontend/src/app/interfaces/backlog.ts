export interface Backlog {
    id: number,
    title: string,
    category: string,
    priority: number,
    description:string,
    completed?: boolean,
    origin?: string
}
