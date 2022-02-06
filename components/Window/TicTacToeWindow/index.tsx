import React, { useState, useEffect } from "react";
import { CgShapeCircle } from "react-icons/cg";
import { FaTimes } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";
import { IoMdRefresh } from "react-icons/io";

import { ITicTacToeWindow } from "../types";
import { checkWinningCondition, ExecuteAITurn } from "./functions";
import Window from "../../../components/Window";

export interface ITicTacToeWindowProps {
  content: ITicTacToeWindow;
}

const initalBoard = ["", "", "", "", "", "", "", "", ""];

const TicTacToeWindow: React.FC<ITicTacToeWindowProps> = (props) => {
  const { content } = props;

  const [showInitialScreen, setShowInitialScreen] = useState<boolean>(true);
  const [showGameScreen, setShowGameScreen] = useState<boolean>(false);
  const [showFinishScreen, setShowFinishScreen] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [board, setBoard] = useState<string[]>(initalBoard);

  const cellWrapperStyle = "h-1/3 w-1/3 p-1";
  const cellStyle = `flex justify-center items-center h-full w-full bg-gray-800 ${playerTurn && "hover:bg-gray-600"}`;
  const checkStyle = "h-12 w-12 p-1 text-white";

  const markCell = (cell: number) => {
    let newBoard = [...board];

    if (newBoard[cell] || !playerTurn) return; //case the cell is already clicked or is disabbeld
    newBoard[cell] = "X";

    setBoard(newBoard);
    setPlayerTurn(!playerTurn);
  };

  const runAI = () => {
    const cell = ExecuteAITurn(board, difficulty);
    if (cell === -1) return;

    let newBoard = [...board];
    newBoard[cell] = "O";

    // wait for simulate the processing time
    setTimeout(() => {
      setPlayerTurn(!playerTurn);
      setBoard(newBoard);
    }, 500);
  };

  const handleDifficulty = (name: string) => {
    difficulty !== name && setDifficulty(name);
  };

  const handleGameStart = () => {
    handleGameRestart();
    setShowInitialScreen(false);
    setShowGameScreen(true);
  };

  const handleGameRestart = () => {
    setShowFinishScreen(false);
    setPlayerTurn(true);
    setBoard(initalBoard);
  };

  const handleGoBack = () => {
    setShowInitialScreen(true);
    setShowFinishScreen(false);
    setShowGameScreen(false);
  };

  const renderGameScreen = () => {
    return (
      <div className="flex flex-1 flex-col h-full w-full text-gray-200">
        <div className="flex justify-between items-center mx-1 mb-2 h-6 select-none">
          <IoCaretBack className="p-1 text-3xl bg-gray-800 hover:bg-gray-600" onClick={handleGoBack} />
          <div>Turn: {playerTurn ? "YOU" : "AI"}</div>
          <IoMdRefresh className="p-1 text-3xl bg-gray-800 hover:bg-gray-600" onClick={handleGameRestart} />
        </div>
        <div className="flex flex-1 flex-row h-full w-full flex-wrap">{renderCells()}</div>
      </div>
    );
  };

  const renderCells = () => {
    return board.map((cell, index) => {
      return (
        <div key={index} className={cellWrapperStyle}>
          <div className={cellStyle} onClick={() => markCell(index)}>
            {renderCell(cell)}
          </div>
        </div>
      );
    });
  };

  const renderCell = (cell: string) => {
    if (cell === "X") return <FaTimes className={checkStyle} />;
    else if (cell === "O") return <CgShapeCircle className={checkStyle} />;
  };

  const renderIntialScreen = () => {
    return (
      <div className="flex flex-1 flex-col justify-evenly items-center text-white select-none">
        <div className="p-2">
          <h1 className="font-bold text-5xl">TIC TAC TOE</h1>
        </div>
        <div className="p-2">
          <div className="px-4 py-3 cursor-pointer select-none bg-gray-600" onClick={handleGameStart}>
            START GAME
          </div>
        </div>
        <div className="">
          <div className="flex flex-row border-2 border-gray-100">
            <div className="p-2 font-bold">DIFFICULTY</div>
            <div className="flex justify-center items-center pl-2">
              <span className={`text-xs m-1 p-1.5 rounded cursor-pointer hover:bg-gray-400 ${difficulty === "easy" && "bg-gray-600"}`} onClick={() => handleDifficulty("easy")}>
                EASY
              </span>
              <span className={`text-xs m-1 p-1.5 rounded cursor-pointer hover:bg-gray-400 ${difficulty === "medium" && "bg-gray-600"}`} onClick={() => handleDifficulty("medium")}>
                MEDIUM
              </span>
              <span className={`text-xs m-1 p-1.5 rounded cursor-pointer hover:bg-gray-400 ${difficulty === "hard" && "bg-gray-600"}`} onClick={() => handleDifficulty("hard")}>
                HARD
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinishScreen = () => {
    return (
      <div className="flex flex-1 flex-col justify-center items-center text-white">
        <div className="p-2">
          <h1 className="font-bold text-3xl text-center">{!playerTurn ? "CONGRATULATIONS, YOU WON!" : "YEAH, YOU LOSE!"}</h1>
        </div>
        <div className="flex flex-row p-2">
          <div className="px-3 py-2 cursor-pointer select-none bg-gray-600" onClick={handleGameStart}>
            RESTART
          </div>
          <div className="px-3 py-2 ml-4 cursor-pointer select-none bg-gray-600" onClick={handleGoBack}>
            GO BACK
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const isFinished = checkWinningCondition(board);
    if (isFinished) {
      setTimeout(() => {
        setShowGameScreen(false);
        setShowFinishScreen(true);
        return;
      }, 500);
    }

    if (!playerTurn && !isFinished) runAI();
  }, [board]);

  return (
    <Window content={content}>
      <div className="flex flex-1 flex-wrap p-4">
        {showInitialScreen && renderIntialScreen()}
        {showFinishScreen && renderFinishScreen()}
        {showGameScreen && renderGameScreen()}
      </div>
    </Window>
  );
};

export default TicTacToeWindow;
