import {test as base,expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';import {LoginPage} from '../pages/LoginPage';import {RegisterPage} from '../pages/RegisterPage';import {ProductPage} from '../pages/ProductPage';import {CheckoutPage} from '../pages/CheckoutPage';import {SubscriptionPage} from '../pages/SubscriptionPage';import {HeaderComponent} from '../components/HeaderComponent';
type Fixtures={home:HomePage;login:LoginPage;register:RegisterPage;products:ProductPage;checkout:CheckoutPage;subscription:SubscriptionPage;header:HeaderComponent};
// Bloqueia anúncios (ex.: #google_vignette) que sobrepõem a página e interrompem navegações, principal causa de flaky.
const AD_HOSTS=/(googlesyndication|doubleclick|googleadservices|adservice\.google|google-analytics|googletagmanager|googletagservices|fundingchoicesmessages|adtrafficquality)\./;
// O site às vezes responde "heavy load (queue full)" no lugar da página; o handler recarrega (reenviando o POST, se houver) com backoff até a página real voltar.
const QUEUE_FULL='h2:has-text("heavy load (queue full)")';
export const test=base.extend<Fixtures>({
 page:async({page},use)=>{await page.route(AD_HOSTS,route=>route.abort());
  await page.addLocatorHandler(page.locator(QUEUE_FULL),async overlay=>{for(let i=1;i<=5&&await overlay.isVisible();i++){await page.waitForTimeout(2000*i);await page.reload();}});
  await use(page);},
 home:async({page},use)=>use(new HomePage(page)),login:async({page},use)=>use(new LoginPage(page)),
 register:async({page},use)=>use(new RegisterPage(page)),products:async({page},use)=>use(new ProductPage(page)),
 checkout:async({page},use)=>use(new CheckoutPage(page)),subscription:async({page},use)=>use(new SubscriptionPage(page)),
 header:async({page},use)=>use(new HeaderComponent(page))
});export {expect};
