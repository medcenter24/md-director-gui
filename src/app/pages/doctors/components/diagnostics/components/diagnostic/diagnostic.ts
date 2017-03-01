/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Diagnostic {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public category?: string,
        public comment?: string
    ) {}
}
