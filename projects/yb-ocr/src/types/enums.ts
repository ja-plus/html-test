export enum FileStatus {
  init,
  success,
  fail,
  pending,
}

export enum TesseractStatus {
  init = 'initialized tesseract',
  loadData = 'loaded language traineddata',
  initApi = 'initializing api',
  recognize = 'recognizing text',
}
