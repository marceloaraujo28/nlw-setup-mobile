import {
  TouchableOpacity,
  Dimensions,
  TouchableOpacityProps,
} from "react-native";

import clsx from "clsx";
import dayjs from "dayjs";

import { generateProgressPercentage } from "../utils/generate-progress-percecentage";

const WEEK_DAYS = 7;
const SCREEN_HORIZONTAL = (32 * 2) / 5;

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE =
  Dimensions.get("screen").width / WEEK_DAYS - (SCREEN_HORIZONTAL + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({
  amountOfHabits = 0,
  amountCompleted = 0,
  date,
  ...rest
}: Props) {
  const amountAccomplisheadPercentage =
    amountOfHabits > 0
      ? generateProgressPercentage(amountOfHabits, amountCompleted)
      : 0;

  const today = dayjs().startOf("day").toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-zinc-800"]: amountAccomplisheadPercentage == 0,
        ["bg-violet-900 bg-violet-700"]:
          amountAccomplisheadPercentage > 0 &&
          amountAccomplisheadPercentage < 20,
        ["bg-violet-800 bg-violet-600"]:
          amountAccomplisheadPercentage >= 20 &&
          amountAccomplisheadPercentage < 40,
        ["bg-violet-700 bg-violet-500"]:
          amountAccomplisheadPercentage >= 40 &&
          amountAccomplisheadPercentage < 60,
        ["bg-violet-600 bg-violet-500"]:
          amountAccomplisheadPercentage >= 60 &&
          amountAccomplisheadPercentage < 80,
        ["bg-violet-500 bg-violet-400"]: amountAccomplisheadPercentage >= 80,
        ["border-white border-4"]: isCurrentDay,
      })}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE,
      }}
      activeOpacity={0.7}
      {...rest}
    />
  );
}
