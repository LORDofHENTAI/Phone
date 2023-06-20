export class PhoneBookModel {
    constructor(
        public id: number,
        public fio: string,
        public phoneNumber: string,
        public storeLoc: number,
        public dolj: string,
        public comment: string,
        public place: string
    ) { }
}