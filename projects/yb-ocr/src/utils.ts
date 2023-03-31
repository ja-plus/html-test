import { createWorker } from 'tesseract.js';

export async function transferImage2Text(imgData: File, logger?: (m: any) => void) {
  if (!logger) logger = () => void 0;
  let worker = await createWorker({
    workerPath: 'js/worker.min.js',
    langPath: './lang-data',
    corePath: 'js/tesseract.js-core/tesseract-core.wasm.js',
    logger,
    errorHandler: err => {
      console.warn(err);
      throw new Error(err);
    },
  });
  await worker.loadLanguage('chi_sim');
  await worker.initialize('chi_sim');
  const {
    data: { text },
  } = await worker.recognize(imgData);
  // console.log(text);
  await worker.terminate();
  return text;
}
