/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class Commentary {
  constructor(
    public id: number = 0,
    public user_id: number = 0,
    public user_name: string = '',
    public user_thumb: string = '',
    public body: string = '',
    public created_at: string = '',
    public formattedDate: string = '',
  ) {}
}
