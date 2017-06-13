/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Document {
    constructor(
        public id: number = 0,
        public title: string = '',
        public preview: string = '',
        public owner: string = '',
        public file_name: string = ''
    ) { }
}
