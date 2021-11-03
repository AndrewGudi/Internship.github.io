import { ImageInterface } from '@/types/image.interface'

export interface TaskInterface{
  id?: number,
  avatar: string,
  name: string,
  text: string,
  src?: ImageInterface,
  time: number,
  halfDay: string
}
