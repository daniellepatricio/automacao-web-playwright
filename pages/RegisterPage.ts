import {Page,expect} from '@playwright/test';
import {LoginPage} from './LoginPage';
import type {TestUser} from '../factories/userFactory';
export class RegisterPage {
 constructor(private page:Page){}
 private field(name:string){return this.page.locator(`[data-qa="${name}"]`);}
 async verificarFormularioCadastro(){await expect(this.page).toHaveURL(/\/signup/);await expect(this.page.getByText('Enter Account Information')).toBeVisible();await expect(this.field('password')).toBeVisible();}
 async verificarDadosIniciais(u:TestUser){await expect(this.field('name')).toHaveValue(u.name);await expect(this.field('email')).toHaveValue(u.email);}
 async preencherInformacoesConta(u:TestUser){await this.page.locator(u.title==='Mrs'?'#id_gender2':'#id_gender1').check();await this.field('password').fill(u.password);await this.field('days').selectOption({label:u.birthDay});await this.field('months').selectOption({label:u.birthMonth});await this.field('years').selectOption({label:u.birthYear});if(u.newsletter)await this.page.locator('#newsletter').check();if(u.specialOffers)await this.page.locator('#optin').check();}
 async preencherEndereco(u:TestUser){const entries:Record<string,string>={first_name:u.firstName,last_name:u.lastName,company:u.company,address:u.address,address2:u.address2,state:u.state,city:u.city,zipcode:u.zipcode,mobile_number:u.mobile};for(const [k,v] of Object.entries(entries))await this.field(k).fill(v);await this.field('country').selectOption({label:u.country});}
 async preencherFormulario(u:TestUser){await this.verificarFormularioCadastro();await this.verificarDadosIniciais(u);await this.preencherInformacoesConta(u);await this.preencherEndereco(u);}
 async criarConta(){await this.field('create-account').click();}
 async verificarContaCriada(){await expect(this.page).toHaveURL(/\/account_created/);await expect(this.field('account-created')).toContainText('Account Created!');}
 async continuar(){await this.field('continue-button').click();await expect(this.page).toHaveURL(/\/$/);}
 async cadastrarUsuario(u:TestUser){const login=new LoginPage(this.page);await login.acessar();await login.iniciarCadastro(u.name,u.email);await this.preencherFormulario(u);await this.criarConta();await this.verificarContaCriada();await this.continuar();}
}
