export class TreeModel {
    constructor(
        public Id: number,
        public name: string,
        public expandable: boolean,
        public level: number,
        public Storeloc: number,
        public isExpanded?: boolean,

    ) { }
}