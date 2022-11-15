import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirectoryComponent } from './components/directory/directory.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatroomComponent } from './components/chat/chatroom/chatroom.component';
import { ChatTopBarComponent } from './components/chat/chatroom/chat-top-bar/chat-top-bar.component';
import { UserListComponent } from './components/chat/user-list/user-list.component';
import { ProfilComponent } from './profil/profil.component';
import { FinderComponent } from './components/finder/finder.component';
import { AuthGuard } from './auth.guard';
import { UserResolver } from './resolvers/user.resolver';
import { WeatherComponent } from './components/weather/weather.component';

const routes: Routes = [

  // { path: '', component: LoginComponent },
  { path: 'login', loadChildren:()=> import ('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren:()=> import ('./modules/register/register.module').then(m => m.RegisterModule) },
  { path: 'overview', loadChildren:()=> import ('./modules/overview/overview.module').then(m => m.OverviewModule),canActivate:[AuthGuard]},
  {path:'weather', component:WeatherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// export const routingcomponents = [ChatComponent]
