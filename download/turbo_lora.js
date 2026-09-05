module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/lightx2v/Minimax-h3-Turbo/resolve/main/minimax_h3_fl2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors?download=true",
        dir: "../app/models/loras"
      }
    }
  ]
}