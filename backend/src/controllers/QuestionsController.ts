
import {
  IQuestion,
  Question
} from '../models/Question';

import {
  convertHtmlToDelta,convertTextToDelta
} from 'node-quill-converter';

import {
  Request,
  Response
} from 'express';
import * as fs from 'fs';
import {
  AppController
} from './app.controller';
import {
  Model,
  Document
} from 'mongoose';
const puppeteer = require('puppeteer');
const m2t = require('../services/ml2tex/m2t.js');
const csv = require('csvtojson');

const inputTemplate = fs.readFileSync('./src/templates/input_template.html', {
  encoding: 'utf8'
}).replace('\n', '');
const cssBuffer = fs.readFileSync('./src/templates/mathquill.css');
const jsBuffer = fs.readFileSync('./src/templates/mathquill.min.js');
const jQueryBuffer = fs.readFileSync('./src/templates/jquery-3.3.1.min.js');
const keys = ['question_text', 'arabic_translation_of_question', 'hint', 'arabic_translation_of_hint',
  'justification', 'arabic_translation_of_justification',
  'option_A', 'option_B', 'option_C', 'option_D'];
  import path from 'path';

const templatePath = path.join(__dirname, '../templates/Sheet1.csv');

export class QuestionsListController extends AppController < IQuestion > {

  doCreate(req: Request, res: Response, next: (err?: any) => void) {
    let question: IQuestion = req.body;
    this.convertQuestionToHTML(question)
    .then(result => {
      return super.create(result)
    })
    .then(x=> res.status(200).json(x))
    .catch(err=> next(err));
  }

  async createFromCsv(req: Request, res: Response, next: (err?: any) => void){
    const rawItems: any[] = await this.read_json(templatePath);
    while (rawItems.length > 0) {
      const rows: any[] = rawItems.splice(0, 5);
      const promisses = rows.map(row =>{
        return this.CsvQuestions(row)
        .then(result => {
          console.log('q', result.question_text.substring(0, 10));
          return super.create(result)
        })
        .catch(err=> next(err));
      });
      await Promise.all(promisses);
    }
    res.status(200).json('Upload Completed!');

  }

  modify(req: Request, res: Response, next: (err?: any) => void): void {
    let question: IQuestion = req.body;
    this.convertQuestionToHTML(question).then(result => {
      req.body = result;
      return super.modify(req, res, next);
    });
  }

  constructor() {
    super();
  }

  getModelType(): Model < IQuestion & Document > {
    return Question;
  }
  getCreateValidator(obj: IQuestion): Validator.Validator<IQuestion> {
    return Question.schema.statics.validateCreate(obj);
  }
  getModifyValidator(obj: IQuestion): Validator.Validator<IQuestion> {
    return Question.schema.statics.validateModify(obj);
  }


  async convertQuestionToHTML(question: IQuestion) {
    const questionPromise = this.node(question.question_text).catch(err => console.error(err, question));
    const questionAPromise = this.node(question.arabic_translation_of_question).catch(err => console.error(err, question));
    const justificationPromise = this.node(question.justification).catch(err => console.error(err, question));
    const justificationAPromise = this.node(question.arabic_translation_of_justification).catch(err => console.error(err, question));
    const hintPromise = this.node(question.hint).catch(err => console.error(err, question));
    const hintAPromise = this.node(question.arabic_translation_of_hint).catch(err => console.error(err, question));
    const optionAPromise = this.node(question.option_A).catch(err => console.error(err, question));
    const optionBPromise = this.node(question.option_B).catch(err => console.error(err, question));
    const optionCPromise = this.node(question.option_C).catch(err => console.error(err, question));
    const optionDPromise = this.node(question.option_D).catch(err => console.error(err, question));
    const asyncResult = await Promise.all([questionPromise, justificationPromise, hintPromise, optionAPromise, optionBPromise, optionCPromise, optionDPromise, questionAPromise, hintAPromise, justificationAPromise]);
    question.question_text = asyncResult[0];
    question.justification = asyncResult[1];
    question.hint = asyncResult[2];
    question.option_A = asyncResult[3];
    question.option_B = asyncResult[4];
    question.option_C = asyncResult[5];
    question.option_D = asyncResult[6];
    question.arabic_translation_of_question = asyncResult[7];
    question.arabic_translation_of_hint = asyncResult[8];
    question.arabic_translation_of_justification = asyncResult[9];
    return question;
  }


  node(txt: string) {
    return puppeteer.launch().then(async browser => {
      const inputHtml = inputTemplate.replace('$texthere$', txt);
      const page = await browser.newPage();
      await page.setRequestInterception(true);
      page.on('request', this.interceptor);
      await page.goto(`data:text/html,${inputHtml}`, {
        waitUntil: 'networkidle2'
      });
      const bodyhtml = await page.evaluate(() => document.body.innerHTML);
      const mydiv = (bodyhtml.split('<script>'))[0];
      await browser.close();
      return mydiv;
    });
  }



  interceptor(request) {
    if (request.url() === 'http://math.com/math.css') {
      request.respond({
        content: 'text/css',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: cssBuffer
      });
    } else if (request.url() === 'http://math.com/jquery.min.js') {
      request.respond({
        content: 'text/javascript',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: jQueryBuffer
      });
    } else if (request.url() === 'http://math.com/math.js') {
      request.respond({
        content: 'text/javascript',
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: jsBuffer
      });
    } else {
      request.continue();
    }
  }

//////////csv HTML ///////////////////////////
  async Latex(question: IQuestion) {
    keys.forEach(key => {
      const value: string = question[key];
      const h = value.split('data-mathml="');
      for (let i = 0; i < h.length - 1; i++) {
        question[key] = this.replacefromto(
          value,
          value.indexOf('<img class="Wirisformula"'),
          value.indexOf(';" />') + 5,
          '<span class="ql-formula">' + h[i + 1].split('"')[0] + '</span>');
      }
    });
    return this.Latex2Dalta(question);
  }

  Latex2Dalta(question: IQuestion) {
    keys.forEach(key => {
      question[key] = question['O_' + key]
    });
    this.convertQuestionToHTML(question);
    return question;
  }

  replacefromto(org, start, end, what) {
    return org.substring(0, start) + what + org.substring(end);
  }
///////////////////////////////////////////////////////////////////////




////////////normal csv///////////////////////////////////////////

  
  async CsvQuestions(question: IQuestion){
    question.O_question_text=convertTextToDelta(question.question_text)
    question.O_arabic_translation_of_question=convertTextToDelta(question.arabic_translation_of_question)
    question.O_hint=convertTextToDelta(question.hint)
    question.O_arabic_translation_of_hint=convertTextToDelta(question.arabic_translation_of_hint)
    question.O_justification=convertTextToDelta(question.justification)
    question.O_arabic_translation_of_justification=convertTextToDelta(question.arabic_translation_of_justification)
    question.O_option_A=convertTextToDelta(question.option_A)
    question.O_option_B=convertTextToDelta(question.option_B)
    question.O_option_C=convertTextToDelta(question.option_C)
    question.O_option_D=convertTextToDelta(question.option_D)
    const questionPromise = this.wrap(question.question_text.trim(), '\n').catch(err => console.error(err, question));
    const justificationPromise = this.wrap(question.justification.trim(), '\n').catch(err => console.error(err, question));
    const hintPromise = this.wrap(question.hint.trim(), '\n').catch(err => console.error(err, question));
    const option_APromise = this.wrap(question.option_A.trim(), '\n').catch(err => console.error(err, question));
    const option_BPromise = this.wrap(question.option_B.trim(), '\n').catch(err => console.error(err, question));
    const option_CPromise = this.wrap(question.option_C.trim(), '\n').catch(err => console.error(err, question));
    const option_DPromise = this.wrap(question.option_D.trim(), '\n').catch(err => console.error(err, question));
    const asyncResult = await Promise.all([questionPromise, justificationPromise, hintPromise, option_APromise, option_BPromise, option_CPromise, option_DPromise]);
    question.question_text = asyncResult[0];
    question.justification = asyncResult[1];
    question.hint = asyncResult[2];
    question.option_A = asyncResult[3];
    question.option_B = asyncResult[4];
    question.option_C = asyncResult[5];
    question.option_D = asyncResult[6];
    return question;
  }
 wrap(string,newLineSeperator) {
  var splited_strings = string.split(newLineSeperator);
  for (var i = 0; i < splited_strings.length; i++) {
    if(splited_strings[i].length>0){
      splited_strings[i] = `<p>${splited_strings[i]}</p>`;
      let numberOfSign = splited_strings[i].split('@').length - 1;
      if (numberOfSign % 2 == 0) {
        for (var j = 0; j < numberOfSign; j++) {
          splited_strings[i] = splited_strings[i].replace("@",'<span class="ql-formula">');
          splited_strings[i] = splited_strings[i].replace("@",'</span>');
        }
        } else {
      }
    }
  }
  let final_strings = splited_strings.join(newLineSeperator);
  return this.node(final_strings);
  }
  read_json(path) {
    return csv().fromFile(path).then(x => x);
  }
}
///////////////////////////////////////////////////////////////