// First Come First Served Algorithm
export default function fcfsAlgorithm(HRJMIS_arr, HRJMIS_head) {
    let HRJMIS_seekCount = 0; // total track movement
    let HRJMIS_distance, HRJMIS_currTrack;

    for (let HRJMIS_i = 0; HRJMIS_i < HRJMIS_arr.length; HRJMIS_i++) {
        HRJMIS_currTrack = HRJMIS_arr[HRJMIS_i];
        HRJMIS_distance = Math.abs(HRJMIS_currTrack - HRJMIS_head); // calculate distance between two tracks
        HRJMIS_seekCount += HRJMIS_distance; // add distance to total traack movement
        HRJMIS_head = HRJMIS_currTrack;
    }

    return {
        total: HRJMIS_seekCount,
        average: HRJMIS_seekCount / HRJMIS_arr.length,
        seekSequence: HRJMIS_arr
    };
}