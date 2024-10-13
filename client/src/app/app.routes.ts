import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerberListComponent } from './members/merber-list/merber-list.component';
import { MerberDetailComponent } from './members/merber-detail/merber-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MerberListComponent },
            { path: 'members/:id', component: MerberDetailComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'messages', component: MessagesComponent },
        ]
    },

    { path: '**', component: HomeComponent, pathMatch: 'full' }
];
