/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Assistant {
    constructor(
        public id: number = 0,
        public title: string = '',
        public email: string = '',
        public comment: string = '',
        public ref_key: string = '',
        public picture: string = '',
        public media_id: number = 0
    ) {}
}
