export type Plan = {
    _id: string
    userid: string
    date: string
    type: string
    subtopics_id?: number[]
    subtopics?: string[]
    topic_id?: number
    topic?: string
}
