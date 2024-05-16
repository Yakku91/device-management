import { ParseInjector } from "@pagmf/parse";
import { ParseFileModel } from '@pagmf/cloud/dist/models/parse-file.model'



export class Image extends ParseFileModel {
  static override create(parseService: ParseInjector, name: string, data: any, type?: string): Image {
    const parseObject: any = new parseService.Parse.File(name, data, type)
    return new Image(parseObject)
  }
  getObject() {
    return this.parseObject
  }
}

