import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "produtos",
        loadComponent: ()=> import('./pages/listar-produtos/listar-produtos.component')
            .then((c)=> c.ListarProdutos)
    },
    {
        path: "gerenciar",
        loadComponent: ()=> import('./pages/gerenciar-produtos/gerenciar-produtos.component')
            .then((c)=> c.GerenciarProdutos)
    },
    {
        path:'**',
        redirectTo:"/produtos"
    }
];
