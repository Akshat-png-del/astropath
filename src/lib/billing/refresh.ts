export const BILLING_REFRESH_EVENT = "cosmic:billing-refresh";

export function refreshBilling(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(BILLING_REFRESH_EVENT));
}
