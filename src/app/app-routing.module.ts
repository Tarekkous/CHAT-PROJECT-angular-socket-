import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryComponent } from './components/directory/directory.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ChatComponent } from './components/chat/chat.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatroomComponent } from './components/chat/chatroom/chatroom.component';
import { ChatTopBarComponent } from './components/chat/chatroom/chat-top-bar/chat-top-bar.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { ProfilComponent } from './profil/profil.component';
import { FinderComponent } from './components/finder/finder.component';
import { AuthGuard } from './auth.guard';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'overview', component: OverviewComponent,canActivate:[AuthGuard],
    children:
      [{ path: 'directory', component: DirectoryComponent,canActivate:[AuthGuard] },
      {
        path: 'chat', component: ChatComponent,canActivate:[AuthGuard] , resolve:{ userRes:UserResolver},
        children: [{
          path: 'chatroom', component: ChatroomComponent ,canActivate:[AuthGuard],
          children: [{ path: 'chattopbar', component: ChatTopBarComponent, canActivate:[AuthGuard] }]
        },
        { path: 'userlist', component: UserListComponent, canActivate:[AuthGuard] }
        ]
      }, {
        path: 'profil', component: ProfilComponent,canActivate:[AuthGuard]
      },{
        path: 'finder', component: FinderComponent, canActivate:[AuthGuard]
      }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingcomponents = [ChatComponent]
