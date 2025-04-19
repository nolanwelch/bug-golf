import { assignRandomKataForToday, formatDate } from "./utils";

export default {
  async scheduled(_event: ScheduledEvent, env: Env) {
    try {
      await assignRandomKataForToday(env);
      console.log("Daily kata assigned for", formatDate());
    } catch (err) {
      console.error("Failed to assign daily kata:", err);
    }
  },
};
