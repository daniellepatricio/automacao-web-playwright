import { Page, expect } from '@playwright/test';
export class CartModalComponent {
 constructor(private page:Page) {}
 get modal(){return this.page.locator('#cartModal');}
 async verificarProdutoAdicionado(){await expect(this.modal).toBeVisible();await expect(this.modal.locator('.modal-title')).toContainText('Added!');await expect(this.modal.locator('.modal-body')).toContainText('Your product has been added to cart.');}
 async continuarComprando(){await this.modal.locator('button.close-modal').click();await expect(this.modal).toBeHidden();}
 async visualizarCarrinho(){await this.modal.locator('a[href="/view_cart"]').click();await expect(this.page).toHaveURL(/\/view_cart/);}
}
