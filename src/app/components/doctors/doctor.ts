/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Doctor {
    constructor(
        public id: number = 0,
        public user_id: number = 0,
        public name: string = '',
        public description: string = '',
        public ref_key: string = ''
    ) {}
}
