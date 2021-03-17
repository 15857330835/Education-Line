var el = function() {}

el.prototype.Config = function(options) {
    for (var key in options) {
      this[key] = options[key]
    }
}

window.EL = new el()

EL.Config({
    uin: "陈振兴",
    identity: 'manager',
    test: function() {
      console.log(1111,navigator)
    }
})