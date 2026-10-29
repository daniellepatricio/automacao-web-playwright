import {Page} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';import {HeaderComponent} from '../components/HeaderComponent';import type {TestUser} from '../factories/userFactory';
// Limpeza best-effort: preserva a falha original do teste quando o site estiver indisponível.
export async function deleteTestAccount(page:Page,user:TestUser){
 const header=new HeaderComponent(page);const login=new LoginPage(page);
 try {if(await page.locator('[data-qa="account-deleted"]').isVisible())return;
 if(!(await page.locator('header a[href="/delete_account"]').isVisible())){await login.realizarLogin(user.email,user.password);
 // Conta já excluída (ou nunca criada): login não autentica e não há o que limpar.
 if(!(await page.locator('header a[href="/delete_account"]').waitFor({timeout:5000}).then(()=>true,()=>false)))return;}
 await header.excluirConta();}catch(e){console.warn(`Falha ao limpar conta de teste ${user.email}:`,e);}
}
