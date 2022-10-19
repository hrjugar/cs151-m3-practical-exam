// Shortest Seek Time First Algorithm

// Calculate distance between track numbers
function calculateDifference(HRJMIS_request, HRJMIS_headloc, HRJMIS_diff) {
    for (let HRJMIS_i = 0; HRJMIS_i<HRJMIS_diff.length; HRJMIS_i++) {
        HRJMIS_diff[HRJMIS_i][0] = Math.abs(HRJMIS_request[HRJMIS_i] - HRJMIS_headloc);
    }
}

// Find untouched track that has the smallest distance with the head
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

export default function sstfAlgorithm(HRJMIS_request, HRJMIS_headloc) {
    if (HRJMIS_request.length == 0) {
        return;
    }
    
    let HRJMIS_len = HRJMIS_request.length;
    let HRJMIS_diff = new Array(); // list that stores the distance between each track and the track pointed by the head
    let HRJMIS_seek_sequence = new Array(HRJMIS_len + 1);
    let HRJMIS_seek_count = 0; // total track movement

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