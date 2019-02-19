import { Router } from 'express';
import { QuestionsListController } from '../controllers/QuestionsController';

const controller = new QuestionsListController();
export default () => {
  const router = Router();
  
  router.route('/upload')
    .post((req, res, next) => {
      controller.createFromCsv(req, res, next);
    });

  router.route('/query')
    .post((req, res, next) => {
      controller.query(req, res, next);
    });

  router.route('/:id')
    .get((req, res, next) => {
      controller.query(req, res, next);
    });
  router.route('/')
    .get((req, res, next) => {
      controller.list(req, res, next);
    });
  router.route('/')
    .post((req, res, next) => {
      controller.doCreate(req, res, next);
    });
  router.route('/:id')
    .put((req, res, next) => {
      controller.modify(req, res, next);
    });
  router.route('/:id')
    .delete((req, res, next) => {
      controller.delete(req, res, next);
    });

  return router;
};