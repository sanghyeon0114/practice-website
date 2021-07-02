import { Router } from "express";
import multer from 'multer';
import { getFileList } from '../controller/files/file-list';
import { fileUpload } from '../controller/files/file-upload';
import { getfileInfo } from '../controller/files/file-info';
import { fileDownload } from "../controller/files/file-download";
import { fileDelete } from '../controller/files/file-delete';

const fileRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileRouter.get('/', getFileList);
fileRouter.post('/', upload.single('file'), fileUpload);
fileRouter.get('/:id', getfileInfo);
fileRouter.post('/:id/download', fileDownload);
fileRouter.delete('/:id', fileDelete);

export default fileRouter;