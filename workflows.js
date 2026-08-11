// Installs the bundled H3 workflows into ComfyUI's user workflow folder, so they
// show up in the Workflows sidebar ready to run -- models already selected.
//
// The two "(sage2)" graphs are the official Comfy-Org templates with a
// "Patch Sage Attention KJ" node spliced between the UNETLoader and the model
// consumers (BasicGuider + BasicScheduler), mode `sageattn2`. Set that node to
// `disabled` to A/B against stock attention.
//
// Safe to re-run: it overwrites the four bundled files and the small sidebar
// helper only, so your own saved workflows are never affected.
module.exports = {
  run: [
    {
      method: "fs.copy",
      params: {
        src: "custom_nodes/minimax_h3_pinokio/__init__.py",
        dest: "app/custom_nodes/minimax_h3_pinokio/__init__.py"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "custom_nodes/minimax_h3_pinokio/web/open-workflows.js",
        dest: "app/custom_nodes/minimax_h3_pinokio/web/open-workflows.js"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Text to Video.json",
        dest: "app/user/default/workflows/MiniMax H3 - Text to Video.json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Text to Video (NVIDIA).json",
        dest: "app/user/default/workflows/MiniMax H3 - Text to Video (NVIDIA).json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Reference to Video.json",
        dest: "app/user/default/workflows/MiniMax H3 - Reference to Video.json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Reference to Video (NVIDIA).json",
        dest: "app/user/default/workflows/MiniMax H3 - Reference to Video (NVIDIA).json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Image to Video.json",
        dest: "app/user/default/workflows/MiniMax H3 - Image to Video.json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Image to Video (NVIDIA).json",
        dest: "app/user/default/workflows/MiniMax H3 - Image to Video (NVIDIA).json"
      }
    }
  ]
}

// The bundled frontend helper opens the Workflows sidebar on each page load.
// ComfyUI still controls which workflow is active through its normal browser
// persistence, so this does not overwrite the user's current graph.
