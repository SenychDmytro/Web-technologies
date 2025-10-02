(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  // 1
  console.log("=== Original filtering (first letter J) ===");
  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === "j") {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }

  // 2
  console.log("\n=== New filtering (Even/Odd name length) ===");
  for (var i = 0; i < names.length; i++) {
    evenOddSpeaker.speak(names[i]);
  }
})();
