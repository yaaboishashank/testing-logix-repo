import { buildReport } from "../services/operations.service.js";
import { sendJson } from "../utils/response.js";

export const createReportV2 = async (req, res, fail) => {
  try {
    const result = await buildReport(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    console.error({
      event: "report_operation_failed",
      operation: "buildReport",
      requestId: req.requestId,
    });
    sendJson(res, 503, { success: false, message: "Report could not be created." });
  }
};
