
export default {
    Domain: function () {
      return window.location.hostname.includes("localhost")
        ? "http://127.0.0.1:8000"
        : "";
    },
    API1:function()
    {
        return "/api/car/"
    },
    API2:function()
    {
        return "/api/path/"
    },
    API3:function()
    {
        return "/api/race/"
    },
    API4:function()
    {
        return "/api/break/"
    },
}