import { ImageInterface } from '@/types/image.interface'

export interface TaskInterface{
  id?: number,
  avatar: string,
  firstname: string,
  lastname: string,
  text: string,
  src?: ImageInterface,
  time: number,
  halfDay: string
}
