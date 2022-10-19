// N-Step SCAN Algorithm
import scanAlgorithm from "./SCAN-JugarSenon-M3";

export default function nStepScanAlgorithm(HRJMIS_arr, HRJMIS_head, HRJMIS_disk_size, HRJMIS_n, HRJMIS_direction = "right") {
    let HRJMIS_chunk = [];
    let HRJMIS_compiledSeekCount = 0;
    let HRJMIS_compiledSeekSequence = [];

    while (HRJMIS_arr.length > 0) {
        HRJMIS_chunk = HRJMIS_arr.splice(0, HRJMIS_n ); // separates the track list by chunks of N
        let HRJMIS_scanAlgorithmResult = scanAlgorithm(HRJMIS_chunk, HRJMIS_head, HRJMIS_disk_size, HRJMIS_direction); // perform scan algorithm on chunk
        HRJMIS_compiledSeekCount += HRJMIS_scanAlgorithmResult.total;
        HRJMIS_compiledSeekSequence.push(HRJMIS_scanAlgorithmResult.seekSequence);
        HRJMIS_head = HRJMIS_chunk[HRJMIS_chunk.length - 1];
    }

    return {
        total: HRJMIS_compiledSeekCount,
        average: HRJMIS_compiledSeekCount / HRJMIS_compiledSeekSequence.length,
        seekSequence: HRJMIS_compiledSeekSequence.flat(1)
    };
}