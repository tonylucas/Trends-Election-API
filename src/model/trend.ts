export class Trend {
    // constructor(
    //     public id: number,
    //     public values: { time: string, formattedTime: string, value: number }[],
    //     public type: string
    // ) { }
    constructor(
        public time: string,
        public formattedTime: string,
        public value: number
    ) { }
}
