// MiniMax H3 requires a CUDA 13.0+ build of PyTorch.
//
// ComfyUI's comfy/quant_ops.py disables the accelerated comfy-kitchen CUDA
// backend when torch.version.cuda < 13 ("You need pytorch with cu130 or higher
// to use optimized CUDA operations"). Every H3 weight this launcher downloads is
// quantized -- NVFP4 (TensorCoreNVFP4Layout) and INT8 ConvRot
// (TensorCoreConvRotW4A4Layout) -- so a cu12x torch would still run, but on a
// dramatically slower path.
//
// IMPORTANT: as of ComfyUI's current requirements.txt, a plain
// `uv pip install -r requirements.txt` ALREADY resolves to a CUDA 13 stack from
// PyPI (torch 2.13.0 + torchvision 0.28.0 + torchaudio 2.11.0 -- torch 2.13.0
// depends on nvidia-cudnn-cu13 / nvidia-nccl-cu13). This step is therefore not a
// fix, it is a guarantee: it pins those same versions explicitly to the cu130
// index so the launcher keeps working if PyPI's default torch ever reverts to a
// cu12x build.
//
// Keep these pins equal to what ComfyUI itself resolves. Pinning lower
// "known good" versions here silently DOWNGRADES a working install.
//
// The stock system torch.js (prototype/system/examples/torch.js) pins
// torch 2.7.0+cu128, which would break the quantized path -- hence this local copy.
module.exports = {
  run: [
    // nvidia windows
    {
      "when": "{{gpu === 'nvidia' && platform === 'win32'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.13.0+cu130 torchvision==0.28.0+cu130 torchaudio==2.11.0+cu130 --index-url https://download.pytorch.org/whl/cu130",
          "{{args && args.triton ? 'uv pip install triton-windows' : ''}}"
        ]
      },
      "next": null
    },
    // nvidia linux
    {
      "when": "{{gpu === 'nvidia' && platform === 'linux'}}",
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": [
          "uv pip install torch==2.13.0+cu130 torchvision==0.28.0+cu130 torchaudio==2.11.0+cu130 --index-url https://download.pytorch.org/whl/cu130",
          "{{args && args.triton ? 'uv pip install triton' : ''}}"
        ]
      },
      "next": null
    },
    // cpu fallback (H3 is not practical here, but keeps the install from breaking)
    {
      "method": "shell.run",
      "params": {
        "venv": "{{args && args.venv ? args.venv : null}}",
        "path": "{{args && args.path ? args.path : '.'}}",
        "message": "uv pip install torch==2.13.0 torchvision==0.28.0 torchaudio==2.11.0 --index-url https://download.pytorch.org/whl/cpu"
      }
    }
  ]
}
