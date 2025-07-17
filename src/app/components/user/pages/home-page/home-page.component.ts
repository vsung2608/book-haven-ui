import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AnimateOnScrollModule} from 'primeng/animateonscroll';
import {Observable} from 'rxjs';
import {CommentResponse} from '../../../../model/Interaction';
import {Category} from '../../../../model/Products';
import {CategoryService} from '../../../../services/product/category.service';

@Component({
    selector: 'app-home-page',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgClass,
    AnimateOnScrollModule
  ],
    templateUrl: './home-page.component.html',
    standalone: true,
    styleUrl: './home-page.component.css'
})

export class HomePageComponent implements AfterViewInit{
  @ViewChild('chatBody') chatBody!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  message = '';
  messages: { text: string; type: string; image?: string }[] = [];
  isChatOpen = false;

  previewSrc: string | null = null;
  fileUploaded = false;
  initialInputHeight = 0;

  categories$: Observable<Array<Category>> | undefined;

  userData = {
    message: '' as string | null,
    file: { data: null as string | null, mime_type: null as string | null }
  };

  readonly API_KEY = 'AIzaSyBRgYlTRBeR4VoPjaTfUcydLrtRdGg-4MY';
  readonly API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.API_KEY}`;

  constructor(private http: HttpClient, private categpryService: CategoryService) {}

  ngAfterViewInit() {
    this.initialInputHeight = this.messageInput.nativeElement.scrollHeight;
    this.categpryService.loadCategories()
    this.categories$ = this.categpryService.categories$
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  closeChat() {
    this.isChatOpen = false;
  }

  resizeInput() {
    const el = this.messageInput.nativeElement;
    el.style.height = `${this.initialInputHeight}px`;
    el.style.height = `${el.scrollHeight}px`;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (this.message.trim()) this.sendMessage(event);
    }
  }

  sendMessage(event: Event) {
    event.preventDefault();
    const userMessage = this.message.trim();
    if (!userMessage) return;

    this.messages.push({
      text: userMessage,
      type: 'user-message',
      image: this.previewSrc || undefined
    });

    this.userData.message = userMessage;
    this.message = '';
    this.previewSrc = null;
    this.fileUploaded = false;

    // Show loading message
    const loadingMsg = { text: '...', type: 'bot-message' };
    this.messages.push(loadingMsg);

    this.scrollToBottom();

    // Call API
    const body = {
      contents: [
        {
          parts: [
            { text: userMessage },
            ...(this.userData.file.data ? [{ inline_data: this.userData.file }] : [])
          ]
        }
      ]
    };

    this.http.post(this.API_URL, body).subscribe({
      next: (res: any) => {
        const text = res.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
        loadingMsg.text = text.replace(/\*\*(.*?)\*\*/g, '$1');
        this.scrollToBottom();
      },
      error: (err) => {
        loadingMsg.text = 'Error getting response.';
        console.error(err);
      },
      complete: () => {
        this.userData.file = { data: null, mime_type: null };
      }
    });
  }

  scrollToBottom() {
    const el = this.chatBody.nativeElement;
    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 100);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewSrc = e.target?.result as string;
      this.fileUploaded = true;
      this.userData.file = {
        data: this.previewSrc.split(',')[1],
        mime_type: file.type
      };
    };
    reader.readAsDataURL(file);
  }

  cancelFile() {
    this.userData.file = { data: null, mime_type: null };
    this.previewSrc = null;
    this.fileUploaded = false;
    this.fileInput.nativeElement.value = '';
  }
}
