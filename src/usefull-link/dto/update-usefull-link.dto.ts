import { PartialType } from '@nestjs/mapped-types';
import { CreateUsefullLinkDto } from './create-usefull-link.dto';

export class UpdateUsefullLinkDto extends PartialType(CreateUsefullLinkDto) {
  title: string
  description: string
  link: string
}
