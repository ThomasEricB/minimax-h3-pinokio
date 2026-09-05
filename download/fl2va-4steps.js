// FastVideo Minimax H3 fl2va Model
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/Kijai/MiniMax-H3-experimental/resolve/main/minimax_h3_fastvideo_vsa_datafree_1300step_4step_int8_convrot.safetensors?download=true",
        dir: "../app/models/diffusion_models"
      }
    }
  ]
}