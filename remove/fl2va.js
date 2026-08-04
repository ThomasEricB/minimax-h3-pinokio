// Frees 21.0 GB by deleting the FL2VA transformer.
// The shared encoder/VAEs and the Ref2VA transformer are left untouched.
// Re-downloadable any time from "Download Models" in the menu.
module.exports = {
  run: [
    {
      method: "fs.rm",
      params: {
        path: "../app/models/diffusion_models/minimax_h3_fl2va_pruned_int8_convrot.safetensors"
      }
    }
  ]
}
