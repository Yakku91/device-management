import { ParseBaseModel, ParseService } from "@pagmf/parse";

export class BaseModel<T> extends ParseBaseModel<T> {

    constructor(parseService: ParseService, model: string, entity?: any) {
        super(model, parseService)
        if (entity) {
            this.parseObject = entity
        } else {
            this.create()
        }
    }
    // get objektId(){
    //     return this.id() || this.getObject().id
    // }
    get name(): string {
        return this.parseObject?.get('name')
    }
    set name(name: string) {
        this.parseObject?.set('name', name)
    }
}