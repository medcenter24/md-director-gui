/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

/**
 * For the list of the accidents
 */
export class CaseAccident {

    constructor (
        public id: number = 0,
        public assistant_id: number = 0,
        public repeated: string = '',
        public ref_num: string = '',
        public case_type: string = '',
        public created_at: string = '',
        public checkpoints: string = '',
        public status: string = '',
    ) {}
}
