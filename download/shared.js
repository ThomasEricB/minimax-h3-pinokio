// Components shared by BOTH H3 variants (FL2VA and Ref2VA).
// Downloaded once; the transformer scripts add only their own weights on top.
//
//   qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors  15.7 GB  (H3-Encoder, Blackwell-native NVFP4)
//   minimax_h3_video_vae_fp16.safetensors          5.2 GB  (H3-VisualVAE)
//   minimax_h3_audio_vae_fp32.safetensors          0.6 GB  (H3-AudioVAE, 32kHz stereo)
//                                                 -------
//                                                 21.5 GB
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors?download=true",
        dir: "../app/models/text_encoders"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_video_vae_fp16.safetensors?download=true",
        dir: "../app/models/vae"
      }
    },
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/MiniMax-H3/resolve/main/vae/minimax_h3_audio_vae_fp32.safetensors?download=true",
        dir: "../app/models/vae"
      }
    }
  ]
}
