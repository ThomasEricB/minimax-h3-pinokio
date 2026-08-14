// vision language model for prompt enhancer
// Qwen-VL-4B-BF16, 4B parameters, 32k context length, bf16 weights.
// Downloaded from https://huggingface.co/Comfy-Org/Qwen3-VL
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Comfy-Org/Qwen3-VL/resolve/main/text_encoders/qwen3vl_4b_bf16.safetensors?download=true",
        dir: "../app/models/clip"
      }
    }
  ]
}