/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Doctor {
    constructor(
        public id: number,
        public user_id: number,
        public name: string,
        public description: string,
        public ref_key: string,
    ) {}
}
