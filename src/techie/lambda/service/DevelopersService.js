'use strict';


/**
 * exercise to release pain
 * By passing in the appropriate options, you can search for appropriate exercise for a particular body area 
 *
 * area String pass an required body area search string for looking up excercise
 * duration Integer number of minutes for the excercise
 * limit Integer maximum number of records to return (optional)
 * returns List
 **/
exports.searchExercise = function(area,duration,limit) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "duration" : 2,
  "name" : "neck exercise",
  "exercise" : {
    "name" : "seated neck release",
    "steps" : "Sit on a mat in a cross-legged position. You can also sit on a chair with your feet flat on the floor. Make sure to keep your spine straight. Place your left palm on the top of your head and inhale. Now, slowly tilt your head to the left with exhalation. Here, you also need to apply gentle pressure with your palm to give a deeper stretch. Hold the position for 30 seconds. Now, slowly lift your head up and release your hands. Repeat the same posture on the other side. You can do 4-5 sets."
  },
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
}, {
  "duration" : 2,
  "name" : "neck exercise",
  "exercise" : {
    "name" : "seated neck release",
    "steps" : "Sit on a mat in a cross-legged position. You can also sit on a chair with your feet flat on the floor. Make sure to keep your spine straight. Place your left palm on the top of your head and inhale. Now, slowly tilt your head to the left with exhalation. Here, you also need to apply gentle pressure with your palm to give a deeper stretch. Hold the position for 30 seconds. Now, slowly lift your head up and release your hands. Repeat the same posture on the other side. You can do 4-5 sets."
  },
  "id" : "d290f1ee-6c54-4b01-90e6-d701748f0851"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

