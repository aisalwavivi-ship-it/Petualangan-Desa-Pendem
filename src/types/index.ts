export interface StageInfo {
  id: string;
  name: string;
  subName: string;
  icon: string;
  badge: string;
  character: {
    name: string;
    role: string;
    avatar: string;
    greeting: string;
  };
  description: string;
  topic: string;
  unlocked: boolean;
  stars: number;
  completed: boolean;
  lessons: LessonSlide[];
  interactiveTask: InteractiveTask;
  quizzes: QuizQuestion[];
}

export interface LessonSlide {
  title: string;
  subtitle: string;
  content: string;
  visualType: 'apples' | 'milk' | 'porogapit' | 'remainder' | 'concept';
  visualData: any;
  hint: string;
}

export interface InteractiveTask {
  title: string;
  instruction: string;
  itemType: 'apple' | 'milk' | 'chip' | 'flower';
  itemName: string;
  itemIcon: string;
  totalItems: number;
  totalBaskets: number;
  basketName: string;
  storyPrompt: string;
  correctPerBasket: number;
  correctRemainder?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  storyContext?: string;
  options: {
    text: string;
    value: number;
    explanation: string;
  }[];
  correctAnswer: number;
  explanation: string;
  hint: string;
}

export interface UserProgress {
  playerName: string;
  coins: number;
  totalStars: number;
  completedStages: string[];
  stageScores: Record<string, number>;
  badges: string[];
  soundEnabled: boolean;
}
