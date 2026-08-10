import { app } from "../../scripts/app.js"

const commandId = "Workspace.ToggleSidebarTab.workflows"

app.registerExtension({
  name: "MiniMaxH3.OpenWorkflowsSidebar",
  async setup() {
    const extensionManager = app.extensionManager

    for (let attempt = 0; attempt < 50; attempt++) {
      if (extensionManager.sidebarTab.activeSidebarTabId === "workflows") return

      if (extensionManager.command.commands.some(({ id }) => id === commandId)) {
        await extensionManager.command.execute(commandId)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.warn(`[MiniMax H3] ${commandId} was not registered`)
  }
})
