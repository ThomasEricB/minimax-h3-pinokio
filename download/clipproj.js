// Download Clip Projection Model for AMD
module.exports = {
  run: [
    {
      method: "fs.download",
      params: {
        uri: "https://huggingface.co/NicoLab28/ClipProj-MiniMax-H3/resolve/main/mmh3-4b-ClipProj-v3.1-mlp.safetensors?download=true",
        dir: "../app/models/clip_projections"
      }
    }
  ]
}