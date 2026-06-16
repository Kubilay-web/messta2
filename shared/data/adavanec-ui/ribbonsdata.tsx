
// RIBBON STYLE 2
interface RibbonType {
    id: number;
    color: string;
    position: string;
    class: string;
    title?: string;
}
export const Ribbons2: RibbonType[] = [
    { id: 1, color: "primary", position: "left", class: "end", title: "Left" },
    { id: 2, color: "success", position: "right", class: "start", title: "Right" },
]

//RIBBON STYLE 3
export const Ribbons3: RibbonType[] = [
    { id: 1, color: 'success', position: "top-left", class: 'end', title: "Top Left" },
    { id: 2, color: 'secondary', position: "top-right", class: 'start', title: "Top Right" },
    { id: 3, color: 'info', position: "top-left", class: 'end', title: "Top Left" },
    { id: 4, color: 'warning', position: "top-right", class: 'start', title: "Top Right" },
]

//RIBBON STYLE 4
export const Ribbon4: RibbonType[] = [
    { id: 1, color: 'primary', position: "top-left", class: 'end', title: "Top Left" },
    { id: 2, color: 'secondary', position: "top-right", class: 'start', title: "Top Right" },
]

//RIBBON STYLE 6
export const Ribbon6: RibbonType[] = [
    { id: 1, color: 'primary', position: "left", class: 'end', title: "Top Left" },
    { id: 2, color: 'secondary', position: "right", class: 'start', title: "Top Right" },
]


