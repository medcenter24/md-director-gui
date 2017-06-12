/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class UploadFile {

  constructor (
    public id: number = 0,
    public file_name: string = '',
    public download_url: string = '',
    public preview_url: string = ''
  ) {}
}
