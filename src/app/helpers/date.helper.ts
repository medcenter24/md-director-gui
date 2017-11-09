/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */


export class DateHelper {

    toEuropeFormat(strDate: string): string {
        let res = '';
        if (strDate) {
            const d = new Date(strDate);
            const parsed = this.parseDateAsFormattedString(d);
            res = `${parsed.day}.${parsed.month}.${parsed.year}`;
        }
        return res;
    }

    toEuropeFormatWithTime(strDate: string): string {
        let res = '';
        if (strDate) {
            res = this.toEuropeFormat(strDate);
            const d = new Date(strDate);
            const t = this.getTime(d);
            res = `${res} ${t}`;
        }
        return res;
    }

    getUnixDate(d: Date): string {
        let res = '';
        if (d) {
            const parsed = this.parseDate(d);
            res = `${parsed.year}-${parsed.month}-${parsed.day}`;
        }
        return res;
    }

    getTime(d: Date): string {
        let res = '';
        if (d) {
            let hour = d.getHours().toString();
            let minute = d.getMinutes().toString();
            let sec = d.getSeconds().toString();
            hour = hour.length <= 1 ? `0${hour}` : `${hour}`;
            minute = minute.length <= 1 ? `0${minute}` : `${minute}`;
            sec = sec.length <= 1 ? `0${sec}` : `${sec}`;
            res = `${hour}:${minute}:${sec}`;
        }
        return res;
    }

    getUnixDateWithTime(d: Date): string {
        let res = '';
        if (d) {
            res = this.getUnixDate(d);
            const time = this.getTime(d);
            res = `${res} ${time}`;
        }
        return res;
    }

    private parseDate(d: Date): {day: number, month: number, year: number} {
        const day = d.getDate();
        const month = d.getMonth() + 1;
        const year = d.getFullYear();
        return { day, month, year };
    }

    private parseDateAsFormattedString(d: Date): {day: string, month: string, year: string} {
        const parsed = this.parseDate(d);
        return {
            day: parsed.day < 10 ? `0${parsed.day}` : `${parsed.day}`,
            month: parsed.month < 10 ? `0${parsed.month}` : `${parsed.month}`,
            year: `${parsed.year}`,
        };
    }

}
