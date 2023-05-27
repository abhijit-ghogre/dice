"use client";

import React, { useState } from "react";
import Dice, { DiceNumber } from "@/components/Dice";
import { useAudio } from "@/hooks/useAudio";
import Manager from "@/components/Manager";

function Container() {
  const [players, setPlayers] = useState(
    window.localStorage.getItem("players")?.split(",") || [
      "Player 1",
      "Player 2",
    ]
  );
  const [dices, setDices] = useState<DiceNumber[]>(
    window.localStorage
      .getItem("dices")
      ?.split(",")
      .map((dice) => Number(dice) as DiceNumber) || [1, 2]
  );
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(
    Number(window.localStorage.getItem("currentPlayerIndex")) || 0
  );

  const [isRolling, setIsRolling] = useState(false);

  const [, playAudio] = useAudio("/dice-sound.mp3");

  const roll = () => {
    if (isRolling) return;
    if (typeof playAudio === "function") playAudio();
    setIsRolling(true);
    const rollInterval = setInterval(() => {
      rollOnce();
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const newPlayerIndex = (currentPlayerIndex + 1) % players.length;
      const sanitizedNewPlayerIndex = Number.isNaN(newPlayerIndex)
        ? 0
        : newPlayerIndex;
      setCurrentPlayerIndex(sanitizedNewPlayerIndex);
      window.localStorage.setItem(
        "currentPlayerIndex",
        sanitizedNewPlayerIndex.toString()
      );
      setIsRolling(false);
    }, 3000);
  };

  const rollOnce = () => {
    const newDices: DiceNumber[] = dices.map((_) => {
      return (Math.floor(Math.random() * 6) + 1) as DiceNumber;
    });
    setDices(newDices);
    window.localStorage.setItem("dices", newDices.join(","));
  };

  const getTotal = () => {
    return dices.reduce((total, dice) => {
      return total + dice;
    }, 0);
  };

  const getNextPlayer = () => {
    return players[(currentPlayerIndex + 1) % players.length];
  };

  const handleAddPlayer = (newPlayer: string) => {
    const newPlayers = [...players, newPlayer];
    setPlayers(newPlayers);
    window.localStorage.setItem("players", newPlayers.join(","));
  };

  const handleRemovePlayer = (index: number) => {
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    window.localStorage.setItem("players", newPlayers.join(","));
  };

  const handleDiceIncrement = () => {
    const newDices: DiceNumber[] = [...dices, 1];
    setDices(newDices);
    window.localStorage.setItem("dices", newDices.join(","));
  };

  const handleDiceDecrement = () => {
    const newDices: DiceNumber[] = dices.slice(0, dices.length - 1);
    setDices(newDices);
    window.localStorage.setItem("dices", newDices.join(","));
  };

  const handlePlayerMoveUp = (index: number) => {
    if (index === 0) return;
    const newPlayers = players.map((player, i) => {
      if (i === index) return players[i - 1];
      if (i === index - 1) return players[i + 1];
      return player;
    });
    setPlayers(newPlayers);
    window.localStorage.setItem("players", newPlayers.join(","));
  };

  const handlePlayerMoveDown = (index: number) => {
    if (index === players.length - 1) return;
    const newPlayers = players.map((player, i) => {
      if (i === index) return players[i + 1];
      if (i === index + 1) return players[i - 1];
      return player;
    });
    setPlayers(newPlayers);
    window.localStorage.setItem("players", newPlayers.join(","));
  };

  return (
    <main className="h-full w-screen flex items-center justify-center fixed top-0 left-0">
      <Manager
        players={players}
        dices={dices}
        onAddPlayer={handleAddPlayer}
        onRemovePlayer={handleRemovePlayer}
        onDiceIncrement={handleDiceIncrement}
        onDiceDecrement={handleDiceDecrement}
        onPlayerMoveUp={handlePlayerMoveUp}
        onPlayerMoveDown={handlePlayerMoveDown}
      />
      <div onClick={roll} className="bg-black bg-opacity-10 rounded-xl p-10">
        {!!players[currentPlayerIndex] && (
          <div className="text-3xl text-center">
            {players[currentPlayerIndex]} played
          </div>
        )}
        <br />
        <div className="flex gap-4 justify-center flex-wrap">
          {dices.map((dice, index) => (
            <Dice
              key={index}
              number={dice}
              isAnimating={isRolling}
              index={index}
            />
          ))}
        </div>
        <div className="mt-4 text-center font-bold text-6xl">{getTotal()}</div>
        <br />
        <br />
        {!!getNextPlayer() && (
          <div className="text-center">
            <span className="text-5xl bold">{getNextPlayer()}</span> plays next
          </div>
        )}
      </div>
    </main>
  );
}

export default Container;
