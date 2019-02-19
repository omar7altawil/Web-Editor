import mongoose, { Model, Document } from 'mongoose';
import Validator from 'validatorjs';
import { IAppModel } from './model';
import { ObjectId } from '../../node_modules/@types/bson';

export interface IQuestion extends IAppModel {
  _id: ObjectId;
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

  O_question_text: any;
  O_arabic_translation_of_question: any;
  O_hint: any;
  O_arabic_translation_of_hint: any;
  O_justification: any;
  O_arabic_translation_of_justification: any;
  O_option_A: any;
  O_option_B: any;
  O_option_C: any;
  O_option_D: any;
  reviewed: boolean ;
}

/**
 * Question Schema
 */
const questionSchema = new mongoose.Schema({
  subject: {
    type: String,
    // required: true,
    // enum: ['math', 'science', 'arbic'],
  },
  question_text: {
    type: String,
    // required: true,
  },
  question_picture: String,
  arabic_translation_of_question: String,
  chapter_name: String,
  sub_topic: String,
  duration: {
    type: Number,
  },
  justification: String,
  arabic_translation_of_justification: String,
  hint: String,
  arabic_translation_of_hint: String,
  option_A: {
    type: String,
    // required: true,
  },
  option_B: {
    type: String,
    // required: true,
  },
  option_C: {
    type: String,
  },
  option_D: {
    type: String,
  },
  correct_options: {
    type: String,
    // required: [true, 'add the correct option'],
  },
  difficulty_level: {
    type: String,
    // required: [true, 'Specify level of difficulty'],
    // enum: ['easy', 'medium', 'difficult'],
  },
  skill_profile: String,
  question_type:{
    type: String,
    // enum: ['practice', 'mpq'],
  },
  Grade: {
    type: String,
    // required: true
  },
  content_type:{
    type: String,
    // enum: ['html', 'plain text'],
  },
  question_class:{
    type:String,
    // enum: ['mcq', 'fill in'],
  },

  O_question_text: Object,
  O_arabic_translation_of_question: Object,
  O_hint: Object,
  O_arabic_translation_of_hint: Object,
  O_justification: Object,
  O_arabic_translation_of_justification: Object,
  O_option_A: Object,
  O_option_B: Object,
  O_option_C: Object,
  O_option_D: Object,
  reviewed: Boolean

}, {
    timestamps: true, _id: true
  });


/**
 * @param {IQuestion} obj The object to perform validation on
 */
questionSchema.statics.validateCreate = (obj: IQuestion) => {
  const rules = {
  };
  return new Validator(obj, rules);
};

/**
 * @param {IQuestion} obj The object to perform validation on
 */
questionSchema.statics.validateModify = (obj: IQuestion) => {
  const rules = {
  };
  return new Validator(obj, rules);
};

/**
 * @typedef Question
 */
// tslint:disable-next-line:variable-name
export const Question: Model<IQuestion & Document> = mongoose.model<IQuestion & Document>('Question', questionSchema);
