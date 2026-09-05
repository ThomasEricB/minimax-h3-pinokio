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
    // Install H3-Optimizations Nodes
    {
      when: "{{!exists('app/custom_nodes/H3-Optimizations')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: "git clone https://github.com/Zironic/H3-Optimizations"
      }
    },
    // Install comfyui-h3-VisionPromptor Nodes
    {
      when: "{{!exists('app/custom_nodes/ComfyUI-H3-VisionPromptor')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/benjiyaya/ComfyUI-H3-VisionPromptor"
        ],
      }
    },
    // Install comfyui-custom-scripts Nodes
    {
      when: "{{!exists('app/custom_nodes/ComfyUI-Custom-Scripts')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/pythongosssss/ComfyUI-Custom-Scripts"
        ],
      }
    },
    // Install rgthree-comfy Nodes
    {
      when: "{{!exists('app/custom_nodes/rgthree-comfy')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/rgthree/rgthree-comfy"
        ],
      }
    },
    // Install ComfyUI-ClipProjection Nodes
    {
      when: "{{!exists('app/custom_nodes/ComfyUI-ClipProj')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/nicolab28/ComfyUI-ClipProj"
        ],
      }
    },
    // Install KJNodes
    {
      when: "{{platform === 'win32' && gpu === 'nvidia' && !exists('app/custom_nodes/ComfyUI-KJNodes')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/kijai/ComfyUI-KJNodes"
        ],
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/H3-Optimizations",
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
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-ClipProj",
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
      method: "shell.run",
      params: {
        venv: "../../env",
        path: "app/custom_nodes/ComfyUI-Manager",
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
    },
    {
      method: "input",
      params: {
        title: "Update Finished",
        description: "Missing Models can be downloaded with the <b>Download Models</b> button on the left side menu. (Only visible when Minimax H3 Comfyui is NOT running).<br>All Missing Models get automatically downloaded by clicking the <b>Install</b> button on the left side menu."
      }
    }
  ]
}
