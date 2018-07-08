/**
 * Copyright (c) 2018 Open Assessment Technologies, S.A.
 *
 * @author A.Zagovorichev, <zagovorichev@gmail.com>
 */

export class Form {
  constructor(
    public id: number = 0,
    public title: string = '',
    public description: string = '',
    public variables: string[] = [],
    public template: string = '',
    public formableType: string = '',
  ) {}
}
