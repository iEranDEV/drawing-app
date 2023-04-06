import { createContext } from "react";

export const BrushContext = createContext({
    brush: {type: 'PENCIL', width: 1, color: '#d946ef'},
    setBrush: (brush: {type: string, width: number, color: string}) => {}
})