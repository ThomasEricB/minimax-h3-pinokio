module.exports = {
  version: "8.0",
  title: "MiniMax H3 ComfyUI",
  description: "MiniMax H3 omni-modal video generation in ComfyUI. Text/image/video/audio in, video with native 32kHz stereo audio out (768p default, 1080p+ supported). Disk-optimized: pruned INT8 + NVFP4 weights (~63GB instead of ~290GB). NVIDIA only.",
  icon: "icon.png",
  menu: async (kernel, info) => {
    let installed = info.exists("app/env")
    let running = {
      install: info.running("install.js"),
      start: info.running("start.js"),
      update: info.running("update.js"),
      reset: info.running("reset.js")
    }
    let downloading = [
      "download/text_encoder_nvfp4.js",
      "download/qwen3_vl_4b.js",
      "download/text_encoder_int8.js",
      "download/vae.js",
      "download/fl2va.js",
      "download/ref2va.js",
      "download/fl2va-4steps.js",
      "download/turbo_lora.js",
      "download/turbo_lora2.js",
      "download/clipproj.js",
      "remove/fl2va.js",
      "remove/ref2va.js",
      "remove/fl2va-4steps.js",
      "remove/turbo_lora.js",
      "remove/turbo_lora2.js",
      "workflows.js"
    ]
    let is_downloading = null
    for (let item of downloading) {
      if (info.running(item) === true) {
        is_downloading = item
        break;
      }
    }

    // Which weights are actually on disk right now -- drives the menu below.
    let has = {
      fl2va: info.exists("app/models/diffusion_models/minimax_h3_fl2va_pruned_int8_convrot.safetensors"),
      ref2va: info.exists("app/models/diffusion_models/minimax_h3_ref2va_pruned_int8_convrot.safetensors"),
      encoder_nvfp4: info.exists("app/models/text_encoders/qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors"),
      encoder_int8: info.exists("app/models/text_encoders/qwen3vl_32b_minimax_h3_int8_convrot.safetensors"),
      vae: info.exists("app/models/vae/minimax_h3_video_vae_fp16.safetensors"),
      turbo_lora: info.exists("app/models/loras/minimax_h3_fl2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors"),
      turbo_lora2: info.exists("app/models/loras/minimax_h3_ref2v_turbo_8step_v1.0_768p_comfyui_bf16.safetensors"),
      prompt_enhancer: info.exists("app/models/clip/qwen3vl_4b_bf16.safetensors"),
      fast_video: info.exists("app/models/diffusion_models/minimax_h3_fastvideo_vsa_datafree_1300step_4step_int8_convrot.safetensors"),
      clipproj: info.exists("app/models/clip_projections/mmh3-4b-ClipProj-v3.1-mlp.safetensors")
    }

    if (running.install) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }]
    } else if (installed) {
      if (running.start) {
        let local = info.local("start.js")
        if (local && local.url) {
          return [{
            default: true,
            icon: "fa-solid fa-rocket",
            text: "Open Web UI",
            href: local.url,
          }, {
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          }]
        } else {
          return [{
            default: true,
            icon: "fa-solid fa-terminal",
            text: "Terminal",
            href: "start.js",
          }]
        }
      } else if (is_downloading) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Downloading",
          href: is_downloading,
        }]
      } else if (running.update) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Updating",
          href: "update.js",
        }]
      } else if (running.reset) {
        return [{
          default: true,
          icon: "fa-solid fa-terminal",
          text: "Resetting",
          href: "reset.js",
        }]
      }

      // Only offer what is missing.
      let downloads = []
      if (!has.fl2va) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "FL2VA — text / first / last frame (21.0GB)",
          href: "download/fl2va.js",
          mode: "refresh"
        })
      }
      if (!has.ref2va) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "Ref2VA — omni-reference (21.0GB)",
          href: "download/ref2va.js",
          mode: "refresh"
        })
      }
      if (!has.fast_video) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "FastVideo — experimental (22.0GB)",
          href: "download/fl2va-4steps.js",
          mode: "refresh"
        })
      }
      if (!has.encoder_nvfp4) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "NVFP4 text encoder — [NVIDIA ONLY] (15.7GB)",
          href: "download/text_encoder_nvfp4.js",
          mode: "refresh"
        })
      }
      if (!has.encoder_int8) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "int8 text encoder — optional upgrade [High VRAM] (27.1GB)",
          href: "download/text_encoder_int8.js",
          mode: "refresh"
        })
      }
      if (!has.vae) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "Video and Audio VAE (5.8GB)",
          href: "download/vae.js",
          mode: "refresh"
        })
      }
      if (!has.turbo_lora) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "Turbo LoRA - fl2va (1.96GB)",
          href: "download/turbo_lora.js",
          mode: "refresh"
        })
      }
      if (!has.turbo_lora2) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "Turbo LoRA - ref2va (1.96GB)",
          href: "download/turbo_lora2.js",
          mode: "refresh"
        })
      }
      if (!has.prompt_enhancer) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "Prompt Enhancer (8.88GB)",
          href: "download/qwen3_vl_4b.js",
          mode: "refresh"
        })
      }
      if (!has.clipproj) {
        downloads.push({
          icon: "fa-solid fa-download",
          text: "Clip Projecction model [AMD ONLY] (503MB)",
          href: "download/clipproj.js",
          mode: "refresh"
        })
      }

      // Each variant is independently removable -- 21GB back per click.
      let removals = []
      if (has.fl2va) {
        removals.push({
          icon: "fa-regular fa-trash-can",
          text: "Delete FL2VA weights (frees 21.0GB)",
          href: "remove/fl2va.js",
          mode: "refresh",
          confirm: "Delete the FL2VA transformer? You can re-download it later."
        })
      }
      if (has.ref2va) {
        removals.push({
          icon: "fa-regular fa-trash-can",
          text: "Delete Ref2VA weights (frees 21.0GB)",
          href: "remove/ref2va.js",
          mode: "refresh",
          confirm: "Delete the Ref2VA transformer? You can re-download it later."
        })
      }
      if (has.fast_video) {
        removals.push({
          icon: "fa-regular fa-trash-can",
          text: "Delete FastVideo — experimental (frees 22.0GB)",
          href: "remove/fl2va-4steps.js",
          mode: "refresh",
          confirm: "Delete the FastVideo model, needed for Turbo workflows? You can re-download it later."
        })
      }
      if (has.turbo_lora) {
        removals.push({
          icon: "fa-regular fa-trash-can",
          text: "Delete Turbo LoRA - fl2va (frees 1.96GB)",
          href: "remove/turbo_lora.js",
          mode: "refresh",
          confirm: "Delete the fl2va Turbo LoRA, needed for Turbo workflows? You can re-download it later."
        })
      }
      if (has.turbo_lora2) {
        removals.push({
          icon: "fa-regular fa-trash-can",
          text: "Delete Turbo LoRA - ref2va (frees 1.96GB)",
          href: "remove/turbo_lora2.js",
          mode: "refresh",
          confirm: "Delete the ref2va Turbo LoRA, needed for Turbo workflows? You can re-download it later."
        })
      }

      let menu = [{
        default: true,
        icon: "fa-solid fa-power-off",
        text: "Start",
        href: "start.js",
      }, {
        icon: "fa-solid fa-download",
        text: "Download Models",
        menu: downloads
      }]

      if (removals.length > 0) {
        menu.push({
          icon: "fa-solid fa-hard-drive",
          text: "Manage Disk Space",
          menu: removals
        })
      }

      return menu.concat([{
        icon: "fa-solid fa-diagram-project",
        text: "Reinstall Workflows",
        href: "workflows.js",
        mode: "refresh"
      }, {
        icon: "fa-solid fa-plug",
        text: "Update",
        href: "update.js",
      }, {
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }, {
        icon: "fa-regular fa-circle-xmark",
        text: "Reset",
        href: "reset.js",
        confirm: "Reset reinstalls ComfyUI. Your downloaded H3 weights are kept."
      }])
    } else {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }]
    }
  }
}
