import { IAppModel } from '../models/model';
import { Request, Response } from 'express';
import { Model, Document, Query } from 'mongoose';
import { ObjectId } from 'bson';
import { IQuestion, Question } from 'models/Question';
const Json2csvParser = require('json2csv').Parser;

const logger = console;
/**
 * @param {IAppModel} model The default model object
 * for the controller. Will be required to create
 * an instance of the controller
 */
export abstract class AppController<M extends IAppModel> {

  abstract getModelType(): Model<M & Document>;
  abstract getCreateValidator(obj: M): Validator.Validator<M>;
  abstract getModifyValidator(obj: M): Validator.Validator<M>;


  /**
   * @param {Request} req The request object
   * @param {Response} res The response object
   */
  create(question: IQuestion) {
    question._id = new ObjectId();
    question.reviewed = false;
    const modelType = this.getModelType();
    return new Promise<IQuestion>((resolve, reject)=>{
        new modelType(question)
          .save()
          .then(savedObject => {
            return resolve(<any>savedObject);
          }).catch(err => {
            logger.error('create error',question.question_text, err);
            return reject(err);
      });
    });
  }

  modify(req: Request, res: Response, next: (err?: any) => void): void {
    const obj = req.body;
    const modelType = this.getModelType();
    const validator = this.getModifyValidator(obj);
    const setObj: any = {};
    Object.keys(obj).forEach(key => setObj[key] = obj[key]);
    if (validator.passes()) {
      modelType
        .update(
          { _id: ObjectId.createFromHexString(req.params.id) },
          { $set: setObj })
        .then(savedObject => {
          if (savedObject.nModified === 0) throw new Error('Item was not found!');
          return res.status(200).json({ ok: true, updated: 1 });
        }).catch(err => {
          logger.error('modify error', err);
          return next(err);
        });
    } else {
      const appError: Error & { data?: any } = new Error('input_error');
      appError.data = validator.errors.all();
      logger.error('appError', appError.data);
      return next(appError);
    }
  }

  delete(req: Request, res: Response, next: (err?: any) => void): void {
    const obj = { _id: req.params.id, ...req.body };
    const modelType = this.getModelType();
    modelType.remove(obj)
      .then(savedObject => {
        return res.status(200).json({ ok: true, deleted: 1 });
      }).catch(err => {
        logger.error('delete error', err);
        return next(err);
      });
  }

  list(req: Request, res: Response, next: (err?: any) => void): void {
    const obj = req.body || {};
    const modelType = this.getModelType();
    modelType.find(obj)
      .then(result => {
        return res.status(200).json(result);
      }).catch(err => {
        logger.error('list error', err);
        return next(err);
      });
  }

  query(req: Request, res: Response, next: (err?: any) => void): void {
    const q = { _id: req.params.id, ...req.body };
    if(!q._id) delete q._id;
    const modelType = this.getModelType();
    modelType.find(q)
      .then((result: any) => {
        return res.status(200).json(result);
      }).catch(err => {
        logger.error('query error', err);
        return next(err);
      });
  }

}
export default AppController;