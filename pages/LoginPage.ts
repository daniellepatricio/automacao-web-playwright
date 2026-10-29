import {Page,expect} from '@playwright/test';
export class LoginPage {
 constructor(private page:Page){}
 async acessar(){await this.page.goto('/login');}
 async verificarFormularioLogin(){await expect(this.page).toHaveURL(/\/login/);await expect(this.page.locator('.login-form h2')).toContainText('Login to your account');await expect(this.page.locator('[data-qa="login-email"]')).toBeVisible();}
 async verificarFormularioCadastro(){await expect(this.page.locator('.signup-form h2')).toContainText('New User Signup!');}
 async preencherLogin(email:string,senha:string){await this.page.locator('[data-qa="login-email"]').fill(email);await this.page.locator('[data-qa="login-password"]').fill(senha);}
 async enviarLogin(){await this.page.locator('[data-qa="login-button"]').click();}
 async login(email:string,senha:string){await this.verificarFormularioLogin();await this.preencherLogin(email,senha);await this.enviarLogin();}
 async realizarLogin(email:string,senha:string){await this.acessar();await this.login(email,senha);}
 async verificarLoginInvalido(){await expect(this.page.locator('.login-form p')).toContainText('Your email or password is incorrect!');}
 async preencherCadastro(nome:string,email:string){await this.page.locator('[data-qa="signup-name"]').fill(nome);await this.page.locator('[data-qa="signup-email"]').fill(email);}
 async enviarCadastro(){await this.page.locator('[data-qa="signup-button"]').click();}
 async iniciarCadastro(nome:string,email:string){await this.verificarFormularioCadastro();await this.preencherCadastro(nome,email);await this.enviarCadastro();}
 async verificarEmailExistente(){await expect(this.page.locator('.signup-form p')).toContainText('Email Address already exist!');}
 async verificarLogout(){await this.verificarFormularioLogin();await expect(this.page.locator('[data-qa="login-email"]')).toBeEmpty();await expect(this.page.locator('[data-qa="login-password"]')).toBeEmpty();}
}
