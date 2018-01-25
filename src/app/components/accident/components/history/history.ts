/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class AccidentHistory {
  constructor (
    public id: number = 0,
    public user_id: number = 0,
    public user_name: string = '',
    public user_thumb: string = '',
    public accident_status_id: number = 0,
    public status: string = '',
    public commentary: string = '',
    public created_at: string = '',
    public updated_at: string = '',
    public createdFormated: string = '',
  ) {}
}
