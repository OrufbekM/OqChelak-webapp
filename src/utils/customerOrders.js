const CUSTOMER_ORDERS_KEY = "customer_orders";

export function loadCustomerOrders() {
  try {
    const raw = localStorage.getItem(CUSTOMER_ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCustomerOrders(orders) {
  localStorage.setItem(CUSTOMER_ORDERS_KEY, JSON.stringify(orders));
}

export function appendCustomerOrder(order) {
  const current = loadCustomerOrders();
  const next = [order, ...current];
  saveCustomerOrders(next);
  return next;
}

