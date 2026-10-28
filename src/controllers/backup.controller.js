import { uploadBackup } from "../services/operations.service.js";
import { sendJson } from "../utils/response.js";

export const createBackup = async (req, res, fail) => {
  try {
    const result = await uploadBackup(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    sendJson(res, 503, { success: false, message: "Backup could not be uploaded." });
  }
};

export const createBackupV2 = async (req, res, fail) => {
  try {
    const result = await uploadBackup(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    console.error({
      event: "backup_operation_failed",
      operation: "uploadBackup",
      requestId: req.requestId,
    });
    sendJson(res, 503, { success: false, message: "Backup could not be uploaded." });
  }
};
