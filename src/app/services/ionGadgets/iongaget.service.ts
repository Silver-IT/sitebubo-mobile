import { Injectable } from '@angular/core';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../serverAPI/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IongagetService {
  isLoading = false;
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private menuCtrl: MenuController,
    private toastCtrl: ToastController
  ) {

  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 3000,
      mode: 'ios',
      cssClass: 'customToast'
    });
    await toast.present();
  }
  
  async showAlert(headerMsg, subHeaderMsg) {
    const alert = await this.alertCtrl.create({
      header: headerMsg,
      subHeader: subHeaderMsg,
      buttons : [
        'OK'
      ]
    });
    await alert.present();
  }

  async EmailAlert(userID) {
    const confirm = await this.alertCtrl.create({
      header: '',
      message: 'Your email is not verified. Please verify your email',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'ReSend',
          handler: () => {
            this.displaySecondAlert(userID);
          }
        }
      ]
    });
    await confirm.present();
  }

  displaySecondAlert(userID) {
    this.authService.resendEmail(userID).subscribe( async (data) => {
        if (data.RESPONSECODE === 1) {
          const alert = await this.alertCtrl.create({
            header: 'Email Sent',
            message: 'Your verification code has been sent',
            buttons: ['OK'],
            cssClass: 'alertCustomCss'
          });
          await alert.present();
        } else {
         
        }
    });
  }


  async showLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
      cssClass: 'customLoading'
    }).then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async closeLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then();
  }

  toggleMenu() {
    this.menuCtrl.toggle('totalMenu');
  }
}
