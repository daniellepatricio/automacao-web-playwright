import {Page,expect} from '@playwright/test';
import {HeaderComponent} from '../components/HeaderComponent';
export class HomePage {
 constructor(private page:Page){}
 async acessar(){await this.page.goto('/');}
 async abrirPaginaInicial(){await this.acessar();}
 async verificarPaginaInicial(){await expect(this.page).toHaveURL(/\/$/);await expect(this.page.locator('header')).toBeVisible();}
 async acessarLogin(){await new HeaderComponent(this.page).abrirLogin();}
}
