// Alternativ är att ha en folder som heter "types" och ha flera filer i den istället för att ha alla
// types i samma fil.

export type Message = {
    header: string
    texts: string[] | []
}

