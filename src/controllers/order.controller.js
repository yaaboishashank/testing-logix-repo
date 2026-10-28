import { saveOrder } from "../services/operations.service.js";
import { sendJson } from "../utils/response.js";

export const createOrder = async (req, res, fail) => {
  try {
    const result = await saveOrder(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    sendJson(res, 503, { success: false, message: "Order could not be saved." });
  }
};

export const createOrderV2 = async (req, res, fail) => {
  try {
    const result = await saveOrder(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    console.error({
      event: "order_operation_failed",
      operation: "saveOrder",
      requestId: req.requestId,
    });
    sendJson(res, 503, { success: false, message: "Order could not be saved." });
  }
};
