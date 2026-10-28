const runOperation = async (name, fail) => {
  if (fail) {
    const error = new Error(`${name} unavailable`);
    error.code = "DEMO_FAILURE";
    throw error;
  }
  return { operation: name, completed: true };
};

export const saveOrder = (fail) => runOperation("order.save", fail);
export const fetchCatalog = (fail) => runOperation("catalog.fetch", fail);
export const sendReceipt = (fail) => runOperation("receipt.send", fail);
export const reserveStock = (fail) => runOperation("stock.reserve", fail);
export const uploadBackup = (fail) => runOperation("backup.upload", fail);
export const buildReport = (fail) => runOperation("report.build", fail);
