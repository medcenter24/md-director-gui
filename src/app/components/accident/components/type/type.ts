/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class AccidentType {
    constructor(
        public id: number = 0,
        public title: string = '',
        public description: string = '',
        // to have translation in the model
        // initialized on the request only
        public trTitle: string = '',
    ) {}
}
