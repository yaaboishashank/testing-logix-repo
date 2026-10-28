import { reserveStock } from "../services/operations.service.js";
import { sendJson } from "../utils/response.js";

export const reserveInventory = async (req, res, fail) => {
  try {
    const result = await reserveStock(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    sendJson(res, 503, { success: false, message: "Stock could not be reserved." });
  }
};

export const reserveInventoryV2 = async (req, res, fail) => {
  try {
    const result = await reserveStock(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    console.error({
      event: "stock_operation_failed",
      operation: "reserveStock",
      requestId: req.requestId,
    });
    sendJson(res, 503, { success: false, message: "Stock could not be reserved." });
  }
};
