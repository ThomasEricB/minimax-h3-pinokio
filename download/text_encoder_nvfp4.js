//   Text Encoder shared by BOTH H3 variants (FL2VA and Ref2VA) [NVIDIA ONLY].
//   qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors  15.7 GB  (H3-Encoder, Blackwell-native NVFP4)
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors?download=true",
        dir: "../app/models/text_encoders"
      }
    }
  ]
}