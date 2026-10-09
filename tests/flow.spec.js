const { test, expect } = require('@playwright/test');

test.describe('Turbonet e2e flow', () => {

  test('should allow choosing a plan, submitting a lead, and seeing it in the admin', async ({ page }) => {
    // 1. Visit the home page
    await page.goto('http://localhost:3000');

    // Ensure the page loaded successfully
    await expect(page).toHaveTitle(/Turbonet/);

    // 2. Select a city ("Belo Horizonte")
    await page.locator('#city').selectOption('Belo Horizonte');

    // Check if the plan updated for Belo Horizonte
    await expect(page.locator('#plans')).toContainText('Serra 200');

    // Click "Contratar" on the first plan for this city
    await page.locator('[data-plan="p200_bh"]').click();

    // The bottom form should have the city and plan correctly selected
    await expect(page.locator('#leadCity')).toHaveValue('Belo Horizonte');
    await expect(page.locator('#leadPlan')).toHaveValue('p200_bh');

    // 3. Submit the lead form
    const leadName = `Test Lead ${Date.now()}`;
    await page.locator('input[name="name"]').fill(leadName);
    await page.locator('input[name="phone"]').fill('31999999999');

    await page.locator('form#lead button[type="submit"]').click();

    // Check for success message
    await expect(page.locator('#ok')).toBeVisible();
    await expect(page.locator('#ok')).toContainText('Recebemos');

    // 4. Login to Admin CRM
    await page.goto('http://localhost:3000/admin.html');

    // Assuming you need to login based on new logic
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('password123');
    await page.locator('#login-form button[type="submit"]').click();

    // 5. Verify the lead appears in the table
    await expect(page.locator('#crm-section')).toBeVisible();
    const tableRows = page.locator('#rows tr');

    // The newly submitted lead should be among the top rows
    await expect(page.locator(`text=${leadName}`).first()).toBeVisible();

    // Check that city and plan match
    const rowText = await page.locator(`tr:has-text("${leadName}")`).textContent();
    expect(rowText).toContain('Belo Horizonte');
    expect(rowText).toContain('p200_bh');
  });

});
