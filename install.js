module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    // MiniMax H3 runs natively in ComfyUI (comfy_extras/nodes_minimax_h3.py on
    // master) -- no custom nodes or wrapper repos are needed.
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/comfyanonymous/ComfyUI app"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/ltdrdata/ComfyUI-Manager"
        ],
        path: "app/custom_nodes"
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
    // Install comfyui-miniMax-h3-turbo Nodes
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/larryvrh/ComfyUI-MiniMax-H3-Turbo"
        ],
      }
    },
    // Install KJNodes
    {
      when: "{{platform === 'win32' && gpu === 'nvidia'}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: [
          "git clone https://github.com/kijai/ComfyUI-KJNodes"
        ],
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
    // Must run AFTER requirements.txt so its pins win. ComfyUI's requirements
    // already resolve to a CUDA 13 torch today, so this is a guarantee rather
    // than a fix -- the H3 NVFP4 / INT8-ConvRot weights need cu130 to hit the
    // accelerated comfy-kitchen kernels. See torch.js for the details.
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
    // Store the weights on a Pinokio virtual drive instead of inside app/.
    // Two reasons that matter here: 63 GB of H3 weights survive a Reset, and
    // any peer ComfyUI install shares the same files instead of re-downloading.
    {
      method: "fs.link",
      params: {
        drive: {
          "diffusion_models": "app/models/diffusion_models",
          "text_encoders": "app/models/text_encoders",
          "vae": "app/models/vae",
          "checkpoints": "app/models/checkpoints",
          "clip": "app/models/clip",
          "clip_vision": "app/models/clip_vision",
          "controlnet": "app/models/controlnet",
          "embeddings": "app/models/embeddings",
          "loras": "app/models/loras",
          "unet": "app/models/unet",
          "upscale_models": "app/models/upscale_models",
          "vae_approx": "app/models/vae_approx"
        },
        peers: [
          "https://github.com/cocktailpeanutlabs/comfyui.git",
          "https://github.com/pinokiofactory/comfy.git"
        ]
      }
    },
    {
      method: "fs.link",
      params: {
        drive: {
          "output": "app/output"
        }
      }
    },
    // ~63 GB total. Shared encoder + VAEs first, then each transformer.
    {
      method: "script.start",
      params: {
        uri: "download/shared.js"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "download/fl2va.js"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "download/ref2va.js"
      }
    },
    {
      method: "script.start",
      params: {
        uri: "download/turbo_lora.js"
      }
    },
    // Ready-to-run graphs in the Workflows sidebar, models already selected.
    {
      method: "script.start",
      params: {
        uri: "workflows.js"
      }
    }
  ]
}
