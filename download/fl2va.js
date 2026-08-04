// H3-Base-FL2VA -- text-to-video, first-frame, last-frame, first+last-frame.
//
// "pruned" drops the ~13B AdaLN-branch parameters. Per the MiniMax model card,
// AdaLN modulation outputs are precomputed and cached, so those weights are
// "not needed for inference-only deployment" -- this is not a quality tradeoff.
// 33B -> ~20B, then INT8 ConvRot quantized: 21.0 GB (vs 66.3 GB for bf16).
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/diffusion_models/minimax_h3_fl2va_pruned_int8_convrot.safetensors?download=true",
        dir: "../app/models/diffusion_models"
      }
    }
  ]
}
