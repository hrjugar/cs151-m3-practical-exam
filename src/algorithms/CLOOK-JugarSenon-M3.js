// C-LOOK Algorithm
export default function cLookAlgorithm(HRJMIS_arr, HRJMIS_head) {
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
    
    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_right.length; HRJMIS_i++) {
        HRJMIS_currTrack = HRJMIS_right[HRJMIS_i];
        HRJMIS_seekSequence.push(HRJMIS_currTrack);
        HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
        HRJMIS_seekCount += HRJMIS_distance;
        HRJMIS_head = HRJMIS_currTrack;
    }
    
    if (HRJMIS_left.length) {
        HRJMIS_seekCount += Math.abs(HRJMIS_head - HRJMIS_left[0]);
        HRJMIS_head = HRJMIS_left[0];
    
        for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_left.length; HRJMIS_i++) {
            HRJMIS_currTrack = HRJMIS_left[HRJMIS_i];
            HRJMIS_seekSequence.push(HRJMIS_currTrack);
            HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head);
            HRJMIS_seekCount += HRJMIS_distance;
            HRJMIS_head = HRJMIS_currTrack;
        }
    }

    return {
        total: HRJMIS_seekCount,
        average: HRJMIS_seekCount / HRJMIS_seekSequence.length,
        seekSequence: HRJMIS_seekSequence
    };
}