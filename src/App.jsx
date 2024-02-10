import { useState, useEffect } from "react";

function App() {
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            setTime({ hours, minutes, seconds });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);
    const hrRotation = 30 * time.hours + time.minutes / 2;
    const minRotation = 6 * time.minutes + time.seconds / 10;
    const secRotation = 6 * time.seconds;
    // for 12 hour format digital clock
    const amPm = time.hours < 12 ? "AM" : "PM";
    let digitalHrs = time.hours % 12 || 12; // after || handle midnight(0 hour)
    // Adding leading zeros to hours, minutes and seconds if they are less than 10
    digitalHrs = digitalHrs < 10 ? "0" + digitalHrs : digitalHrs;
    const digitalMns = time.minutes < 10 ? "0" + time.minutes : time.minutes;
    const digitalScs = time.seconds < 10 ? "0" + time.seconds : time.seconds;
    return (
        <div className="max-w-5xl mx-auto border-2">
            {/* digital clock */}
            <div className="min-h-20 py-4 flex items-center justify-center text-5xl font-semibold border-2">
                <span className="w-20 text-teal-700">{digitalHrs}</span>:
                <span className="w-20 text-teal-700">{digitalMns}</span>:
                <span className="w-20 text-teal-700">{digitalScs}</span>
                <span className="text-slate-700">{amPm}</span>
            </div>
            {/* Analog clock */}
            <div className="w-full min-h-[calc(100vh-80px)] grid place-content-center">
                <div className="relative flex justify-center items-center w-80 h-80 rounded-full bg-emerald-500 ring-8 border-2 border-white ring-slate-800 shadow-lg shadow-slate-800 text-lg text-white before:content-[''] before:absolute before:z-20 before:w-[10px] before:h-[10px] before:rounded-full before:bg-white">
                    {/* clock hands */}
                    {/* hours hand */}
                    <div
                        className="flex justify-center items-end"
                        style={{ transform: `rotate(${hrRotation}deg)` }}
                    >
                        <i className="absolute w-1 h-[80px] rounded-full bg-slate-800"></i>
                    </div>
                    {/* minutes hand */}
                    <div
                        className="flex items-end"
                        style={{ transform: `rotate(${minRotation}deg)` }}
                    >
                        <i className="absolute w-[3px] h-[96px] rounded-full bg-slate-800"></i>
                    </div>
                    {/* seconds hand */}
                    <div
                        className="flex items-end"
                        style={{ transform: `rotate(${secRotation}deg)` }}
                    >
                        <i className="absolute w-[2px] h-[110px] rounded-full bg-slate-800"></i>
                    </div>

                    {[...Array(12)].map((_, index) => (
                        <span
                            key={index}
                            className={`absolute inset-3 rotate-[${
                                (index + 1) * 30
                            }deg]`}
                        >
                            <b
                                className={`inline-block rotate-[${
                                    (index + 1) * -30
                                }deg]`}
                            >
                                {index + 1}
                            </b>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
