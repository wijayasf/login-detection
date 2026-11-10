import { chromium, expect } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const baseURL = (process.env.PROTOTYPE_URL ?? "http://127.0.0.1:3001").replace(/\/$/, "");
const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const evidence = process.env.SMOKE_OUTPUT_DIR ?? "evidence/screenshots";

await mkdir(evidence, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
const page = await context.newPage();
const consoleErrors = [];
const httpErrors = [];

page.on("console", (message) => {
  if (message.type() === "error") {
    const location = message.location();
    consoleErrors.push(`${message.text()} @ ${location.url || "unknown"}:${location.lineNumber ?? 0}`);
  }
});
page.on("response", (response) => {
  if (response.status() >= 400) httpErrors.push(`${response.status()} ${response.url()}`);
});

async function shot(name) {
  await page.screenshot({ path: `${evidence}/${name}.png`, fullPage: true });
}

async function resetToLogin() {
  await page.goto(`${baseURL}/login`, { waitUntil: "networkidle" });
  await page.evaluate(() => window.localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Masuk ke Detection Anomaly" })).toBeVisible();
}

async function signIn(accountId) {
  await resetToLogin();
  await page.locator(`input[value="${accountId}"]`).check();
  await page.getByRole("button", { name: /Sign In to Prototype/ }).click();
  await page.waitForURL(/\/monitoring\/?$/);
  await expect(page.getByRole("heading", { name: "Monitoring" })).toBeVisible();
}

async function assertNav(visible, absent) {
  for (const label of visible) await expect(page.getByRole("link", { name: label, exact: true })).toBeVisible();
  for (const label of absent) await expect(page.getByRole("link", { name: label, exact: true })).toHaveCount(0);
}

try {
  await resetToLogin();
  await page.getByRole("button", { name: "Email / Password" }).click();
  await page.locator('input[value="usr-inactive"]').check();
  await page.getByRole("button", { name: /Sign In to Prototype/ }).click();
  await expect(page.locator(".form-error")).toContainText("tidak aktif");
  await shot("01-login-options-inactive-rejection");

  await signIn("usr-sa");
  await assertNav(
    ["Monitoring", "Dashboard", "Settings", "User Management", "Process Logs", "System Diagnostics"],
    [],
  );
  await expect(page.getByText("Prototype Mode — No Real Authentication", { exact: true })).toBeVisible();
  const gateCard = page.getByTestId("camera-CCTV-GATE-01");
  await gateCard.getByRole("button", { name: "Disable CCTV" }).click();
  await expect(gateCard.getByRole("button", { name: "Enable CCTV" })).toBeVisible();
  await gateCard.getByRole("button", { name: "Enable CCTV" }).click();
  await gateCard.getByRole("button", { name: "Stop analysis Gate Utama", exact: true }).click();
  await expect(gateCard.getByRole("button", { name: "Start analysis Gate Utama", exact: true })).toBeVisible();
  await gateCard.getByRole("button", { name: "Start analysis Gate Utama", exact: true }).click();
  await expect(gateCard.getByRole("button", { name: "Stop analysis Gate Utama", exact: true })).toBeVisible();
  const addCameraButton = page.getByRole("button", { name: /Add camera/ });
  await addCameraButton.click();
  await expect(page.getByRole("button", { name: "Close camera form" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(addCameraButton).toBeFocused();
  await addCameraButton.click();
  await page.getByLabel("Camera name").fill("QA Local Camera");
  await page.getByLabel("Location").fill("Prototype Lab");
  await page.getByRole("button", { name: "Save locally" }).click();
  await expect(page.getByRole("link", { name: "Open QA Local Camera detail" })).toBeVisible();
  await shot("02-super-admin-monitoring");

  await page.getByRole("link", { name: "Dashboard", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Detection dashboard" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Retention cleanup/ })).toBeVisible();
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Export CSV/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("prototype-detections.csv");
  await shot("03-super-admin-dashboard");
  await page.getByRole("button", { name: /Retention cleanup/ }).click();
  await expect(page.getByRole("heading", { name: "Simulate retention cleanup?" })).toBeVisible();
  await page.getByRole("button", { name: "Confirm simulation" }).click();
  await expect(page.locator(".toast")).toContainText("No data was deleted");

  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await expect(page.getByTestId("settings-advanced").getByLabel("Runtime profile")).toBeEnabled();
  await expect(page.getByTestId("settings-tuning").getByRole("slider")).toBeEnabled();
  await shot("04-super-admin-settings");
  await page.getByTestId("settings-advanced").scrollIntoViewIfNeeded();
  await shot("04b-super-admin-settings-advanced");

  await page.getByRole("link", { name: "User Management", exact: true }).click();
  await expect(page.getByRole("heading", { name: "User Management" })).toBeVisible();
  await page.getByRole("button", { name: /Create user/ }).click();
  await page.getByLabel("Display name").fill("QA Single Role");
  await page.getByLabel("Fictitious email").fill("qa.single.role@example.test");
  await page.getByLabel("Single assigned role").selectOption("SUPERVISOR");
  await page.getByRole("button", { name: "Save mock user" }).click();
  await expect(page.getByText("QA Single Role", { exact: true })).toBeVisible();
  await shot("05-super-admin-user-management");
  const qaUserRow = page.getByRole("row").filter({ hasText: "QA Single Role" });
  await qaUserRow.getByRole("button", { name: "Deactivate" }).click();
  await page.getByRole("button", { name: "Deactivate locally" }).click();
  await expect(qaUserRow).toContainText("Inactive");
  await qaUserRow.getByRole("button", { name: "Reset access" }).click();
  await page.getByRole("button", { name: "Simulate reset access" }).click();
  await expect(page.locator(".toast")).toContainText("No message was sent");
  await shot("05a-super-admin-user-lifecycle");

  await page.getByRole("link", { name: "Process Logs", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Process Logs" })).toBeVisible();
  await expect(page.getByText("Local static dataset", { exact: true })).toBeVisible();
  await shot("05b-super-admin-process-logs");
  await page.getByRole("link", { name: "System Diagnostics", exact: true }).click();
  await expect(page.getByRole("button", { name: /Run mock health check/ })).toBeEnabled();
  await page.getByRole("button", { name: /Run mock health check/ }).click();
  await expect(page.locator(".toast")).toContainText("No service was contacted");
  await shot("05c-super-admin-diagnostics-manage");

  await page.goto(`${baseURL}/camera?id=CCTV-GATE-01`, { waitUntil: "networkidle" });
  const resetCameraButton = page.getByRole("button", { name: /Reset camera to default/ });
  await expect(resetCameraButton).toBeVisible();
  await resetCameraButton.click();
  await expect(page.getByRole("heading", { name: "Reset mock camera defaults?" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Tutup konfirmasi" })).toBeFocused();
  await shot("06-super-admin-camera-reset-confirmation");
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Simulate reset" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("alertdialog")).toHaveCount(0);
  await expect(resetCameraButton).toBeFocused();

  await page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /Role testing tool/ }).click();
  await page.getByLabel("Simulated account").selectOption("usr-o");
  await page.waitForURL(/\/access-denied\/\?/);
  await expect(page.getByTestId("access-denied")).toBeVisible();
  await shot("07-role-change-access-denied");

  await signIn("usr-m");
  await assertNav(
    ["Monitoring", "Dashboard", "Settings", "Process Logs", "System Diagnostics"],
    ["User Management"],
  );
  await shot("08-maintainer-monitoring");
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await expect(page.getByTestId("settings-tuning").getByRole("slider")).toBeEnabled();
  await expect(page.getByTestId("settings-advanced")).toContainText("PENDING APPROVAL");
  await expect(page.getByTestId("settings-advanced").getByLabel("Runtime profile")).toHaveCount(0);
  await shot("09-maintainer-settings-pending");
  await page.getByTestId("settings-advanced").scrollIntoViewIfNeeded();
  await shot("09b-maintainer-settings-advanced-pending");
  await page.getByRole("link", { name: "System Diagnostics", exact: true }).click();
  await expect(page.getByRole("button", { name: /Run mock health check/ })).toBeDisabled();
  await expect(page.getByText("READ ONLY", { exact: true })).toBeVisible();
  await shot("10-maintainer-diagnostics-read-only");

  await signIn("usr-o");
  await assertNav(["Monitoring", "Settings"], ["Dashboard", "User Management", "Process Logs", "System Diagnostics"]);
  await shot("11-operator-monitoring");
  await page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
  await expect(page.getByTestId("access-denied")).toBeVisible();
  await expect(page.getByTestId("access-denied")).toContainText("reports.read");
  await shot("12-operator-dashboard-denied");
  await page.goto(`${baseURL}/settings`, { waitUntil: "networkidle" });
  await expect(page.getByTestId("settings-tuning").getByRole("slider")).toBeDisabled();
  await expect(page.getByTestId("settings-advanced")).toContainText("RESTRICTED");
  await shot("13-operator-settings-restricted");
  await page.getByTestId("settings-advanced").scrollIntoViewIfNeeded();
  await shot("13b-operator-settings-advanced-restricted");
  await page.goto(`${baseURL}/camera?id=CCTV-GATE-01`, { waitUntil: "networkidle" });
  await expect(page.getByText("Reset unavailable", { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: /Reset camera to default/ })).toHaveCount(0);
  await shot("14-operator-camera-reset-restricted");

  await signIn("usr-s");
  await assertNav(["Monitoring", "Dashboard", "Settings"], ["User Management", "Process Logs", "System Diagnostics"]);
  await shot("15-supervisor-monitoring");
  await page.getByRole("link", { name: "Dashboard", exact: true }).click();
  await expect(page.getByRole("button", { name: /Export CSV/ })).toBeEnabled();
  await expect(page.getByRole("button", { name: /Retention cleanup/ })).toHaveCount(0);
  await shot("16-supervisor-dashboard");
  await page.getByRole("link", { name: "Settings", exact: true }).click();
  await expect(page.getByTestId("settings-tuning").getByRole("slider")).toBeDisabled();
  await shot("17-supervisor-settings-restricted");
  await page.getByTestId("settings-advanced").scrollIntoViewIfNeeded();
  await shot("17b-supervisor-settings-advanced-restricted");

  await page.getByRole("button", { name: /Role testing tool/ }).click();
  await page.getByRole("button", { name: "Simulate session expiry" }).click();
  await page.waitForURL(/\/session-expired\/?$/);
  await expect(page.getByTestId("session-expired")).toBeVisible();
  await shot("18-session-expired");
  await page.getByRole("link", { name: "Kembali ke Login" }).click();
  await page.waitForURL(/\/login\/?$/);
  await expect(page.getByRole("heading", { name: "Masuk ke Detection Anomaly" })).toBeVisible();

  await signIn("usr-o");
  await page.getByRole("button", { name: "Logout" }).click();
  await page.waitForURL(/\/login\/?$/);
  await expect(page.getByRole("heading", { name: "Masuk ke Detection Anomaly" })).toBeVisible();
  await shot("18b-logout-return-login");

  await page.setViewportSize({ width: 900, height: 800 });
  await page.goto(`${baseURL}/dashboard`, { waitUntil: "networkidle" });
  await expect(page.getByTestId("desktop-only-notice")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Detection dashboard" })).toHaveCount(0);
  await shot("19-desktop-only-notice");

  if (consoleErrors.length || httpErrors.length) {
    throw new Error(`Browser errors:\n${consoleErrors.join("\n")}\nHTTP errors:\n${httpErrors.join("\n")}`);
  }
  console.log("BROWSER_SMOKE_PASS screenshots=27 roles=4 console_errors=0");
} finally {
  await browser.close();
}
