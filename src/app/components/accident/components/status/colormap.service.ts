/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class StatusColorMapService {
  getStatuses(): string[] {
    return [
      'new',
      'assigned',
      'in_progress',
      'sent',
      'sended',
      'paid',
      'closed',
      'reject',
    ];
  }

  getColorByStatus(status: string) {
    let color;
    switch (status) {
      case 'new':
        color = '#34495E';
        break;
      case 'in_progress':
        color = '#2980B9';
        break;
      case 'closed':
        color = '#BDC3C7';
        break;
      case 'sended':
        color = '#E67E22';
        break;
      case 'assigned':
        color = '#3498DB';
        break;
      case 'paid':
        color = '#D35400';
        break;
      case 'sent':
        color = '#F39C12';
        break;
      case 'reject':
        color = '#8E44AD';
        break;
      default:
        console.warn(`Undefined status ${status}`);
        color = '#C0392B';
    }

    return color;
  }
}
