// LOOK Algorithm
export default function lookAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_direction = "right") {
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