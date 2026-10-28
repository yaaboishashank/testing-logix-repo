import { randomUUID } from "node:crypto";
import { sendJson } from "./utils/response.js";
import { createOrder, createOrderV2 } from "./controllers/order.controller.js";
import { getCatalog, getCatalogV2 } from "./controllers/catalog.controller.js";
import { createReceipt, createReceiptV2 } from "./controllers/receipt.controller.js";
import { reserveInventory, reserveInventoryV2 } from "./controllers/stock.controller.js";
import { createBackup, createBackupV2 } from "./controllers/backup.controller.js";
import { createReportV2 } from "./controllers/report.controller.js";

const routes = new Map([
  ["/v1/order", createOrder],
  ["/v2/order", createOrderV2],
  ["/v1/catalog", getCatalog],
  ["/v2/catalog", getCatalogV2],
  ["/v1/receipt", createReceipt],
  ["/v2/receipt", createReceiptV2],
  ["/v1/stock", reserveInventory],
  ["/v2/stock", reserveInventoryV2],
  ["/v1/backup", createBackup],
  ["/v2/backup", createBackupV2],
  ["/v2/report", createReportV2],
]);

export const app = async (req, res) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-ID", req.requestId);
  try {
    const url = new URL(req.url, "http://localhost");
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, message: "Use GET." });
    }
    if (url.pathname === "/health") {
      return sendJson(res, 200, { success: true });
    }
    const handler = routes.get(url.pathname);
    if (!handler) {
      return sendJson(res, 404, { success: false, message: "Route not found." });
    }
    await handler(req, res, url.searchParams.get("fail") === "1");
  } catch {
    console.error({ event: "request_failed", requestId: req.requestId });
    if (!res.headersSent) sendJson(res, 500, { success: false });
    else res.end();
  }
};
