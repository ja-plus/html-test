var Status;
(function (Status) {
  Status[(Status["start"] = 0)] = "start";
  Status[(Status["end"] = 1)] = "end";
})(Status || (Status = {}));
console.log(Status.start);
console.log(0 /* start */);
var Person = /** @class */ (function () {
  function Person() {
    this.name = "tom";
  }
  return Person;
})();
