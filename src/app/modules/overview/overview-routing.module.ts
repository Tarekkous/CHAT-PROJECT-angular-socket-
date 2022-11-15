import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ChatTopBarComponent } from 'src/app/components/chat/chatroom/chat-top-bar/chat-top-bar.component';
import { ChatroomComponent } from 'src/app/components/chat/chatroom/chatroom.component';
import { UserListComponent } from 'src/app/components/chat/user-list/user-list.component';
import { DirectoryComponent } from 'src/app/components/directory/directory.component';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { ProfilComponent } from 'src/app/profil/profil.component';
import { UserResolver } from 'src/app/resolvers/user.resolver';

const routes: Routes = [
  {path:'',component:OverviewComponent, children:
      [
        { path: 'directory', component: DirectoryComponent,canActivate:[AuthGuard] },
        {
          path: 'chat', component: ChatComponent,canActivate:[AuthGuard] , resolve:{ userRes:UserResolver},
          children:
          [
            {
              path: 'chatroom', component: ChatroomComponent ,canActivate:[AuthGuard],
            children:
            [
              { path: 'chattopbar', component: ChatTopBarComponent, canActivate:[AuthGuard] }
            ]
            },
            { path: 'userlist', component: UserListComponent, canActivate:[AuthGuard] }
          ]
      }, {
        path: 'profil', component: ProfilComponent,canActivate:[AuthGuard]
      },{
        path: 'finder', component: FinderComponent, canActivate:[AuthGuard]
      }]
    }
  ]



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
