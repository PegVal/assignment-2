import React from "react";
import { useState, useEffect } from "react";
//import "./counter.css";
import { BlogContext } from "./BlogProvider";

//const Tabata = ({ duration, init, rehearsal, pause, remaining }) => {
const Tabata = ({ duration }) => {
  const value = React.useContext(BlogContext);

  // ------------------------------------
  const extractTimerValues = value.posts.map((what) => {
    const duration = what.duration;
    const repeat = what.repeat;
    const pause = what.pause;
    const total = (duration + pause) * (repeat + 1);
    return total;
  });

  const totalTiming = extractTimerValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  // ---------------------------------
  const btnNum = value.postCount;

  // ------------------------------------- BOUCLE
  const btnTimer = value.posts.map((what, i) => {
    const duration = what.duration;
    const repeat = what.repeat;
    const pause = what.pause;
    const title = what.title;

    const timerTotal = (duration + pause) * (repeat + 1);

    const btnId = i;

    function initBtn() {
      setIsActive(false);
      setIsFinish(false);
      setpauseActif(false);
      setBtnId(btnId + 1);

      setSeconds(duration);
      setRepeat(repeat + 1);
      setPause(pause);
      setTotal(timerTotal);

      setRemaining(timerTotal);
      setValInitial(duration);
      setValRepeat(repeat + 1);
      setValPause(pause);

      setTitle(title);
    }

    return (
      <>
        <button id="btnId" className="button" onClick={initBtn}>
          ({btnId + 1}/{btnNum}) {title}
          {/*  <br />{duration} duration + {pause} pause * {repeat + 1} times
          <br/>({repeat} repeat)
          <br/>= {timerTotal} seconds */}
        </button>
      </>
    );
  });

  const [btnId, setBtnId] = useState(0); // N° de btn ----------------------------------- NEW

  // -------------- valeur à faire passer dans le component ---------------

  const valFinal = duration;

  const [remaining, setRemaining] = useState(0);
  const [total, setTotal] = useState(remaining + 1);

  const [repeat, setRepeat] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(0);

  const [title, setTitle] = useState("nothing yet");

  const [valRepeat, setValRepeat] = useState(0);
  const [valPause, setValPause] = useState(0);
  const [valInitial, setValInitial] = useState(0);

  const [isActive, setIsActive] = useState(false); // btn play/pause
  const [isFinish, setIsFinish] = useState(false); // quand on arrive à la fin
  const [pauseActif, setpauseActif] = useState(false);

  function toggle() {
    setIsActive(!isActive); // intervertir la valeur pour le btn Play/Pause
  }

  function reset() {
    setSeconds(valInitial); //setSeconds(valInitial);
    setIsActive(false);
    setIsFinish(false); // quand tout est terminé (pause et repetition inclus)
    setRepeat(valRepeat); // nombre de répétition: retour à la la valeur initiale
    setPause(valPause); // pause: retour à la valeur initiale
    setpauseActif(false); // la pause est inactive
    setTotal(remaining);
    //console.log("reset");
  }

  /*   function forward() {
    setSeconds(valFinal); // timer: retour à la la valeur initiale
    setIsFinish(true); // c'est terminé
    setRepeat(0); // pour le repeat: au reset réinitialiser les valeurs
    setPause(0); // pour le timer de la pause: au reset réinitialiser les valeurs
    setpauseActif(false); // la pause est inactive
    setTotal(0);
    //console.log("Forward end");
  } */

  useEffect(() => {
    if (repeat > 0) {
      let interval = setInterval(() => {
        // sans pause (pause = 0) -------------------------------------------------------------
        if (pause === 0) {
          //console.log("pause = 0");
          if (seconds <= 1) {
            setSeconds((seconds) => valInitial - 1); // on recommence le timer
            setTotal(total - 1);
            if (seconds === 1) {
              setRepeat((repeat) => repeat - 1); // decrement n° of repeat
            }
          }
        }
        // avec pause (pause > 0) -------------------------------------------------------------
        if (pause > 0 && pauseActif !== false) {
          console.log("pause > 0");
          setPause(pause - 1);
          setTotal(total - 1);

          if (pause === 1) {
            // obliger de mettre à 1 sinon je perds des secondes
            setSeconds((seconds) => valInitial); // on recommence le timer
            setPause((pause) => valPause); // on recommence le compteur de la pause
            setpauseActif(false); // on change le param de pause pour pouvoir recommencer
            setRepeat((repeat) => repeat - 1); // decrement n° of repeat
          }
        } else if (isActive && !pauseActif && pause !== valPause) {
          setpauseActif(true);
          clearInterval(interval);
        }

        // ---- duration
        if (isActive && seconds !== valFinal) {
          setSeconds(seconds - 1);
          setTotal(total - 1);
          if (seconds === valFinal + 1) {
            setpauseActif(true); // coundown de la pause
          }
        } else if (!isActive && pauseActif && seconds !== valInitial) {
          setpauseActif(false);
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      //console.log("Tout est TERMINÉ!");
      setIsFinish(true); // quand on arrive à la fin, les btn doivent disparaitre
      setRepeat(0);
      setSeconds(0);
      setPause(0);
      setTotal(0);
      setValRepeat(0);
      setRemaining(0);
    }
  }, [
    isActive,
    seconds,
    repeat,
    valFinal,
    valInitial,
    pause,
    pauseActif,
    valPause,
    total,
    remaining,
  ]);

  return (
    <>
      <div class="timerMenu">{btnTimer}</div>
      <div className="counter-content">
        <div className="csci-e39">CSCI E-39</div>
        <h2>WORKOUT</h2>
        <h4>Duration of all timers combined: {totalTiming} seconds</h4>
        <h4>{btnTimer[0]}</h4>
        <div className="counterBoxContent">
          <div className="info">
            <h3>
              {title} ({btnId}/{btnNum})
            </h3>
            <h4>Total timing: {remaining} seconds</h4>
            <p className="titleInfo">Remaining</p>
            <p className="numInfo">
              {total}/{remaining}
            </p>
            <p className="numInfoSec">Seconds</p>
          </div>
          <div className="counterBox">
            <div className="timerTitle">Timer</div>
            <div className="timerDisplaySecond">{seconds} </div>
            <div className="timerSecond">seconds</div>
          </div>
          <div className="infoBoxContent">
            <div className="info">
              <p className="titleInfo">n° times</p>
              <p className="numInfo">
                {repeat}/{valRepeat}
              </p>
              <p className="numInfoSec">Times</p>
            </div>
            <div className="info">
              <p className="titleInfo">Pause</p>
              <p className="numInfo">{pause}</p>
              <p className="numInfoSec">Seconds</p>
            </div>
          </div>
          <div className="buttonContent">
            {!isFinish && (
              <>
                <button
                  className={`button button-${
                    isActive ? "active" : "inactive"
                  }`}
                  onClick={toggle}
                >
                  {isActive ? "Pause" : "Start"}
                </button>
              </>
            )}
            {isActive && !isFinish && (
              <>
                <button className="button" onClick={reset}>
                  Reset
                </button>
              </>
            )}
            <div>{btnTimer[btnId]}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabata;
