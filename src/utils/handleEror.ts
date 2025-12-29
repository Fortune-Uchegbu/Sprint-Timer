// context validation
export const ensureContext = <T>(
    context : T | undefined,
    name: string
) : T => {
    if (!context) throw new Error(`${name} can only be used within its provider.`);
    return context;
}