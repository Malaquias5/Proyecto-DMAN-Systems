import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ArrowRight, LucideAngularModule, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './hero-section.component.html',
  styles: [`
    @keyframes gradient-shift {
      0%, 100% { background-position: 0% 50%; }
      25% { background-position: 50% 100%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 0%; }
    }
    @keyframes float-up {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.15; }
      50% { transform: translateY(-30px) rotate(5deg); opacity: 0.3; }
    }
    @keyframes float-down {
      0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
      50% { transform: translateY(20px) rotate(-5deg); opacity: 0.25; }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.2; }
      100% { transform: scale(0.8); opacity: 0.5; }
    }
    @keyframes blink-cursor {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes fade-in-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes glow-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3), 0 0 40px rgba(139,92,246,0.15); }
      50% { box-shadow: 0 0 30px rgba(59,130,246,0.5), 0 0 60px rgba(139,92,246,0.25); }
    }
    @keyframes float-image {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    :host { display: block; }

    .hero-gradient-bg {
      background: linear-gradient(135deg,
        #0a0a1a 0%,
        #0d1033 15%,
        #111544 30%,
        #0d1033 50%,
        #1a0a2e 70%,
        #0d1033 85%,
        #0a0a1a 100%
      );
      background-size: 400% 400%;
      animation: gradient-shift 12s ease infinite;
    }
    .float-shape-1 { animation: float-up 8s ease-in-out infinite; }
    .float-shape-2 { animation: float-down 10s ease-in-out infinite 1s; }
    .float-shape-3 { animation: float-up 12s ease-in-out infinite 2s; }
    .float-shape-4 { animation: float-down 9s ease-in-out infinite 3s; }
    .pulse-ring { animation: pulse-ring 4s ease-in-out infinite; }
    .typing-cursor {
      display: inline-block;
      width: 3px;
      height: 0.85em;
      background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
      margin-left: 2px;
      animation: blink-cursor 0.8s step-end infinite;
      vertical-align: text-bottom;
      border-radius: 2px;
    }
    .fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
    .fade-in-up-delay-1 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.2s forwards; }
    .fade-in-up-delay-2 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.4s forwards; }
    .fade-in-up-delay-3 { opacity: 0; animation: fade-in-up 0.8s ease-out 0.6s forwards; }
    .glow-btn { animation: glow-pulse 3s ease-in-out infinite; }
    .hero-image-wrapper { animation: float-image 6s ease-in-out infinite; }
  `]
})
export class HeroSectionComponent implements OnInit, OnDestroy {
  readonly ArrowRight = ArrowRight;
  readonly Sparkles = Sparkles;

  readonly typingText = signal('escalan');
  private readonly words = ['escalan', 'impactan', 'transforman', 'innovan'];
  private typingInterval: ReturnType<typeof setInterval> | null = null;
  private currentText = '';
  private currentWordIdx = 0;
  private deleting = false;
  private pauseCounter = 0;

  ngOnInit(): void {
    this.currentText = this.words[0];
    this.typingText.set(this.currentText);

    setTimeout(() => {
      this.typingInterval = setInterval(() => this.tick(), 100);
    }, 2500);
  }

  ngOnDestroy(): void {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }
  }

  private tick(): void {
    const currentWord = this.words[this.currentWordIdx];

    if (this.pauseCounter > 0) {
      this.pauseCounter--;
      return;
    }

    if (!this.deleting) {
      if (this.currentText === currentWord) {
        this.pauseCounter = 20;
        this.deleting = true;
        return;
      }
      this.currentText = currentWord.slice(0, this.currentText.length + 1);
    } else {
      if (this.currentText === '') {
        this.deleting = false;
        this.currentWordIdx = (this.currentWordIdx + 1) % this.words.length;
        this.pauseCounter = 5;
        return;
      }
      this.currentText = this.currentText.slice(0, -1);
    }

    this.typingText.set(this.currentText);
  }
}
