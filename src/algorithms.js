// First Come First Served Algorithm
export function fcfsAlgorithm(HRJMIS_arr, HRJMIS_head) {
    let HRJMIS_seekCount = 0;
    let HRJMIS_distance, HRJMIS_currTrack;

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_arr.length; HRJMIS_i++) {
        HRJMIS_currTrack = HRJMIS_arr[HRJMIS_i];
        HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
        HRJMIS_seekCount += HRJMIS_distance;
        HRJMIS_head = HRJMIS_currTrack;
    }

    return {
        total: HRJMIS_seekCount,
        average: HRJMIS_seekCount / HRJMIS_arr.length,
        seekSequence: HRJMIS_arr
    };
}

// Shortest Seek Time First Algorithm
function calculateDifference(HRJMIS_request, HRJMIS_headloc, HRJMIS_diff) {
    for (let HRJMIS_i = 0; HRJMIS_i<HRJMIS_diff.length; HRJMIS_i++) {
        HRJMIS_diff[HRJMIS_i][0] = Math.abs(HRJMIS_request[HRJMIS_i] - HRJMIS_headloc);
    }
}

function findMin (HRJMIS_diff) {
    let HRJMIS_index = -1;
    let HRJMIS_minimum = 999999999;
    
    for (let HRJMIS_i = 0; HRJMIS_i<HRJMIS_diff.length; HRJMIS_i++) {
        if (!HRJMIS_diff[HRJMIS_i][1] && HRJMIS_minimum > HRJMIS_diff[HRJMIS_i][0]) {
            HRJMIS_minimum = HRJMIS_diff[HRJMIS_i][0];
            HRJMIS_index = HRJMIS_i;
        }
    }

    return HRJMIS_index;
}

export function sstfAlgorithm(HRJMIS_request, HRJMIS_headloc) {
    if (HRJMIS_request.length == 0) {
        return;
    }
    
    let HRJMIS_len = HRJMIS_request.length;
    let HRJMIS_diff = new Array();
    let HRJMIS_seek_sequence = new Array(HRJMIS_len + 1);
    let HRJMIS_seek_count = 0;

    for (let HRJMIS_i=0; HRJMIS_i<HRJMIS_len; HRJMIS_i++) {
        HRJMIS_diff.push([0,0])
    }

    for (let HRJMIS_i=0; HRJMIS_i<HRJMIS_len; HRJMIS_i++) {
        HRJMIS_seek_sequence[HRJMIS_i] = HRJMIS_headloc;
        calculateDifference(HRJMIS_request, HRJMIS_headloc, HRJMIS_diff);
        let HRJMIS_index = findMin(HRJMIS_diff);
        HRJMIS_diff[HRJMIS_index][1] = true;
        HRJMIS_seek_count += HRJMIS_diff[HRJMIS_index][0];
        HRJMIS_headloc = HRJMIS_request[HRJMIS_index];
    }
    HRJMIS_seek_sequence[HRJMIS_seek_sequence.length - 1] = HRJMIS_headloc;
    HRJMIS_seek_sequence.shift();

    return {
        total: HRJMIS_seek_count,
        average: HRJMIS_seek_count / HRJMIS_seek_sequence.length,
        seekSequence: HRJMIS_seek_sequence
    };
}

// SCAN Algorithm
export function scanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_disk_size, HRJMIS_direction = "right") {
    let HRJMIS_seek_count = 0;
    let HRJMIS_distance, HRJMIS_cur_track;
    let HRJMIS_left = [], HRJMIS_right = [];
    let HRJMIS_seek_sequence = [];

    if (HRJMIS_direction == "left")
        HRJMIS_left.push(0);
    else if (HRJMIS_direction == "right")
        HRJMIS_right.push(HRJMIS_disk_size - 1);

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_arr.length; HRJMIS_i++) {
        if (HRJMIS_arr[HRJMIS_i] < HRJMIS_head)
            HRJMIS_left.push(HRJMIS_arr[HRJMIS_i]);
        if (HRJMIS_arr[HRJMIS_i] > HRJMIS_head)
            HRJMIS_right.push(HRJMIS_arr[HRJMIS_i]);
    }

    HRJMIS_left.sort(function(HRJMIS_a, HRJMIS_b){return HRJMIS_a - HRJMIS_b});
    HRJMIS_right.sort(function(HRJMIS_a, HRJMIS_b){return HRJMIS_a - HRJMIS_b});

    let HRJMIS_run = 2;
    while (HRJMIS_run-- > 0) {
        if (HRJMIS_direction === "left") {
            for (let HRJMIS_i = HRJMIS_left.length - 1; HRJMIS_i >= 0; HRJMIS_i--) {
                HRJMIS_cur_track = HRJMIS_left[HRJMIS_i];

                HRJMIS_seek_sequence.push(HRJMIS_cur_track);

                HRJMIS_distance = Math.abs(HRJMIS_cur_track - HRJMIS_head);

                HRJMIS_seek_count += HRJMIS_distance;

                HRJMIS_head = HRJMIS_cur_track;
            }
            HRJMIS_direction = "right";
        }
        else if (HRJMIS_direction === "right") {
            for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_right.length; HRJMIS_i++) {
                HRJMIS_cur_track = HRJMIS_right[HRJMIS_i];
                HRJMIS_seek_sequence.push(HRJMIS_cur_track);

                HRJMIS_distance = Math.abs(HRJMIS_cur_track - HRJMIS_head);

                HRJMIS_seek_count += HRJMIS_distance;
                HRJMIS_head = HRJMIS_cur_track;
            }
            HRJMIS_direction = "left";
        }
    }

    return {
        total: HRJMIS_seek_count,
        average: HRJMIS_seek_count / HRJMIS_seek_sequence.length,
        seekSequence: HRJMIS_seek_sequence
    };
}


// LOOK Algorithm
export function lookAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_direction = "right") {
    let HRJMIS_seekCount = 0;
    let HRJMIS_distance, HRJMIS_currTrack;

    let HRJMIS_left = [];
    let HRJMIS_right = [];
    let HRJMIS_seekSequence = [];

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_arr.length; HRJMIS_i++) {
        if (HRJMIS_arr[HRJMIS_i] < HRJMIS_head) {
            HRJMIS_left.push(HRJMIS_arr[HRJMIS_i]);
        }

        if (HRJMIS_arr[HRJMIS_i] > HRJMIS_head) {
            HRJMIS_right.push(HRJMIS_arr[HRJMIS_i]);
        }
    }

    HRJMIS_left.sort((HRJMIS_a, HRJMIS_b) => HRJMIS_a - HRJMIS_b);
    HRJMIS_right.sort((HRJMIS_a, HRJMIS_b) => HRJMIS_a - HRJMIS_b);

    let HRJMIS_run = 2;
    while (HRJMIS_run-- > 0) {
        if (HRJMIS_direction === "left") {
            for (let HRJMIS_i = HRJMIS_left.length - 1; HRJMIS_i >= 0; HRJMIS_i--) {
                HRJMIS_currTrack = HRJMIS_left[HRJMIS_i];
                HRJMIS_seekSequence.push(HRJMIS_currTrack);
                HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
                HRJMIS_seekCount += HRJMIS_distance;
                HRJMIS_head = HRJMIS_currTrack;
            }

            HRJMIS_direction = "right";
        } else if (HRJMIS_direction === "right") {
            for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_right.length; HRJMIS_i++) {
                HRJMIS_currTrack = HRJMIS_right[HRJMIS_i];
                HRJMIS_seekSequence.push(HRJMIS_currTrack);
                HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
                HRJMIS_seekCount += HRJMIS_distance;
                HRJMIS_head = HRJMIS_currTrack;
            }

            HRJMIS_direction = "left";
        }
    }

    return {
        total: HRJMIS_seekCount,
        average: HRJMIS_seekCount / HRJMIS_seekSequence.length,
        seekSequence: HRJMIS_seekSequence,
    };
}

// N-Step SCAN Algorithm
export function nStepScanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_disk_size, HRJMIS_n, HRJMIS_direction = "right") {
    let HRJMIS_chunk = [];
    let HRJMIS_compiledSeekCount = 0;
    let HRJMIS_compiledSeekSequence = [];

    while (HRJMIS_arr.length > 0) {
        HRJMIS_chunk = HRJMIS_arr.splice(0, HRJMIS_n );
        console.log(`chunk: ${JSON.stringify(HRJMIS_chunk)}`);
        let HRJMIS_scanAlgorithmResult = scanAlgorithm(HRJMIS_chunk, HRJMIS_head, HRJMIS_disk_size, HRJMIS_direction);
        console.log(JSON.stringify(HRJMIS_scanAlgorithmResult));
        HRJMIS_compiledSeekCount += HRJMIS_scanAlgorithmResult.total;
        HRJMIS_compiledSeekSequence.push(HRJMIS_scanAlgorithmResult.seekSequence);
        HRJMIS_head = HRJMIS_chunk[HRJMIS_chunk.length - 1];
    }

    console.log("Total number of seek operations = " + HRJMIS_compiledSeekCount);
    console.log("Seek Sequence:");
    console.log(HRJMIS_compiledSeekSequence.flat(Infinity).join(', '));

    return {
        total: HRJMIS_compiledSeekCount,
        average: HRJMIS_compiledSeekCount / HRJMIS_compiledSeekSequence.length,
        seekSequence: HRJMIS_compiledSeekSequence.flat(1)
    };
}

// // Javascript program to demonstrate
//     // SCAN Disk Scheduling algorithm
      
//     let size = 8;
//     let disk_size = 200;
//     let seek_count = 0;
//     let seek_sequence = [];

//     function NSTEP(arr, head, direction, n) {
//         let chunk = new Array;
//         let compiledSeekCount = 0;
//         let compiledSeekSequence = new Array;

//         while (arr.length > 0) {
//             chunk = arr.splice(0,n);
//             SCAN(chunk, head, direction);
//             compiledSeekCount += seek_count;
//             compiledSeekSequence.push(seek_sequence.flat(Infinity).join(', '));
//             seek_count = 0;
//             seek_sequence = [];
//           }
//         console.log("Total number of seek operations = " + compiledSeekCount);
//         console.log("Seek Sequence is");
//         console.log(compiledSeekSequence.flat(Infinity).join(', '));
//     }
 
//     function SCAN(arr, head, direction)
//     {
//         let distance, cur_track;
//         let left = [], right = [];
 
//         // appending end values
//         // which has to be visited
//         // before reversing the direction
//         if (direction == "left")
//             left.push(0);
//         else if (direction == "right")
//             right.push(disk_size - 1);
 
//         for (let i = 0; i < size; i++)
//         {
//             if (arr[i] < head)
//                 left.push(arr[i]);
//             if (arr[i] > head)
//                 right.push(arr[i]);
//         }
 
//         // sorting left and right vectors
//         left.sort(function(a, b){return a - b});
//         right.sort(function(a, b){return a - b});
 
//         // run the while loop two times.
//         // one by one scanning right
//         // and left of the head
//         let run = 2;
//         while (run-- >0)
//         {
//             if (direction == "left")
//             {
//                 for (let i = left.length - 1; i >= 0; i--)
//                 {
//                     cur_track = left[i];
 
//                     // appending current track to seek sequence
//                     seek_sequence.push(cur_track);
 
//                     // calculate absolute distance
//                     distance = Math.abs(cur_track - head);
 
//                     // increase the total count
//                     seek_count += distance;
 
//                     // accessed track is now the new head
//                     head = cur_track;
//                 }
//                 direction = "right";
//             }
//             else if (direction == "right")
//             {
//                 for (let i = 0; i < right.length; i++)
//                 {
//                     cur_track = right[i];
 
//                     // appending current track to seek sequence
//                     seek_sequence.push(cur_track);
 
//                     // calculate absolute distance
//                     distance = Math.abs(cur_track - head);
 
//                     // increase the total count
//                     seek_count += distance;
 
//                     // accessed track is now new head
//                     head = cur_track;
//                 }
//                 direction = "left";
//             }
//         }
//     }
     
//     // request array
     
//     let arr = [ 176, 79, 34, 60, 92, 11, 41, 114 ];
//     let head = 50;
//     let direction = "left";
//     let n = 4;
  

//     NSTEP(arr, head, direction, n);

// C-SCAN Algorithm
export function cScanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_diskSize) {
    let HRJMIS_seekCount = 0;
    let HRJMIS_distance, HRJMIS_currTrack;

    let HRJMIS_left = [];
    let HRJMIS_right = [];
    let HRJMIS_seekSequence = [];

    HRJMIS_left.push(0);
    HRJMIS_right.push(HRJMIS_diskSize - 1);

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_arr.length; HRJMIS_i++) {
        if (HRJMIS_arr[HRJMIS_i] < HRJMIS_head) {
            HRJMIS_left.push(HRJMIS_arr[HRJMIS_i]);
        }

        if (HRJMIS_arr[HRJMIS_i] > HRJMIS_head) {
            HRJMIS_right.push(HRJMIS_arr[HRJMIS_i]);
        }
    }

    HRJMIS_left.sort((HRJMIS_a, HRJMIS_b) => HRJMIS_a - HRJMIS_b);
    HRJMIS_right.sort((HRJMIS_a, HRJMIS_b) => HRJMIS_a - HRJMIS_b);

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_right.length; HRJMIS_i++) {
        HRJMIS_currTrack = HRJMIS_right[HRJMIS_i];
        HRJMIS_seekSequence.push(HRJMIS_currTrack);
        HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
        HRJMIS_seekCount += HRJMIS_distance;
        HRJMIS_head = HRJMIS_currTrack;
    }

    HRJMIS_head = 0;
    HRJMIS_seekCount += (HRJMIS_diskSize - 1);

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_left.length; HRJMIS_i++) {
        HRJMIS_currTrack = HRJMIS_left[HRJMIS_i];
        HRJMIS_seekSequence.push(HRJMIS_currTrack);
        HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
        HRJMIS_seekCount += HRJMIS_distance;
        HRJMIS_head = HRJMIS_currTrack;
    }

    return {
        total: HRJMIS_seekCount,
        average: HRJMIS_seekCount / HRJMIS_seekSequence.length,
        seekSequence: HRJMIS_seekSequence
    };
}