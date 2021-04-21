var el = function() {}

el.prototype.Config = function(options) {
    for (var key in options) {
      this[key] = options[key]
    }
}

var port = window.location.href.slice(0, 5) == 'https' ? 'https' : 'http'

window.EL = new el()

EL.Config({
    uin: "",
    identity: 'manager',
    host: port + '://edu.aodianyun.com',
    upload: port == 'http' ? 'http://upload.dvr.aodianyun.com/v2/DVR.FormUpload' : 'https://upload-dvr.aodianyun.com/v2/DVR.FormUpload'
})