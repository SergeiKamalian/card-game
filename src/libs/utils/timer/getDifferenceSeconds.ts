export const getDifferenceSeconds = (date: string) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const difference = targetDate.getTime() - currentDate.getTime();
    const secondsDifference = Math.ceil(difference / 1000);
    return secondsDifference;
}