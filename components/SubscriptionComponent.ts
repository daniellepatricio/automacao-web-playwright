import { Page,expect } from '@playwright/test';
export class SubscriptionComponent {
 constructor(private page:Page){}
 async verificarSecaoAssinatura(){await expect(this.page.locator('.single-widget h2')).toContainText('Subscription');await expect(this.page.locator('#susbscribe_email')).toBeVisible();await expect(this.page.locator('#subscribe')).toBeVisible();}
 async preencherEmail(email:string){await this.page.locator('#susbscribe_email').fill(email);}
 async clicarAssinar(){await this.page.locator('#subscribe').click();}
 async verificarAssinaturaRealizada(){await expect(this.page.locator('#success-subscribe')).toContainText('You have been successfully subscribed!');}
 async realizarAssinatura(email:string){await this.verificarSecaoAssinatura();await this.preencherEmail(email);await this.clicarAssinar();await this.verificarAssinaturaRealizada();}
}
