module.exports = {
  requires: {
    bundle: "ai"
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",
        env: {
          TOKENIZERS_PARALLELISM: "false"
        },
        path: "app",
        message: [
          "python main.py"
        ],
        on: [{
          // ComfyUI prints "Starting server" and the URL on SEPARATE lines, so a
          // combined "starting server.+(url)" pattern never matches ('.' does not
          // span \r\n) and the Open Web UI menu item would never appear.
          // Verified against logs/api/start.js: the GUI url is the only http:// in
          // the output, so the generic capture is unambiguous.
          "event": "/To see the GUI go to: +(http:\/\/[a-zA-Z0-9.]+:[0-9]+)/i",
          "done": true
        }, {
          "event": "/errno/i",
          "break": false
        }, {
          "event": "/error:/i",
          "break": false
        }]
      }
    },
    {
      // Sets the 'url' local variable that pinokio.js reads to show "Open Web UI".
      method: "local.set",
      params: {
        url: "http://localhost:8188"
      }
    }
  ]
}
