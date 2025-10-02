(function(window) {
 
  var evenWord = "Even Hello";
  var oddWord = "Odd Bye";

  var evenOddSpeaker = {};

  evenOddSpeaker.speak = function(name) {
    if (name.length % 2 === 0) {
      console.log(evenWord + " " + name + " (length = " + name.length + ")");
    } else {
      console.log(oddWord + " " + name + " (length = " + name.length + ")");
    }
  };

 
  window.evenOddSpeaker = evenOddSpeaker;

})(window);
