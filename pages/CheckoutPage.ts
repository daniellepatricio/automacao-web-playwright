import {Page,expect,Locator} from '@playwright/test';
import type {TestUser} from '../factories/userFactory';
export interface PaymentData {nameOnCard:string;cardNumber:string;cvc:string;expiryMonth:string;expiryYear:string;}
export class CheckoutPage {
 constructor(private page:Page){}
 async verificarCarrinho(){await expect(this.page).toHaveURL(/\/view_cart/);await expect(this.page.locator('#cart_info_table')).toBeVisible();}
 async verificarProdutosCarrinho(ids:(number|string)[]){for(const id of ids)await expect(this.page.locator(`#product-${id}`)).toBeVisible();}
 async prosseguirCheckout(){await this.page.locator('#do_action').getByText('Proceed To Checkout').click();await expect(this.page).toHaveURL(/\/checkout/);}
 async verificarPaginaCheckout(){await expect(this.page).toHaveURL(/\/checkout/);await expect(this.page.getByRole('heading',{name:'Address Details'})).toBeVisible();await expect(this.page.getByRole('heading',{name:'Review Your Order'})).toBeVisible();}
 async verificarDadosEndereco(locator:Locator,u:TestUser){await expect(locator).toBeVisible();for(const v of [u.firstName,u.lastName,u.address,u.city,u.state,u.country])await expect(locator).toContainText(v);}
 async verificarEnderecoEntrega(u:TestUser){await this.verificarDadosEndereco(this.page.locator('#address_delivery'),u);}
 async verificarEnderecoCobranca(u:TestUser){await this.verificarDadosEndereco(this.page.locator('#address_invoice'),u);}
 async verificarEnderecos(u:TestUser){await this.verificarEnderecoEntrega(u);await this.verificarEnderecoCobranca(u);}
 async verificarResumoPedido(ids:(number|string)[]){await expect(this.page.locator('#cart_info')).toBeVisible();for(const id of ids)await expect(this.page.locator(`#cart_info #product-${id}`)).toBeVisible();await expect(this.page.locator('#cart_info tbody tr[id^="product-"]')).toHaveCount(ids.length);}
 async preencherComentario(s:string){await this.page.locator('textarea[name="message"]').fill(s);}
 async finalizarPedido(){await this.page.getByRole('link',{name:'Place Order'}).click();await expect(this.page).toHaveURL(/\/payment/);}
 async verificarFormularioPagamento(){await expect(this.page.getByRole('heading',{name:'Payment',exact:true})).toBeVisible();await expect(this.page.locator('[data-qa="name-on-card"]')).toBeVisible();}
 async preencherPagamento(p:PaymentData){await this.verificarFormularioPagamento();for(const [k,v] of Object.entries({'name-on-card':p.nameOnCard,'card-number':p.cardNumber,cvc:p.cvc,'expiry-month':p.expiryMonth,'expiry-year':p.expiryYear}))await this.page.locator(`[data-qa="${k}"]`).fill(v);}
 async confirmarPagamento(){await this.page.locator('[data-qa="pay-button"]').click();}
 async verificarPedidoConfirmado(){await expect(this.page.locator('[data-qa="order-placed"]')).toContainText('Order Placed!');await expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();}
 async realizarCheckout(u:TestUser,ids:(number|string)[],comment:string,p:PaymentData){await this.verificarCarrinho();await this.verificarProdutosCarrinho(ids);await this.prosseguirCheckout();await this.verificarPaginaCheckout();await this.verificarEnderecos(u);await this.verificarResumoPedido(ids);await this.preencherComentario(comment);await this.finalizarPedido();await this.preencherPagamento(p);await this.confirmarPagamento();await this.verificarPedidoConfirmado();}
}
