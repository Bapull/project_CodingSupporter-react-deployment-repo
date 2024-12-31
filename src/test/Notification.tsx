import { useNotification } from "../hooks/notification";

const Notification = () => {
  const { notification, isLoading } = useNotification();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(notification);
  console.log(isLoading);

  return (
    <>
      {notification?.map((item) => (
        <div key={item.id}>
          <div>id: {item.id}</div>
          <div>message: {item.message}</div>
          <div>type: {item.type}</div>
          <div>timestamp: {item.timestamp}</div>
          <div>userId: {item.userId}</div>
          <div>link: {item.link}</div>
        </div>
      ))}
    </>
  );
};

export default Notification;
