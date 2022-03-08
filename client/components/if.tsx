import { ReactNode } from "react";

interface IfProps {
    condition?: boolean
    children: ReactNode
}

export const If = (props: IfProps) => props.condition ? <>{props.children}</> : <></>;