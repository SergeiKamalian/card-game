export const generateToken = (userId: string, activeDays: number, sessionToken: string) => {
    const currentDate = new Date();
    const millisecondsIn24Hours = 24 * activeDays * 60 * 60 * 1000;
    const futureDate = new Date(currentDate.getTime() + millisecondsIn24Hours);
    const formattedFutureDate = futureDate.toISOString();
    const token = `${userId}+$+${formattedFutureDate}+$+${sessionToken}`;
    return token;
}