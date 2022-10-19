// SCAN Algorithm
export default function scanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_disk_size, HRJMIS_direction = "right") {
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