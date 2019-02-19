export interface Question {
  _id: string;
  subject: string;
  question_text: string;
  question_picture: string;
  arabic_translation_of_question: string;
  chapter_name: string;
  sub_topic: string;
  duration: string;
  justification: string;
  arabic_translation_of_justification: string;
  hint: string;
  arabic_translation_of_hint: string;
  option_A: string;
  option_B: string;
  option_C: string;
  option_D: string;
  correct_options: string;
  difficulty_level: string;
  skill_profile: string;
  question_type: string;
  Grade: string;
  content_type:string;
  question_class:string;

  O_question_text: Object;
  O_arabic_translation_of_question: Object;
  O_hint: Object;
  O_arabic_translation_of_hint: Object;
  O_justification: Object;
  O_arabic_translation_of_justification: Object;
  O_option_A: Object;
  O_option_B: Object;
  O_option_C: Object;
  O_option_D: Object;
  reviewed: boolean ;
}