module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-Manager",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-MiniMax-H3-Turbo",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-H3-VisionPromptor",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-Custom-Scripts",
        message: "git pull"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/rgthree-comfy",
        message: "git pull"
      }
    },
    {
      when: "{{platform === 'win32' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-KJNodes",
        message: "git pull",
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -r requirements.txt"
        ]
      }
    },
    {
      when: "{{platform === 'win32' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        venv: "../../env",
        path: "app/custom_nodes/ComfyUI-KJNodes",
        message: [ "uv pip install -r requirements.txt", ]
      }
    },
    // Re-assert the cu130 pins after requirements.txt, so a future change to
    // ComfyUI's default torch can't knock the quantized H3 weights off the
    // accelerated path. No-op when already on the pinned versions.
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app"
        }
      }
    },
    {
      method: "script.start",
      params: {
        uri: "workflows.js"
      }
    }
  ]
}
