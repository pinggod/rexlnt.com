export const formatDate = (ms: string): string => {
    const date = new Date(ms);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
