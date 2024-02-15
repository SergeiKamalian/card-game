export const calculateGamerStepTime = (minutes: number) => {
    const currentDate = new Date();
    const millisecondsToAdd = minutes * 60000;
    currentDate.setTime(currentDate.getTime() + millisecondsToAdd);
    return currentDate;
}