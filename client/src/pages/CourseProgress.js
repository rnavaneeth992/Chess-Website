import React from "react";

const CourseProgress = () => {
  const beginnerData = [
    {
      title: "Introduction and Basics",
      sessionData: [
        {
          id: 1,
          title: "Introduction to Chess - Overview, history, and objective.",
        },
        {
          id: 2,
          title: "The Chessboard - Naming squares and setting up the board.",
        },
        {
          id: 3,
          title: "Movement of Major Pieces - Rook, Bishop, Queen.",
        },
        {
          id: 4,
          title: "Movement of Minor and Special Pieces - Knight, King, Pawn.",
        },
        {
          id: 5,
          title: "Test Review - 1 - Recap of movements and basic rules.",
        },
      ],
    },
    {
      title: "Attack and Defense",
      sessionData: [
        {
          id: 6,
          title: "Basic Attacks - Using Rook, Bishop, Queen.",
        },
        {
          id: 7,
          title: "Advanced Attacks - Using Knight, Pawn, targeting the King.",
        },
        {
          id: 8,
          title: "Defensive Techniques - Moving pieces away, supporting them.",
        },
        {
          id: 9,
          title: "Advanced Defense - Interposing and capturing.",
        },
        {
          id: 10,
          title: "Test Review - 2 - Assessment of offense and defense.",
        },
      ],
    },
    {
      title: "Special Moves & Mate Concepts",
      sessionData: [
        {
          id: 11,
          title: "Special Moves - Castling, En passant.",
        },
        {
          id: 12,
          title: "Check, Checkmate, Stalemate - Understanding differences.",
        },
        {
          id: 13,
          title: "Mate in One - Using Queen, Rook, Minor Pieces, Pawn.",
        },
        {
          id: 14,
          title: "Advanced Mates - Double Rook, Queen-Rook checkmates.",
        },
        {
          id: 15,
          title: "Test Review - 3 - Concepts of mating, special moves.",
        },
      ],
    },
  ];

  const moduleProgress = [0.95, 0.25, 0.1];
  return (
    <div className="bg-[#fbf7ff] w-full min-h-full flex flex-col items-center p-10">
      <div className="flex flex-col w-5/6 gap-24">
        <div className=" inline-flex flex-row justify-between">
          <span className=" self-center text-7xl font-bold text-primary font-primary">
            Course
            <br />
            Progress
          </span>

          <div></div>
        </div>
        <div class="timeline">
          {beginnerData.map((mod, idx) => (
            <>
              <div
                class={`timeline__event  animated fadeInUp delay-3s timeline__event--type${
                  (idx % 3) + 1
                }`}
              >
                <div class="timeline__event__icon ">
                  {/* <!-- <i class="lni-sport"></i>--> */}
                  <div id="loader" class="ball">
                    <div
                      class={`delay wave${(idx % 3) + 1}`}
                      style={{
                        background: `url('https://i.imgur.com/uFpLbYt.png')`,
                        backgroundSize: `200px ${
                          moduleProgress[idx % 3] * 100
                        }px`,
                        backgroundRepeat: "repeat-x",
                      }}
                    >
                      <div
                        class={`delay wave${(idx % 3) + 1}`}
                        style={{
                          background: `url('https://i.imgur.com/uFpLbYt.png')`,
                          backgroundSize: `200px ${
                            moduleProgress[idx % 3] * 100
                          }px`,
                          backgroundRepeat: "repeat-x",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="timeline__event__date">Module {idx + 1}</div>
                <div class="timeline__event__content ">
                  <div class="timeline__event__title">{mod.title}</div>
                  <div class="timeline__event__description">
                    {mod.sessionData.map((sess) => (
                      <>
                        <br></br>
                        <p>
                          <b>Session {sess.id}:</b> {sess.title}
                        </p>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
