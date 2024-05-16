import {  ParseService } from "@pagmf/parse";
import { Image } from "./image";
import { BaseModel } from "./base-model";
import { MyUser } from "./user";

export class PhoneDeviceBaseModel<T> extends BaseModel<T> {
    constructor(parseService: ParseService, model: string, entity?: any) {
        super(parseService, model, entity)
    }

    get deletedAt() {
        return this.parseObject.get('deletedAt')
    }
    set deletedAt(deletedAt: Date){
      this.parseObject.set('deletedAt', deletedAt)
    }
    get remarks(): string {
        return this.parseObject.get('remarks')
    }
    set remarks(remarks: string) {
        this.parseObject.set('remarks', remarks)
    }
    get user(): MyUser {
        return this.parseObject.get('user')
    }
    set user(user: MyUser) {
        this.parseObject.set('user', user)
    }
    get images(): Image[] {
        return this.parseObject.get('images')
    }
    set images(images: Image[]) {
        this.parseObject.set('images', images)
    }
}
