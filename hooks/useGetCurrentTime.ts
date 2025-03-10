import { useEffect, useState } from "react";

export const useGetCurrentTime = () => {
  const [now, setNow] = useState<string>();

  useEffect(() => {
    const today = new Date();
    const month = today.toLocaleString("en-US", { month: "short" });
    const day = today.getDate();

    const getDayWithSuffix = (day: number) => {
      if (day >= 11 && day <= 13) return `${day}th`;
      const lastDigit = day % 10;
      return `${day}${["th", "st", "nd", "rd"][lastDigit] || "th"}`;
    };

    const formattedDate = `${month} ${getDayWithSuffix(day)}`;

    setNow(formattedDate);
  }, []);

  return { now };
};
