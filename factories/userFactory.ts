import { randomUUID } from 'node:crypto';
export interface TestUser {
 name:string;email:string;password:string;title:string;birthDay:string;birthMonth:string;birthYear:string;
 newsletter:boolean;specialOffers:boolean;firstName:string;lastName:string;company:string;address:string;address2:string;
 country:string;state:string;city:string;zipcode:string;mobile:string;
}
export function createUser(overrides: Partial<TestUser> = {}): TestUser {
 const id = randomUUID().slice(0,12);
 return { name:`Usuario QA ${id}`, email:`danielle.qa.${id}@test.com`, password:'Teste@123456',
 title:'Mrs', birthDay:'10', birthMonth:'May', birthYear:'1990', newsletter:true, specialOffers:true,
 firstName:'Danielle',lastName:'Patricio',company:'QA Automation',address:'123 Test Street',address2:'Apartment 201',
 country:'Canada',state:'Ontario',city:'Toronto',zipcode:'M5V 2T6',mobile:'11999999999',...overrides };
}
