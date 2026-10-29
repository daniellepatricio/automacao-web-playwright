import {Page,expect} from '@playwright/test';
import {SubscriptionComponent} from '../components/SubscriptionComponent';
export class SubscriptionPage {
 private subscription:SubscriptionComponent;
 constructor(private page:Page){this.subscription=new SubscriptionComponent(page);}
 async acessarPaginaInicial(){await this.page.goto('/');}
 async rolarAteRodape(){await this.page.locator('#footer').scrollIntoViewIfNeeded();await expect(this.page.locator('#footer')).toBeVisible();}
 async verificarSecaoAssinatura(){await this.subscription.verificarSecaoAssinatura();}
 async preencherEmail(email:string){await this.subscription.preencherEmail(email);}
 async clicarAssinar(){await this.subscription.clicarAssinar();}
 async verificarAssinaturaRealizada(){await this.subscription.verificarAssinaturaRealizada();}
 async assinarNewsletter(email:string){await this.acessarPaginaInicial();await this.rolarAteRodape();await this.subscription.realizarAssinatura(email);}
}
