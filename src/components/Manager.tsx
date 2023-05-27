import React, { useState } from "react";

interface Props {
  players: string[];
  dices: number[];
  onAddPlayer: (player: string) => void;
  onRemovePlayer: (index: number) => void;
  onDiceIncrement: () => void;
  onDiceDecrement: () => void;
  onPlayerMoveUp: (index: number) => void;
  onPlayerMoveDown: (index: number) => void;
}

function Manager(props: Props) {
  const {
    players,
    dices,
    onAddPlayer,
    onRemovePlayer,
    onDiceIncrement,
    onDiceDecrement,
    onPlayerMoveUp,
    onPlayerMoveDown,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const [newPlayer, setNewPlayer] = useState("");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAddPlayer = () => {
    if (!newPlayer) return;
    onAddPlayer(newPlayer);
    setNewPlayer("");
  };

  const handleDiceIncrement = () => {
    if (dices.length >= 6) return;
    onDiceIncrement();
  };

  const handleDiceDecrement = () => {
    if (dices.length <= 1) return;
    onDiceDecrement();
  };

  return (
    <div
      className={`fixed left-0 bottom-0 w-full bg-gray-400 p-2 transition-all ${
        isOpen ? "h-full overflow-auto" : "h-[54px] overflow-hidden"
      }`}
    >
      <div className="justify-center flex">
        <div>
          <div className="flex justify-center items-center">
            <button
              className="bg-amber-700 p-2 rounded text-white"
              onClick={toggleOpen}
            >
              {isOpen ? "Close" : "Open"} manager
            </button>
          </div>
          <div className="mt-4">
            <div className="text-center font-bold mb-4">Dices</div>
            <div className="flex items-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                onClick={handleDiceDecrement}
              >
                -
              </button>
              <div className="bg-gray-200 text-center py-2 px-4">
                {dices.length}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                onClick={handleDiceIncrement}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-center font-bold mb-4">
          Players ({players.length})
        </div>
        <div className="flex flex-col px-2">
          <div className="divide-y">
            {players.map((player, index) => (
              <div key={index} className="flex justify-between py-2">
                <div className="flex gap-4">
                  <button
                    className="bg-blue-500 text-white font-bold px-2 rounded disabled:opacity-50"
                    onClick={() => onPlayerMoveUp(index)}
                    disabled={index === 0}
                  >
                    ▲
                  </button>
                  <button
                    className="bg-blue-500 text-white font-bold px-2 rounded disabled:opacity-50"
                    onClick={() => onPlayerMoveDown(index)}
                    disabled={index === players.length - 1}
                  >
                    ▼
                  </button>
                </div>

                <div className="text-lg">{player}</div>
                <div className="flex gap-2">
                  <button
                    className="bg-red-500 px-2 rounded text-white"
                    onClick={() => onRemovePlayer(index)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <input
              type="text"
              className="border border-black rounded p-2 w-full"
              placeholder="Name"
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
            />
            <button
              className="bg-green-500 px-2 rounded text-white w-10"
              onClick={handleAddPlayer}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Manager;
