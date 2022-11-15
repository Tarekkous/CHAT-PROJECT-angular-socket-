import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
// import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgePipe } from './pipes/age.pipe';
// import { MatListModule } from '@angular/material/list';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { MatCardModule } from '@angular/material/card';
// import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
// import { DirectoryComponent } from './components/directory/directory.component';
// import { WeatherComponent } from './components/weather/weather.component';
// import { DirectoryModalComponent } from './modals/directory-modal/directory-modal.component';
// import { WeatherModalComponent } from './modals/weather-modal/weather-modal.component';
// import { ChatComponent } from './components/chat/chat.component';
// import { ProfilComponent } from './profil/profil.component';
// import { SideBarLeftComponent } from './components/side-bar-left/side-bar-left.component';
// import { SideBarRightComponent } from './components/side-bar-right/side-bar-right.component';
// import { NavBarComponent } from './components/nav-bar/nav-bar.component';
// import { ChatroomComponent } from './components/chat/chatroom/chatroom.component';
// import { ChatTopBarComponent } from './components/chat/chatroom/chat-top-bar/chat-top-bar.component';
// import { UserListComponent } from './components/chat/user-list/user-list.component';
// import { UserlistModalComponent } from './modals/userlist-modal/userlist-modal.component';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
// import { FinderComponent } from './components/finder/finder.component'
import { TokenInterceptorPovider } from './interceptors/token.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { environment } from 'src/environments/environment';
// import {MatBadgeModule} from '@angular/material/badge';
import { ShareModule } from './modules/share/share.module';

const config: SocketIoConfig = { url: `${environment.API_URL}`, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    // UserComponent,
    AgePipe,
    // UserModalComponent,
    // DirectoryComponent,
    // ChatComponent,
    // WeatherComponent,
    // DirectoryModalComponent,
    // WeatherModalComponent,
    // ChatComponent,
    // ProfilComponent,
    // SideBarLeftComponent,
    // SideBarRightComponent,
    // NavBarComponent,
    // ChatroomComponent,
    // ChatTopBarComponent,
    // UserListComponent,
    // UserlistModalComponent,
    // FinderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // ReactiveFormsModule,
    // MatListModule,
    // MatAutocompleteModule,
    // MatCardModule,
    // MatIconModule,
    MatGridListModule,
    MatInputModule,
    // MatFormFieldModule,
    // FormsModule,
    // MatButtonModule,
    MatDialogModule,
    // MatProgressBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
    MatSlideToggleModule,
    // MatBadgeModule,
    ShareModule
  ],exports:[
    ShareModule
  ],
  providers: [TokenInterceptorPovider],
  bootstrap: [AppComponent]
})
export class AppModule { }
