// Installs the bundled H3 workflows into ComfyUI's user workflow folder, so they
// show up in the Workflows sidebar ready to run -- models already selected.
//
// The two "(sage3)" graphs are the official Comfy-Org templates with a
// "Patch Sage Attention KJ" node spliced between the UNETLoader and the model
// consumers (BasicGuider + BasicScheduler), mode `sageattn3`. Set that node to
// `disabled` to A/B against stock attention.
//
// Safe to re-run: it overwrites the three bundled files and touches nothing else,
// so your own saved workflows are never affected.
module.exports = {
  run: [
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Text to Video (sage3).json",
        dest: "app/user/default/workflows/MiniMax H3 - Text to Video (sage3).json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Reference to Video (sage3).json",
        dest: "app/user/default/workflows/MiniMax H3 - Reference to Video (sage3).json"
      }
    },
    {
      method: "fs.copy",
      params: {
        src: "workflows/MiniMax H3 - Image to Video (stock).json",
        dest: "app/user/default/workflows/MiniMax H3 - Image to Video (stock).json"
      }
    }
  ]
}

// Note: which workflow auto-opens is browser localStorage state
// (Comfy.Workflow.LastOpenPaths:<user>), not a server-side file, so it cannot be
// preset from here. ComfyUI's "Comfy.Workflow.Persist" setting (on by default)
// reopens the last-used workflow, so opening one of these once makes it stick.
