import { RiCloseFill } from "@remixicon/react";
import React, { useState, useEffect, useCallback } from "react";

interface Position {
  x: number;
  y: number;
}

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };
const GAME_SPEED = 150;

const Inicio: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);

  const generateFood = useCallback((): Position => {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection("RIGHT");
    setGameOver(false);
    setScore(0);
  };

  const checkCollision = (head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (
      head.x < 0 ||
      head.x >= BOARD_SIZE ||
      head.y < 0 ||
      head.y >= BOARD_SIZE
    ) {
      return true;
    }
    // Self collision
    for (const segment of snakeBody) {
      if (head.x === segment.x && head.y === segment.y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (gameOver) return;

    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      // Move head based on direction
      switch (direction) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check collision
      if (checkCollision(head, newSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      newSnake.unshift(head);

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore((prevScore) => prevScore + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, generateFood]);

  // Game loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setDirection((prev) => (prev !== "DOWN" ? "UP" : prev));
          break;
        case "ArrowDown":
          e.preventDefault();
          setDirection((prev) => (prev !== "UP" ? "DOWN" : prev));
          break;
        case "ArrowLeft":
          e.preventDefault();
          setDirection((prev) => (prev !== "RIGHT" ? "LEFT" : prev));
          break;
        case "ArrowRight":
          e.preventDefault();
          setDirection((prev) => (prev !== "LEFT" ? "RIGHT" : prev));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameOver]);

  const handleDirectionChange = (newDirection: Direction) => {
    if (gameOver) return;

    // Prevent immediate reverse direction
    const opposites: { [key in Direction]: Direction } = {
      UP: "DOWN",
      DOWN: "UP",
      LEFT: "RIGHT",
      RIGHT: "LEFT",
    };

    if (direction !== opposites[newDirection]) {
      setDirection(newDirection);
    }
  };

  const getSegmentStyle = (index: number, segment: Position) => {
    const isHead = index === 0;
    const baseStyle = {
      position: "absolute" as const,
      left: `${(segment.x / BOARD_SIZE) * 239}px`,
      top: `${(segment.y / BOARD_SIZE) * 405}px`,
      width: "12px",
      height: "12px",
      transform: "translate(-50%, -50%)",
    };

    if (isHead) {
      return {
        ...baseStyle,
        backgroundColor: "#43D9AD",
        borderRadius: "50%",
        boxShadow: "0 0 8px rgba(67, 217, 173, 0.5)",
      };
    } else {
      return {
        ...baseStyle,
        backgroundColor: "#43D9AD",
        opacity: Math.max(0.3, 1 - index * 0.05),
        borderRadius: "2px",
      };
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row justify-center items-center p-6">
      {/* About Container */}
      <div className="relative flex flex-col items-start gap-[40px] sm:gap-[75px] w-[295px] sm:w-[504px] z-10">
        {/* Background Blurs */}
        <div className="absolute -left-[70px] -top-[53.5px] w-[439px] h-[417px] z-0">
          <div className="absolute w-[256px] h-[277px] left-[4px] top-[0px] sm:w-[454px] sm:h-[492px] sm:left-[1049px] sm:top-[200px] bg-[#615FFF] opacity-40 blur-[87px] rotate-[13.51deg]" />
          <div className="absolute w-[256px] h-[277px] -left-[300%] -top-[5px] sm:w-[454px] sm:h-[492px] sm:left-[826px] sm:top-[20px] bg-[#00D5BE] opacity-40 blur-[87px] -rotate-[94.3deg]" />
        </div>

        {/* Introduction Container */}
        <div className="flex flex-col items-start gap-[4px] w-[295px] sm:w-[504px] z-10">
          <p className="font-mono font-[450] text-[18px] leading-[27px] text-[#90A1B9]">
            Hola a todos. Yo soy
          </p>

          <div className="flex flex-col items-start gap-[8px]">
            <h1 className="font-mono font-[450] text-[48px] leading-[58px] sm:text-[60px] sm:leading-[66px] text-[#F8FAFC]">
              Pool Martin Cuba Nuñez
            </h1>
            <h4 className="font-mono font-[450] text-[20px] leading-[30px] sm:text-[30px] sm:leading-[42px] text-[#615FFF]">
              &gt; Front-end developer
            </h4>
          </div>
        </div>

        {/* Links Container */}
        <div className="flex flex-col items-start gap-[8px] w-[295px] sm:w-[504px] z-10">
          <p className="font-mono font-[450] text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] text-[#90A1B9]">
            // complete the game to continue
          </p>
          <p className="font-mono font-[450] text-[14px] leading-[20px] sm:text-[16px] sm:leading-[24px] text-[#90A1B9]">
            // find my profile on GitHub:
          </p>

          <div className="flex items-center gap-1 w-full">
            <span className="text-[#615FFF] font-mono text-sm">const</span>
            <span className="text-[#00D5BE] font-mono text-sm">
              enlaceGithub
            </span>
            <span className="text-white font-mono text-sm">=</span>
            <a
              href="https://github.com/example/url"
              className="text-[#FFA1AD] font-mono text-sm break-all"
            >
              "https://github.com/example/url"
            </a>
          </div>
        </div>
      </div>

      {/* Snake Game Panel - Main Game */}
      <div className="hidden lg:flex flex-row items-start p-8 gap-6 w-[507px] h-[469px] bg-gradient-to-[150.26deg] from-[rgba(23,85,83,0.7)] to-[rgba(67,217,173,0.091)] border border-[#314158] shadow-inner backdrop-blur-[32px] rounded-lg relative z-10">
        {/* Game Board */}
        <div className="w-[239px] h-[405px] relative">
          {/* Background Snake */}
          <div className="absolute w-[239px] h-[405px]   bg-[#1D293D] shadow-[inset_1px_5px_11px_rgba(2,18,27,0.71)] rounded-lg" />

          {/* Snake - Rendered as continuous segments with circular head */}
          {snake.map((segment, index) => (
            <div key={index} style={getSegmentStyle(index, segment)} />
          ))}

          {/* Food */}
          <div
            className="absolute w-[21px] h-[21px]"
            style={{
              left: `${(food.x / BOARD_SIZE) * 239 - 10}px`,
              top: `${(food.y / BOARD_SIZE) * 405 - 10}px`,
            }}
          >
            <div className="absolute w-[21px] h-[21px] bg-[#46ECD5] opacity-10 rounded-full"></div>
            <div className="absolute w-[15px] h-[15px] left-[3px] top-[3px] bg-[#46ECD5] opacity-20 rounded-full"></div>
            <div className="absolute w-2 h-2 left-[7px] top-[7px] bg-[#46ECD5] rounded-full"></div>
          </div>

          {/* Start Button */}
          {gameOver && (
            <button
              onClick={resetGame}
              className="absolute flex flex-row justify-center items-center px-3 py-2.5 gap-2.5 w-[108px] h-10 left-1/2 -translate-x-1/2 top-[343.68px] bg-[#FFB86A] rounded-lg"
            >
              <span className="w-[84px] h-5 text-sm font-medium text-center text-[#020618] font-mono">
                start-game
              </span>
            </button>
          )}
        </div>

        {/* Controls Frame */}
        <div className="flex flex-col justify-between items-end gap-[125px] w-[180px] h-[405px]">
          {/* Game Navigation */}
          <div className="flex flex-col items-start gap-6 w-[180px]">
            {/* Game Nav Container */}
            <div className="flex flex-col justify-center items-center p-[10px] gap-3 w-[180px] h-[140px] bg-[#1D293D] rounded-lg">
              {/* Rules Text */}
              <div className="w-40 h-10 font-mono font-[450] text-sm leading-5 text-[#F8FAFC]">
                // use keyboard
                <br />
                // arrows to play
              </div>

              {/* Buttons Container */}
              <div className="flex flex-col justify-center items-center gap-2 w-40 h-[68px]">
                {/* Top Button */}
                <button
                  onClick={() => handleDirectionChange("UP")}
                  disabled={gameOver}
                  className="flex justify-center items-center p-[6px] gap-[10px] w-12 h-[30px] bg-[#0A0A0A] border border-[#314158] rounded-lg hover:border-[#43D9AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-[18px] h-[18px] rotate-180"
                    fill="#F8FAFC"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 14l5-5 5 5z" />
                  </svg>
                </button>

                {/* Bottom Buttons Row */}
                <div className="flex justify-center items-end gap-2 w-40 h-[30px]">
                  {/* Left Button */}
                  <button
                    onClick={() => handleDirectionChange("LEFT")}
                    disabled={gameOver}
                    className="flex justify-center items-center p-[6px] gap-[10px] w-12 h-[30px] bg-[#0A0A0A] border border-[#314158] rounded-lg hover:border-[#43D9AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-[18px] h-[18px] rotate-90"
                      fill="#F8FAFC"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5z" />
                    </svg>
                  </button>

                  {/* Down Button */}
                  <button
                    onClick={() => handleDirectionChange("DOWN")}
                    disabled={gameOver}
                    className="flex justify-center items-center p-[6px] gap-[10px] w-12 h-[30px] bg-[#0A0A0A] border border-[#314158] rounded-lg hover:border-[#43D9AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-[18px] h-[18px]"
                      fill="#F8FAFC"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5z" />
                    </svg>
                  </button>

                  {/* Right Button */}
                  <button
                    onClick={() => handleDirectionChange("RIGHT")}
                    disabled={gameOver}
                    className="flex justify-center items-center p-[6px] gap-[10px] w-12 h-[30px] bg-[#0A0A0A] border border-[#314158] rounded-lg hover:border-[#43D9AD] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-[18px] h-[18px] -rotate-90"
                      fill="#F8FAFC"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14l5-5 5 5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Food Left Container */}
            <div className="flex flex-col justify-center items-center px-[10px] gap-2 w-[180px] h-[77px]">
              {/* Text */}
              <div className="w-40 h-5 font-mono font-[450] text-sm leading-5 text-[#F8FAFC]">
                // food left
              </div>

              {/* Food Grid */}
              <div className="flex flex-col justify-center items-center gap-2 w-[136px] h-[49px]">
                {/* First Row */}
                <div className="flex items-center gap-2 w-[136px] h-[21px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`relative w-[21px] h-[21px] ${
                        i < score ? "opacity-30" : ""
                      }`}
                    >
                      <div className="absolute w-[21px] h-[21px] bg-[#46ECD5] opacity-10 rounded-full"></div>
                      <div className="absolute w-[15px] h-[15px] left-[3px] top-[3px] bg-[#46ECD5] opacity-20 rounded-full"></div>
                      <div className="absolute w-2 h-2 left-[6px] top-[6px] bg-[#46ECD5] rounded-full"></div>
                    </div>
                  ))}
                </div>

                {/* Second Row */}
                <div className="flex items-center gap-2 w-[136px] h-[21px]">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i + 5}
                      className={`relative w-[21px] h-[21px] ${
                        i + 5 < score ? "opacity-30" : ""
                      }`}
                    >
                      <div className="absolute w-[21px] h-[21px] bg-[#46ECD5] opacity-10 rounded-full"></div>
                      <div className="absolute w-[15px] h-[15px] left-[3px] top-[3px] bg-[#46ECD5] opacity-20 rounded-full"></div>
                      <div className="absolute w-2 h-2 left-[6px] top-[6px] bg-[#46ECD5] rounded-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Corner Bolts */}
        <div className="absolute w-[13px] h-[13px] left-3 top-3 bg-gradient-to-b from-[#196C6A] to-[#114B4A] rounded-full shadow-sm">
          <RiCloseFill className=" w-[13px] h-[13px]  text-[#00BBA7]" />
        </div>
        <div className="absolute w-[13px] h-[13px] left-3 bottom-3 bg-gradient-to-b from-[#164C51] to-[#0D3A40] rounded-full shadow-sm">
          <RiCloseFill className=" w-[13px] h-[13px]  text-[#00BBA7]" />
        </div>
        <div className="absolute w-[13px] h-[13px] right-3 bottom-3 bg-gradient-to-b from-[#234B7C] to-[#122E4F] rounded-full shadow-sm">
          <RiCloseFill className=" w-[13px] h-[13px]  text-[#00BBA7]" />
        </div>
        <div className="absolute w-[13px] h-[13px] right-3 top-3 bg-gradient-to-b from-[#217D7A] to-[#114B4A] rounded-full shadow-sm">
          <RiCloseFill className=" w-[13px] h-[13px]  text-[#00BBA7]" />
        </div>
      </div>
    </div>
  );
};

export default Inicio;

