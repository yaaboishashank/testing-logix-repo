import { fetchCatalog } from "../services/operations.service.js";
import { sendJson } from "../utils/response.js";

export const getCatalog = async (req, res, fail) => {
  try {
    const result = await fetchCatalog(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    sendJson(res, 503, { success: false, message: "Catalog is unavailable." });
  }
};

export const getCatalogV2 = async (req, res, fail) => {
  try {
    const result = await fetchCatalog(fail);
    sendJson(res, 200, { success: true, result });
  } catch {
    console.error({
      event: "catalog_operation_failed",
      operation: "fetchCatalog",
      requestId: req.requestId,
    });
    sendJson(res, 503, { success: false, message: "Catalog is unavailable." });
  }
};
