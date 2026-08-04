// Removes ComfyUI and its venv so Install can run clean.
// The ~63 GB of H3 weights live on a Pinokio virtual drive (linked in via
// install.js) and are NOT deleted here -- a reset will not re-download them.
// To actually free that space, use "Manage Disk Space" in the menu.
module.exports = {
  run: [
    {
      method: "fs.rm",
      params: {
        path: "app"
      }
    }
  ]
}
