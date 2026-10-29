import { Page, expect } from '@playwright/test';
export class HeaderComponent {
 constructor(private page: Page) {}
 async abrirHome() { await this.page.locator('header a[href="/"]').first().click(); await expect(this.page).toHaveURL(/\/$/); }
 async abrirLogin() { await this.page.locator('header a[href="/login"]').click(); await expect(this.page).toHaveURL(/\/login/); }
 async abrirProdutos() { await this.page.locator('header a[href="/products"]').click(); await expect(this.page).toHaveURL(/\/products/); }
 async abrirCarrinho() { await this.page.locator('header a[href="/view_cart"]').click(); await expect(this.page).toHaveURL(/\/view_cart/); }
 async verificarUsuarioLogado(nome:string) { await expect(this.page.locator('header a').filter({hasText:'Logged in as'}).locator('b')).toHaveText(nome); }
 async logout() { await this.page.locator('header a[href="/logout"]').click(); await expect(this.page).toHaveURL(/\/login/); }
 async excluirConta() { await this.page.locator('header a[href="/delete_account"]').click(); await expect(this.page.locator('[data-qa="account-deleted"]')).toContainText('Account Deleted!',{timeout:50000}); }
}
