var el = function() {}

el.prototype.Config = function(options) {
    for (var key in options) {
      this[key] = options[key]
    }
}

window.EL = new el()

EL.Config({
    uin: "",
    identity: 'manager',
})