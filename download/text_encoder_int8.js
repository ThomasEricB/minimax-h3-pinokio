// Optional upgrade: INT8 ConvRot H3-Encoder (27.1 GB) instead of NVFP4 AWQ (15.7 GB).
//
// Higher-fidelity prompt encoding, but it will not co-reside in 32 GB of VRAM
// alongside the 21 GB transformer, so ComfyUI swaps the two between the encode
// and sample stages of every run. Only worth it if you have VRAM to spare or
// you are chasing maximum prompt adherence.
//
// Both files can sit on disk at once -- pick which one to load in the workflow's
// "Load CLIP" node.
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_int8_convrot.safetensors?download=true",
        dir: "../app/models/text_encoders"
      }
    }
  ]
}
