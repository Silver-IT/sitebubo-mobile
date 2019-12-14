import { element } from 'protractor';
import { Component, OnInit, ChangeDetectorRef, ViewChildren } from '@angular/core';
import { LoadingController, ModalController, IonTextarea } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { OtherService } from './../../../serverAPI/other/other.service';
import { IongagetService } from './../../../services/ionGadgets/iongaget.service';
import { FeebackSuccessPage } from '../feeback-success/feeback-success.page';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  @ViewChildren('question') textareas;
  userID: any;
  token: any;
  questions: any;
  loading: any;
  readyToSubmit = false;
  requiredMessage = 'This Field is Required';
  minlengthMessage = 'You should type 10 characters at least';
  feedbackData = [];
  constructor(
    private storage: Storage,
    private cdr: ChangeDetectorRef,
    private loadingCtrl: LoadingController,
    private ionService: IongagetService,
    private modalCtrl: ModalController,
    private otherService: OtherService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.initData();
  }

  async initData() {
    await this.storage.get('userInfo').then(async (user) => {
      if (user) {
        this.userID = user.id;
        this.token = user.token;
        await this.getFeedbackQuestions(user.id, user.token).then((result) => {
          console.log(result, this.textareas.first);
          const element = this.textareas.first as IonTextarea;
          element.setFocus();
        });
      }
    });
  }

  getFeedbackQuestions(userID, token) {
    return new Promise((resolve, reject) => {
      this.ionService.showLoading();
      this.otherService.getFeedbackQuestions(userID, token).subscribe((result) => {
        console.log(result);
        this.ionService.closeLoading();
        if (result.RESPONSECODE === 1) {
          this.questions = result.data;
          this.cdr.detectChanges();
          resolve(true);
        } else {
          alert(result.RESPONSE);
          reject(false);
        }
      }, err => {
        console.log(err);
        this.ionService.closeLoading();
        reject(false);
      });
    });
  }

  validate_form() {
    let valid = true;
    for (let i = 0; i < this.questions.length; i++ ) {
      const element = document.getElementById('c_' + i);
      const text = element.textContent;
      // console.log(text);
      if (text.length < 10) {
        valid = false;
        break;
      }
    }
    this.readyToSubmit = valid;
    console.log(this.readyToSubmit);
    this.cdr.detectChanges();
  }

  setValidation(event, value) {
    const element: HTMLElement = event.target;
    let index = element.getAttribute('id');
    const temp = index.split('_');
    index = temp[1];
    const validateElement = document.getElementById('validate_' + index);
    const errorMessageElement = document.getElementById('errorMessage_' + index);
    if ( value === true ) {
      const text = element.textContent;
      if ( text === '' || text === undefined ) {
        element.classList.add('error-input');
        validateElement.style.display = 'block';
        errorMessageElement.textContent = this.requiredMessage;
      } else if ( text.length < 10 ) {
        element.classList.add('error-input');
        validateElement.style.display = 'block';
        errorMessageElement.textContent = this.minlengthMessage;
      }
    } else {
      element.classList.remove('error-input');
      validateElement.style.display = 'none';
    }
  }

  async getFeedbackData() {
    return new Promise((resolve, reject) => {
      let feedbackData = [];
      for (let i = 0; i < this.questions.length; i++ ) {
        const questionID = document.getElementById('question_' + i).textContent;
        const feedback = document.getElementById('c_' + i).textContent;
        const temp = {
          user_id : this.userID,
          question_id: questionID,
          answer: feedback
        };
        feedbackData.push(temp);
      }
      resolve(feedbackData);
    });
  }

  async submitFeedback() {
    this.ionService.showLoading();
    await this.getFeedbackData().then((data) => {
      console.log(JSON.stringify(data));
      data = JSON.stringify(data);
      this.otherService.addFeedback(data, this.userID, this.token).subscribe((result) => {
        console.log(result);
        this.ionService.closeLoading();
        if (result['RESPONSECODE'] === 1) {
          this.modalCtrl.dismiss().then(() => {
            this.showFeedbackSuccess();
          });

        } else {
          this.ionService.showAlert('Feedback Submit Failed', result['RESPONSE']);
        }
      }, err => {
        this.ionService.closeLoading();
        this.ionService.showAlert('Feedback Submit Failed', 'Server API Problem');
      });
    }).catch(err => {
      this.ionService.closeLoading();
      this.ionService.presentToast('Error while uploading feedback');
    });
  }

  async showFeedbackSuccess() {
    const success = await this.modalCtrl.create({
      component: FeebackSuccessPage
    });
    return await success.present();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
