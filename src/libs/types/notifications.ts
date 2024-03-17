export type TNotification = {
  game: {
    code: string;
    createdAt: string;
    finishedAt: string;
    requestUserId: number;
  } | null;
};
