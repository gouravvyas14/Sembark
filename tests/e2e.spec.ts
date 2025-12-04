import { test, expect } from '@playwright/test';

test.describe('E-commerce Assignment E2E Tests', () => {
  
  // Test 1: Basic page load and product display
  test('should load the home page and display products', async ({ page }) => {
    await page.goto('/');
    
    // Check if the Navbar and Title are visible
    await expect(page.getByRole('link', { name: 'Sembark Shop' })).toBeVisible();
    
    // Check for at least one product card to ensure data fetching worked
    const firstProductLink = page.locator('.grid a:has-text("View Details")').first();
    await expect(firstProductLink).toBeVisible();
  });

  // Test 2: Filtering logic and URL persistence (Requirement 1.b, 1.c)
  test('should update URL and refetch products when a category filter is applied', async ({ page }) => {
    await page.goto('/');
    
    // Wait for categories to load, then click the first checkbox (e.g., 'electronics')
    const firstCategoryCheckbox = page.locator('aside input[type="checkbox"]').first();
    await expect(firstCategoryCheckbox).toBeVisible();
    await firstCategoryCheckbox.click();
    
    // Verify the URL is updated with the filter
    await expect(page).toHaveURL(/category=/);
    
    // The products list should refresh (assuming it's not empty)
    await expect(page.locator('.grid')).toBeVisible(); 
  });

  // Test 3: Navigation to Product Detail (Requirement 2.a)
  test('should navigate to product detail page and allow adding to cart', async ({ page }) => {
    await page.goto('/');
    
    // Click the 'View Details' link on the first product
    await page.locator('.grid a:has-text("View Details")').first().click();
    
    // Check for the dynamic route and main button
    await expect(page).toHaveURL(/.*\/product\/\d+/);
    await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
    
    // Add to cart
    await page.getByRole('button', { name: 'Add to Cart' }).click();
    
    // Verify cart count on the Navbar is 1
    const cartCountSpan = page.locator('nav').getByText('1');
    await expect(cartCountSpan).toBeVisible();
  });
});