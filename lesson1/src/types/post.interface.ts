import { ImageInterface } from '@/types/image.interface'

export interface PostInterface{
  id?: number,
  class?: string,
  icon?: string,
  avatar?: string,
  name: string,
  text: string,
  src?: ImageInterface,
  time: number,
  halfDay: string
}
