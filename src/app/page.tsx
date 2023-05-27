"use client";

import { useState } from "react";
import Dice, { DiceNumber } from "@/components/Dice";
import Manager from "@/components/Manager";
import { useAudio } from "@/hooks/useAudio";

export default function Home() {
  const [players, setPlayers] = useState(["Abhijit"]);
  const [dices, setDices] = useState<DiceNumber[]>([3, 4]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
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
      setCurrentPlayerIndex(Number.isNaN(newPlayerIndex) ? 0 : newPlayerIndex);
      setIsRolling(false);
    }, 3000);
  };

  const rollOnce = () => {
    const newDices: DiceNumber[] = dices.map((_) => {
      return (Math.floor(Math.random() * 6) + 1) as DiceNumber;
    });
    setDices(newDices);
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
    setPlayers([...players, newPlayer]);
  };

  const handleRemovePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const handleDiceIncrement = () => {
    setDices([...dices, 1]);
  };

  const handleDiceDecrement = () => {
    setDices(dices.slice(0, dices.length - 1));
  };

  const handlePlayerMoveUp = (index: number) => {
    if (index === 0) return;
    setPlayers(
      players.map((player, i) => {
        if (i === index) return players[i - 1];
        if (i === index - 1) return players[i + 1];
        return player;
      })
    );
  };

  const handlePlayerMoveDown = (index: number) => {
    if (index === players.length - 1) return;
    setPlayers(
      players.map((player, i) => {
        if (i === index) return players[i + 1];
        if (i === index + 1) return players[i - 1];
        return player;
      })
    );
  };

  return (
    <main className="h-screen w-screen flex items-center justify-center">
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
      <div onClick={roll} className="bg-black bg-opacity-10 rounded-xl p-5">
        {!!players[currentPlayerIndex] && (
          <div className="font-bold text-lg text-center">
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
        <div className="mt-4 text-center font-bold text-xl">{getTotal()}</div>
        <br />
        <br />
        {!!getNextPlayer() && (
          <div className="text-center text-gray-500">
            <span className="text-lg">{getNextPlayer()}</span> plays next
          </div>
        )}
      </div>
    </main>
  );
}
