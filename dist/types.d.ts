export interface IRulesList {
    required?: (value: string) => boolean;
    minLength?: (value: string, minLength: number) => boolean;
    maxLength?: (value: string, maxLength: number) => boolean;
    email?: (value: string) => boolean;
    numeric?: (value: number) => boolean;
    date?: (value: string) => boolean;
}

// TODO: If you need new rules you can add it yourself or write me on Telegram @alisher_aripov11
export type TInputRule =
    | "required"
    | "email"
    | "numeric"
    | "date"
    | { type: "minLength" | "maxLength"; value: number };
export type TModelRule =
    | "required"
    | "email"
    | "numeric"
    | "date"
    | "minLength"
    | "maxLength";

export { validateRef } from "./index"