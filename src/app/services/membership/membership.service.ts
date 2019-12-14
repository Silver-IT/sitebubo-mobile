import { Injectable } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AllDonePage } from './../../pages/modals/all-done/all-done.page';
import { GeneralService } from './../generalComponents/general.service';
import { IongagetService } from './../ionGadgets/iongaget.service';
import { UserService } from './../../serverAPI/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor(
    private actionCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private generalService: GeneralService,
    private ionService: IongagetService,
    private userAPI: UserService,
    private storage: Storage
  ) { }

  async deleteAccount() {
    const deletion = await this.actionCtrl.create({
      header: 'Are you sure to delete your account ?',
      buttons: [
        {
          text: 'Yes',
          icon: 'checkmark',
          handler: () => {
            this.submitDeletion().then((result) => {
              if (result) {
                this.allDone();            
              }
            }).catch(err => {
              
            });
          }
        }, 
        {
          text: 'No',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });;
    await deletion.present();
  }

  submitDeletion() {
    return new Promise((resolve, reject) => {
      this.storage.get('userInfo').then((user) => {
        this.ionService.showLoading();
        this.userAPI.deleteAccount(user.id, user.token).subscribe((result) => {
          this.ionService.closeLoading();
          if (result['RESPONSECODE'] === 1) {
            resolve(true)  
          } else {
            this.ionService.presentToast(result['RESPONSE']);
            reject(false);
          }
        }, err => {
          this.ionService.presentToast('Account Deletion Failed due to the server');
          reject(false);
        });
      })
    });
  }

  async allDone() {
    const modal = await this.modalCtrl.create({
      component: AllDonePage
    });
    modal.onDidDismiss().then(() => {
      this.generalService.logOut();
    });
    return await modal.present();
  }
}
