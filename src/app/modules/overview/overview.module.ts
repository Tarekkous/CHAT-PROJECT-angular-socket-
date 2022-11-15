import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewComponent } from 'src/app/components/overview/overview.component';
import { ShareModule } from '../share/share.module';
import { SideBarLeftComponent } from 'src/app/components/side-bar-left/side-bar-left.component';
import { SideBarRightComponent } from 'src/app/components/side-bar-right/side-bar-right.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { ChatTopBarComponent } from 'src/app/components/chat/chatroom/chat-top-bar/chat-top-bar.component';
import { DirectoryComponent } from 'src/app/components/directory/directory.component';
import { WeatherComponent } from 'src/app/components/weather/weather.component';
import { DirectoryModalComponent } from 'src/app/modals/directory-modal/directory-modal.component';
import { WeatherModalComponent } from 'src/app/modals/weather-modal/weather-modal.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { ProfilComponent } from 'src/app/profil/profil.component';
import { ChatroomComponent } from 'src/app/components/chat/chatroom/chatroom.component';
import { FinderComponent } from 'src/app/components/finder/finder.component';
import { UserComponent } from 'src/app/components/user/user.component';
import { UserModalComponent } from 'src/app/modals/user-modal/user-modal.component';
import { UserListComponent } from 'src/app/components/chat/user-list/user-list.component';
import { UserlistModalComponent } from 'src/app/modals/userlist-modal/userlist-modal.component';


@NgModule({
  declarations: [
    OverviewComponent,
    SideBarLeftComponent,
    SideBarRightComponent,
    NavBarComponent,
    ChatTopBarComponent,
    DirectoryComponent,
    WeatherComponent,
    DirectoryModalComponent,
    WeatherModalComponent,
    ChatComponent,
    ProfilComponent,
    ChatroomComponent,
    FinderComponent,
    UserComponent,
    UserModalComponent,
    UserListComponent,
    UserlistModalComponent


  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    ShareModule
  ],exports:[
    CommonModule,
    OverviewRoutingModule,
    ShareModule
  ]
})
export class OverviewModule { }
