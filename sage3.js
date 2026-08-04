// SageAttention 3 (Blackwell FP4 attention) -- optional speed upgrade.
//
// Measured on this launcher's stack (RTX 5090, sm_120, torch 2.13.0+cu130):
//   (1,24, 4096,128)   1.25ms -> 0.51ms   2.44x
//   (1,24,16384,128)  18.54ms -> 6.03ms   3.07x
//   (1,16,32768,128)  48.77ms -> 14.70ms  3.32x
// The speedup grows with sequence length, which is exactly H3's regime (it packs
// video + audio into one long sequence), so longer//higher-res jobs benefit most.
//
// Why this needs its own CUDA toolkit:
// torch/utils/cpp_extension.py raises on a CUDA *major* version mismatch, so the
// extension must be compiled with nvcc 13.x to match our cu130 torch. Pinokio's
// bundled nvcc is 12.8, hence a private CUDA 13.0 toolkit in ./cuda13 (~4.9GB).
// 13.0 is an exact match for torch's 13.0 -- not even a minor-version warning.
//
// Selection is NOT via --use-sage-attention (that flag picks SageAttention 1/2 and
// requires the separate `sageattention` package). ComfyUI registers this build as
// the "sage3" attention function, chosen per-model through
// transformer_options["optimized_attention_override"]. The node that sets it is
// KJNodes' "Patch Sage Attention KJ", installed below -- set its mode to
// `sageattn3`, wired between your model loader and the sampler.
//
// Blackwell only: upstream setup.py compiles for sm_100 / sm_120 / sm_121.
module.exports = {
  run: [
    // CUDA 13.0 toolkit, matching torch's cu130. Skipped if already present.
    {
      when: "{{!exists('cuda13')}}",
      method: "shell.run",
      params: {
        message: "conda create -y -p cuda13 -c nvidia cuda-toolkit=13.0.1"
      }
    },
    {
      when: "{{!exists('SageAttention')}}",
      method: "shell.run",
      params: {
        message: "git clone --depth 1 https://github.com/thu-ml/SageAttention"
      }
    },
    // Builds fp4attn_cuda + fp4quant_cuda. setup.py auto-clones CUTLASS (~208MB).
    // Expect a long compile; CUTLASS FP4 kernels are slow to build.
    {
      method: "shell.run",
      params: {
        path: "SageAttention/sageattention3_blackwell",
        venv: "../../app/env",
        env: {
          CUDA_HOME: "{{cwd}}/cuda13",
          TORCH_CUDA_ARCH_LIST: "12.0+PTX",
          MAX_JOBS: "8"
        },
        message: [
          "python setup.py bdist_wheel"
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        path: "SageAttention/sageattention3_blackwell",
        venv: "../../app/env",
        message: [
          "uv pip install dist/sageattn3-*.whl"
        ]
      }
    },
    // Provides "Patch Sage Attention KJ", the node that actually selects sageattn3.
    {
      when: "{{!exists('app/custom_nodes/ComfyUI-KJNodes')}}",
      method: "shell.run",
      params: {
        path: "app/custom_nodes",
        message: "git clone --depth 1 https://github.com/kijai/ComfyUI-KJNodes"
      }
    },
    {
      method: "shell.run",
      params: {
        path: "app/custom_nodes/ComfyUI-KJNodes",
        venv: "../../env",
        message: "uv pip install -r requirements.txt"
      }
    },
    // Verify the kernel actually runs before declaring success.
    {
      method: "shell.run",
      params: {
        path: "app",
        venv: "env",
        message: [
          "python -c \"import torch;from sageattn3 import sageattn3_blackwell;q,k,v=(torch.randn(1,8,2048,128,dtype=torch.bfloat16,device='cuda') for _ in range(3));o=sageattn3_blackwell(q,k,v,is_causal=False);torch.cuda.synchronize();print('SageAttention3 OK:',tuple(o.shape),o.dtype)\""
        ]
      }
    },
    {
      method: "fs.write",
      params: {
        path: "sage3.installed",
        text: "sageattn3 built for sm_120 against torch cu130"
      }
    }
  ]
}
