import { sendReceipt } from "../services/operations.service.js";
import { sendJson } from "../utils/response.js";

export const createReceipt = async (req, res, fail) => {
  try {
    const result = await sendReceipt(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    sendJson(res, 503, { success: false, message: "Receipt could not be sent." });
  }
};

export const createReceiptV2 = async (req, res, fail) => {
  try {
    const result = await sendReceipt(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    console.error({
      event: "receipt_operation_failed",
      operation: "sendReceipt",
      requestId: req.requestId,
    });
    sendJson(res, 503, { success: false, message: "Receipt could not be sent." });
  }
};
