/**
 * You can update this method with an actual Weather API call. This will just look up a data object from a small
 * list in a file.
 *
 * @param bodyArea the body area where to exercise
 * @returns {Object} an object with body area and routine, or an empty object
 */
const getExercise = (bodyArea) => {

    if (bodyArea) {
        const exercise = `Sit on a mat in a cross-legged position. You can also sit on a chair
                          with your feet flat on the floor. Make sure to keep your spine straight.
                          Place your left palm on the top of your head and inhale. Now, slowly tilt
                          your head to the left with exhalation. Here, you also need to apply gentle
                          pressure with your palm to give a deeper stretch. Hold the position for
                          30 seconds. Now, slowly lift your head up and release your hands. Repeat
                          the same posture on the other side. You can do 4-5 sets.`
        const duration = 2
        return {
                    'bodyArea': bodyArea,
                    'duration': duration,
                    'routine': exercise
                };
    }

    return {};
};

module.exports = {
    getExercise
};