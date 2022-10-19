import { React, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
    Chart,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
} from "chart.js";
import { Line } from "react-chartjs-2";
import cScanAlgorithm from "../algorithms/CSCAN-JugarSenon-M3";
import cLookAlgorithm from "../algorithms/CLOOK-JugarSenon-M3";
import fcfsAlgorithm from "../algorithms/FCFS-JugarSenon-M3";
import lookAlgorithm from "../algorithms/LOOK-JugarSenon-M3";
import nStepScanAlgorithm from "../algorithms/NSTEPSCAN-JugarSenon-M3";
import scanAlgorithm from "../algorithms/SCAN-JugarSenon-M3";
import sstfAlgorithm from "../algorithms/SSTF-JugarSenon-M3";

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
);

const HRJMIS_stepGuides = [
    "Choose a seek strategy",
    "Enter disk size",
    "Enter tracks in order"
];

const HRJMIS_seekStrategies = [
    "FCFS",
    "SSTF",
    "SCAN",
    "LOOK",
    "N-Step SCAN",
    "C-SCAN",
    "C-LOOK"
];

function ProcessingPage() {
    const [HRJMIS_currentPart, HRJMIS_setCurrentPart] = useState('input');
    const [HRJMIS_seekStrategy, HRJMIS_setSeekStrategy] = useState('FCFS');
    const [HRJMIS_size, HRJMIS_setSize] = useState(200);
    const [HRJMIS_tracks, HRJMIS_setTracks] = useState([]);

    return (
        <div className="page processing">
            {HRJMIS_currentPart === 'input' ? 
                <InputPart 
                    seekStrategy={HRJMIS_seekStrategy}
                    setSeekStrategy={HRJMIS_setSeekStrategy}
                    size={HRJMIS_size}
                    setSize={HRJMIS_setSize}
                    tracks={HRJMIS_tracks}
                    setTracks={HRJMIS_setTracks}
                    setCurrentPart={HRJMIS_setCurrentPart}
                /> : 
                <OutputPart
                    seekStrategy={HRJMIS_seekStrategy}
                    setSeekStrategy={HRJMIS_setSeekStrategy}
                    size={HRJMIS_size}
                    setSize={HRJMIS_setSize}
                    tracks={HRJMIS_tracks}
                    setTracks={HRJMIS_setTracks}
                    setCurrentPart={HRJMIS_setCurrentPart}                    
                />
            }
        </div>
    );
}

function InputPart(HRJMIS_props) {
    const [HRJMIS_currentStep, HRJMIS_setCurrentStep] = useState(1);
    const [HRJMIS_error, HRJMIS_setError] = useState('');

    return (
        <div className="input">
            <div className="guide">
                <h3>{HRJMIS_stepGuides[HRJMIS_currentStep - 1]}</h3>
                <p>Step {HRJMIS_currentStep} of {HRJMIS_stepGuides.length}</p>
            </div>
            
            <InputStep props={{step: HRJMIS_currentStep, error: HRJMIS_error, setError: HRJMIS_setError, ...HRJMIS_props}} />
            
            <nav>
                {HRJMIS_currentStep > 1 ?
                    <button 
                        onClick={() => HRJMIS_setCurrentStep(HRJMIS_currentStep - 1)}
                    >Back</button>
                : <NavLink to="/">Home</NavLink> }
                {HRJMIS_currentStep < HRJMIS_stepGuides.length ?
                    <button
                        onClick={() => HRJMIS_setCurrentStep(HRJMIS_currentStep + 1)}
                    >Next</button>
                : 
                    <button
                        onClick={() => {
                            if (HRJMIS_props.tracks.some((track) => track >= HRJMIS_props.size || track < 0)) {
                                HRJMIS_setError('One or more track numbers are invalid.');
                            } else if (HRJMIS_props.tracks.length < 2) {
                                HRJMIS_setError('More tracks are needed.');
                            } else {
                                HRJMIS_props.setCurrentPart('output');
                            }
                        }}
                    >Finish</button> }    
            </nav>
        </div>
    )
}

function InputStep({ props: HRJMIS_props }) {
    switch (HRJMIS_props.step) {
        case 1:
            return (
                <ul className="choices">
                    {HRJMIS_seekStrategies.map((HRJMIS_strategy, HRJMIS_i) => {
                        return (
                            <li 
                                key={HRJMIS_i}
                                onClick={() => HRJMIS_props.setSeekStrategy(HRJMIS_strategy)}
                            >
                                <div className={
                                    `dot ${HRJMIS_strategy === HRJMIS_props.seekStrategy ? 
                                        "dot--active" : 
                                        ""
                                    }`
                                }></div>
                                {HRJMIS_strategy}
                            </li>
                        );
                    })}
                </ul>
            );
        case 2:
            return (
                <input 
                    className="disk-size" 
                    type="number" 
                    value={HRJMIS_props.size}
                    onChange={(HRJMIS_e) => HRJMIS_props.setSize(HRJMIS_e.target.value)}
                />
            );
        case 3:
            return (
                <div className="tracks-container">
                    {/* <p>Test</p> */}
                    <p className="tracks-error">{HRJMIS_props.error}</p>
                    <ul className="tracks">
                        {HRJMIS_props.tracks.map((HRJMIS_track, HRJMIS_i) => {
                            return (
                                <li key={HRJMIS_i} className="track">
                                    <input type="number" value={HRJMIS_track} onChange={(HRJMIS_e) => {
                                        let HRJMIS_newTracks = [...HRJMIS_props.tracks];
                                        HRJMIS_newTracks[HRJMIS_i] = HRJMIS_e.target.value;
                                        HRJMIS_props.setTracks(HRJMIS_newTracks);
                                        HRJMIS_props.setError('');
                                    }}/>
                                    <button onClick={() => {
                                        HRJMIS_props.setTracks(HRJMIS_props.tracks.filter((_, HRJMIS_oldI) => HRJMIS_oldI !== HRJMIS_i));
                                        HRJMIS_props.setError('');
                                    }}>&#x2715;</button>
                                </li>
                            );
                        })}
                        <li className="add">
                            <button onClick={() => {
                                HRJMIS_props.setTracks([...HRJMIS_props.tracks, 0]);
                                HRJMIS_props.setError('');
                            }}>&nbsp; + &nbsp;</button>
                        </li>
                    </ul>
                </div>
            );
    }
}

function OutputPart(HRJMIS_props) {
    let HRJMIS_head = parseInt(HRJMIS_props.tracks[0]);
    let HRJMIS_arr = HRJMIS_props.tracks.slice(1).map(Number);
    let HRJMIS_ans;

    switch (HRJMIS_props.seekStrategy) {
        case "FCFS":
            HRJMIS_ans = fcfsAlgorithm(HRJMIS_arr, HRJMIS_head);
            break;
        case "SSTF":
            HRJMIS_ans = sstfAlgorithm(HRJMIS_arr, HRJMIS_head);
            break;
        case "SCAN":
            HRJMIS_ans = scanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_props.size);
            break;
        case "LOOK":
            HRJMIS_ans = lookAlgorithm(HRJMIS_arr, HRJMIS_head);
            break;
        case "N-Step SCAN":
            HRJMIS_ans = nStepScanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_props.size, 2);
            break;
        case "C-SCAN":
            HRJMIS_ans = cScanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_props.size);
            break;
        case "C-LOOK":
            HRJMIS_ans = cLookAlgorithm(HRJMIS_arr, HRJMIS_head);
            console.log(JSON.stringify(HRJMIS_ans));
            break;
    }

    const HRJMIS_positionCount = HRJMIS_ans.seekSequence.length + 1;
    const HRJMIS_positions = [HRJMIS_head, ...HRJMIS_ans.seekSequence];
    const [HRJMIS_currentPosition, HRJMIS_setCurrentPosition] = useState(HRJMIS_positionCount);
    const [HRJMIS_graphData, HRJMIS_setGraphData] = useState([...HRJMIS_positions]);
    const HRJMIS_chartRef = useRef(null);

    const HRJMIS_updatePosition = (HRJMIS_movement) => {
        let HRJMIS_newPosition = HRJMIS_currentPosition + HRJMIS_movement;
        if (HRJMIS_newPosition < 1 || HRJMIS_newPosition > HRJMIS_positionCount) { 
            return;
        }

        HRJMIS_setGraphData(HRJMIS_positions.slice(0, HRJMIS_newPosition));
        HRJMIS_chartRef.current.update();

        HRJMIS_setCurrentPosition(HRJMIS_newPosition);
    };

    const HRJMIS_options = {
        responsive: true,
        scales: {
            x: {
                position: "top",
                title: {
                    display: true,
                    text: "Position",
                    font: {
                        size: 24
                    }
                },
                ticks: {
                    font: {
                        size: 18
                    }
                }
            },
            y: {
                min: 0,
                max: HRJMIS_props.size,
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Track",
                    font: {
                        size: 24
                    }
                },
                ticks: {
                    font: {
                        size: 18
                    }
                },
                grid: {
                    display: false
                }
            }
        },
        plugins: {  
            legend: {
                display: false
            }
        }
    };
    
    const HRJMIS_labels = Array.from({length: HRJMIS_ans.seekSequence.length + 1}, (_, i) => i + 1);

    const HRJMIS_data = {
        labels: HRJMIS_labels,
        datasets: [
            {
                data: HRJMIS_graphData,
                borderColor: "#363437",
                pointBorderWidth: 10,
            }
        ]
    };

    return (
        <div className="output">
            <div className="top">
                <div className="left">
                    <header>
                        <div className="titles">
                            <h2 className="title">Result</h2>
                            <p className="subtitle">{HRJMIS_props.seekStrategy}</p>
                        </div>
                    </header>
                    <table>
                        <thead>
                            <tr>
                                <th>Head Path</th>
                                <th>Tracks Travelled</th>
                            </tr>
                        </thead>

                        <tbody>
                            {/* {HRJMIS_ans.seekSequence.map((track, i) => {
                                let headPathTrackOne = i === 0 ? HRJMIS_head : HRJMIS_ans.seekSequence[i - 1];
                                let headPathTrackTwo = track;
                                let tracksTravelled = Math.abs(headPathTrackOne - headPathTrackTwo);

                                return (
                                    <tr key={i}>
                                        <td>{ headPathTrackOne } to { headPathTrackTwo }</td>
                                        <td>{ tracksTravelled }</td>
                                    </tr>
                                );
                            })} */}
                            {HRJMIS_positions.map((HRJMIS_position, HRJMIS_i) => {
                                if (HRJMIS_i === HRJMIS_positions.length - 1) return;

                                let HRJMIS_trackOne = HRJMIS_position;
                                let HRJMIS_trackTwo = HRJMIS_positions[HRJMIS_i + 1];
                                let HRJMIS_tracksTravelled = Math.abs(HRJMIS_trackOne - HRJMIS_trackTwo);

                                return (
                                    <tr key={HRJMIS_i} className={`${HRJMIS_i + 2 === HRJMIS_currentPosition ? "path--active" : ""}`}>
                                        <td>{HRJMIS_trackOne} to {HRJMIS_trackTwo}</td>
                                        <td>{HRJMIS_tracksTravelled}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div className="right">
                    <div className="steps">
                        <div className="arrow arrow--left" onClick={() => HRJMIS_updatePosition(-1)}></div>
                        <h3>Position {HRJMIS_currentPosition} of {HRJMIS_positionCount}</h3>
                        <div className="arrow arrow--right" onClick={() => HRJMIS_updatePosition(1)}></div>
                    </div>
                    <div className="chart-container">
                        <Line ref={HRJMIS_chartRef} data={HRJMIS_data} options={HRJMIS_options} />
                    </div> 
                </div>
            </div>

            <div className="bottom">
                <div className="stats">
                    <div className="stat total">
                        <p>Total number of track movement</p>
                        <h3>{HRJMIS_ans.total}</h3>
                    </div>

                    <div className="stat average">
                        <p>Average number of tracks travelled</p>
                        <h3>{parseFloat(HRJMIS_ans.average).toFixed(5)}</h3>
                    </div>
                </div>

                <nav>
                    <button onClick={() => HRJMIS_props.setCurrentPart('input')}>BACK</button>
                </nav>                
            </div>
        </div>
    );
}

export default ProcessingPage;