import { ImageInterface } from '@/types/image.interface'

export interface TaskInterface{
  id?: number,
  avatar: string,
  firstname: string,
  lastname: string,
  name: string,
  description: string,
  src?: ImageInterface,
  time: number,
  halfDay: string
}
