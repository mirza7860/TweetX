import { useState, useEffect } from "react";

const useTimeAgo = (postDate) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const calculateTimeDifference = () => {
      const currentDate = new Date();
      const postedDate = new Date(postDate);

      const timeDifference = Math.abs(currentDate - postedDate);

      const minutes = Math.floor(timeDifference / (1000 * 60));
      const hours = Math.floor(minutes / 60);

      if (minutes < 1) {
        setTimeAgo("Just now");
      } else if (minutes < 60) {
        setTimeAgo(`${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`);
      } else if (hours < 24) {
        setTimeAgo(`${hours} ${hours === 1 ? "hour" : "hours"} ago`);
      } else {
        setTimeAgo("More than a day ago");
      }
    };

    calculateTimeDifference();
    
    const intervalId = setInterval(calculateTimeDifference, 60000);

    return () => clearInterval(intervalId);
  }, [postDate]);

  return timeAgo;
};

export default useTimeAgo;
