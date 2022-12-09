import { createContext, ReactNode, useState } from "react"

type AsignButton = {
    input: boolean;
}

type CheckButtonBoolean = {
    setBoolean(buttonBoolean: AsignButton): Promise<boolean>
    checkButton: boolean;
}

export const Context = createContext({} as CheckButtonBoolean)

type PropsChildren = {
    children: ReactNode;
}

export function CheckButton({ children }: PropsChildren) {
    const [checkButton, setCheckButton] = useState(false);
    async function setBoolean({ input }: AsignButton) {
       setCheckButton(input)
        return input;
    }

    return (
        <Context.Provider value={{ setBoolean, checkButton }}>
            {children}
        </Context.Provider>
    )
}