module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/larryvrh/MiniMax-H3-Turbo-Lora/resolve/main/minimax_h3_turbo_v4_step600_ema.safetensors?download=true",
        dir: "../app/models/loras"
      }
    }
  ]
}