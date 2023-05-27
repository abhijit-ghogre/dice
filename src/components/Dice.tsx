"use client";

import React from "react";

export type DiceNumber = 1 | 2 | 3 | 4 | 5 | 6;

interface Props {
  number: DiceNumber;
  isAnimating: boolean;
  index: number;
}

const getDiceColor = (index: DiceNumber) => {
  switch (index + 1) {
    case 1:
      return {
        bg: "bg-red-500",
        dot: "bg-red-900",
      };
    case 2:
      return {
        bg: "bg-yellow-500",
        dot: "bg-yellow-900",
      };
    case 3:
      return {
        bg: "bg-green-500",
        dot: "bg-green-900",
      };
    case 4:
      return {
        bg: "bg-blue-500",
        dot: "bg-blue-900",
      };
    case 5:
      return {
        bg: "bg-indigo-500",
        dot: "bg-indigo-900",
      };
    case 6:
      return {
        bg: "bg-purple-500",
        dot: "bg-purple-900",
      };
    default:
      return {
        bg: "bg-gray-500",
        dot: "bg-white",
      };
  }
};

function Dice(props: Props) {
  const { number, isAnimating, index } = props;

  return (
    <div
      className={`border h-16 w-16 rounded-lg flex items-center justify-center gap-1 flex-wrap p-3 ${
        getDiceColor(index as DiceNumber).bg
      }`}
      style={{ animation: isAnimating ? "shake 0.5s infinite" : "none" }}
    >
      {Array.from({ length: number }).map((_, dotIndex) => {
        return (
          <div
            className={`h-[10px] w-[10px] rounded-full ${
              getDiceColor(index as DiceNumber).dot
            }`}
            key={dotIndex}
          />
        );
      })}
    </div>
  );
}

export default Dice;
