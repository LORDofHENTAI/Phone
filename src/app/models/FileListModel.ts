export class FileListModel {
    constructor(
        public id: number,
        public fileName: string,
        public type: string,
        public size?: string,

    ) { }
}