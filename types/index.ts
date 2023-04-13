type CanvasPoint = {
    x: number,
    y: number
}

type HistoryItem = {
    points: Array<CanvasPoint>,
    type: string,
    color: string,
    width: number
}