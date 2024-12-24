import useSWR from "swr";

type Notification = {
  id: number;
  message: string;
  type: string;
  timestamp: string;
  userId: number;
  link: string;
};

export const useNotification = () => {
  const { data: notification, isLoading } = useSWR<Notification[]>(
    `${import.meta.env.VITE_BACK_URL}/notification`,
    () => {
      return fetch(`${import.meta.env.VITE_BACK_URL}/notification`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => data.data);
    }
  );

  return {
    notification,
    isLoading,
  };
};
