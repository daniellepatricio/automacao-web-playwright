import {Page,expect} from '@playwright/test';
import {HeaderComponent} from '../components/HeaderComponent';
import {CartModalComponent} from '../components/CartModalComponent';
export class ProductPage {
 private modal:CartModalComponent;
 constructor(private page:Page){this.modal=new CartModalComponent(page);}
 async acessar(){await this.page.goto('/products');}
 async acessarPeloMenu(){await new HeaderComponent(this.page).abrirProdutos();}
 async verificarListagem(){await expect(this.page).toHaveURL(/\/products/);await expect(this.page.locator('.features_items h2.title')).toContainText('All Products');await expect(this.page.locator('.features_items .product-image-wrapper').first()).toBeVisible();}
 async verificarProdutosDisponiveis(){await expect(this.page.locator('.features_items .product-image-wrapper').first()).toBeVisible();}
 async abrirPrimeiroProduto(){await this.page.locator('.features_items .product-image-wrapper a[href^="/product_details/"]').first().click();await expect(this.page).toHaveURL(/\/product_details\//);}
 async verificarPaginaDetalhes(){await expect(this.page.locator('.product-information')).toBeVisible();}
 async verificarDetalhes(){const d=this.page.locator('.product-information');await expect(d.locator('h2')).not.toBeEmpty();for(const label of ['Category:','Rs.','Availability:','Condition:','Brand:'])await expect(d).toContainText(label);}
 async pesquisar(nome:string){if(!/\/products/.test(this.page.url()))await this.acessar();await this.page.locator('#search_product').fill(nome);await this.page.locator('#submit_search').click();}
 async verificarResultadoPesquisa(){await expect(this.page.locator('.features_items h2.title')).toContainText('Searched Products');}
 async verificarProdutosPesquisados(nome:string){const cards=this.page.locator('.features_items .product-image-wrapper');await expect(cards.first()).toBeVisible();const count=await cards.count();for(let i=0;i<count;i++)await expect(cards.nth(i).locator('.productinfo p')).toContainText(nome,{ignoreCase:true});}
 async adicionarProduto(id:number|string){const card=this.page.locator('.features_items .productinfo').filter({has:this.page.locator(`a.add-to-cart[data-product-id="${id}"]`)}).first();await card.locator(`a.add-to-cart[data-product-id="${id}"]`).click();await this.modal.verificarProdutoAdicionado();}
 async continuarComprando(){await this.modal.continuarComprando();}
 async visualizarCarrinho(){await this.modal.visualizarCarrinho();}
 async verificarCarrinho(){await expect(this.page).toHaveURL(/\/view_cart/);await expect(this.page.locator('#cart_info_table')).toBeVisible();}
 async verificarQuantidadeProdutos(n:number){await expect(this.page.locator('#cart_info_table tbody tr')).toHaveCount(n);}
 async verificarProdutoNoCarrinho(id:number|string){await expect(this.page.locator(`#product-${id}`)).toBeVisible();}
}
